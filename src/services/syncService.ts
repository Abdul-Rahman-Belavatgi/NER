export type SyncQueueState = 'PENDING' | 'SYNCHRONIZED' | 'FAILED';

export interface SyncQueueItem<T = any> {
  id: string; // Stable idempotency key
  entityType: 'incident' | 'hazard' | 'logistics' | 'consignment' | 'verification';
  action: 'CREATE' | 'UPDATE' | 'STATUS_CHANGE';
  data: T;
  createdAt: string;
  syncState: SyncQueueState;
  attempts: number;
  lastAttemptAt?: string;
  errorMessage?: string;
  serverSyncedAt?: string;
  offlineCreated: boolean;
  commMode?: 'STANDARD' | 'HAM_RADIO' | 'SATELLITE' | 'MESH_NETWORK';
}

const STORAGE_KEY = 'ner_sync_queue_v2';
type QueueListener = (queue: SyncQueueItem[]) => void;
const listeners: Set<QueueListener> = new Set();

export class SyncService {
  private static queue: SyncQueueItem[] = [];
  private static isInitialized = false;

  private static init() {
    if (this.isInitialized) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this.queue = JSON.parse(raw);
      }
    } catch {
      this.queue = [];
    }
    this.isInitialized = true;
  }

  public static getQueue(): SyncQueueItem[] {
    this.init();
    return [...this.queue];
  }

  public static subscribe(listener: QueueListener): () => void {
    listeners.add(listener);
    listener(this.getQueue());
    return () => listeners.delete(listener);
  }

  private static notify() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.queue));
    } catch (e) {
      console.warn('SyncService failed to persist to localStorage', e);
    }
    const current = [...this.queue];
    listeners.forEach((l) => {
      try {
        l(current);
      } catch (err) {
        console.error('Queue listener error', err);
      }
    });
  }

  public static generateIdempotencyKey(entityType: string): string {
    const timestamp = Date.now();
    const randomHex = Math.random().toString(36).substring(2, 9);
    return `${entityType}-${timestamp}-${randomHex}`;
  }

  public static enqueue<T = any>(params: {
    entityType: 'incident' | 'hazard' | 'logistics' | 'consignment' | 'verification';
    action: 'CREATE' | 'UPDATE' | 'STATUS_CHANGE';
    data: T;
    isOffline: boolean;
    commMode?: 'STANDARD' | 'HAM_RADIO' | 'SATELLITE' | 'MESH_NETWORK';
    id?: string;
  }): SyncQueueItem<T> {
    this.init();
    const id = params.id || this.generateIdempotencyKey(params.entityType);

    // Check if item already exists to prevent duplicate insertion
    const existingIndex = this.queue.findIndex((item) => item.id === id);
    if (existingIndex >= 0) {
      return this.queue[existingIndex];
    }

    const item: SyncQueueItem<T> = {
      id,
      entityType: params.entityType,
      action: params.action,
      data: params.data,
      createdAt: new Date().toISOString(),
      syncState: params.isOffline ? 'PENDING' : 'PENDING',
      attempts: 0,
      offlineCreated: params.isOffline,
      commMode: params.commMode || 'STANDARD',
    };

    this.queue = [item, ...this.queue];
    this.notify();
    return item;
  }

  public static markSynchronized(id: string, serverSyncedAt?: string): void {
    this.init();
    this.queue = this.queue.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          syncState: 'SYNCHRONIZED',
          serverSyncedAt: serverSyncedAt || new Date().toISOString(),
          errorMessage: undefined,
        };
      }
      return item;
    });
    this.notify();
  }

  public static markFailed(id: string, errorMessage: string): void {
    this.init();
    this.queue = this.queue.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          syncState: 'FAILED',
          attempts: item.attempts + 1,
          lastAttemptAt: new Date().toISOString(),
          errorMessage,
        };
      }
      return item;
    });
    this.notify();
  }

  public static async syncItem(item: SyncQueueItem): Promise<boolean> {
    try {
      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [item] }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.syncedIds?.includes(item.id)) {
          this.markSynchronized(item.id, result.serverTimestamp);
          return true;
        }
      }
      // Fallback: If server is reachable but returned non-200 or unexpected
      throw new Error(`Server returned HTTP ${response.status}`);
    } catch (err: any) {
      this.markFailed(item.id, err?.message || 'Network request failed');
      return false;
    }
  }

  public static async syncAllPending(): Promise<{ synced: number; failed: number }> {
    this.init();
    const pendingItems = this.queue.filter(
      (item) => item.syncState === 'PENDING' || item.syncState === 'FAILED'
    );

    if (pendingItems.length === 0) {
      return { synced: 0, failed: 0 };
    }

    try {
      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: pendingItems }),
      });

      if (response.ok) {
        const result = await response.json();
        const syncedSet = new Set(result.syncedIds || []);
        let synced = 0;
        let failed = 0;

        this.queue = this.queue.map((item) => {
          if (syncedSet.has(item.id)) {
            synced++;
            return {
              ...item,
              syncState: 'SYNCHRONIZED',
              serverSyncedAt: result.serverTimestamp || new Date().toISOString(),
              errorMessage: undefined,
            };
          } else if (item.syncState === 'PENDING') {
            failed++;
            return {
              ...item,
              syncState: 'FAILED',
              attempts: item.attempts + 1,
              lastAttemptAt: new Date().toISOString(),
              errorMessage: 'Not acknowledged by central dispatch server',
            };
          }
          return item;
        });

        this.notify();
        return { synced, failed };
      } else {
        throw new Error(`Sync failed with status ${response.status}`);
      }
    } catch (err: any) {
      // Mark all pending as failed
      this.queue = this.queue.map((item) => {
        if (item.syncState === 'PENDING') {
          return {
            ...item,
            syncState: 'FAILED',
            attempts: item.attempts + 1,
            lastAttemptAt: new Date().toISOString(),
            errorMessage: err?.message || 'Connection offline',
          };
        }
        return item;
      });
      this.notify();
      return { synced: 0, failed: pendingItems.length };
    }
  }

  public static removeItem(id: string): void {
    this.init();
    this.queue = this.queue.filter((item) => item.id !== id);
    this.notify();
  }

  public static clearSyncedRecords(): void {
    this.init();
    // Only remove records that have been verified and confirmed by server
    this.queue = this.queue.filter((item) => item.syncState !== 'SYNCHRONIZED');
    this.notify();
  }
}
