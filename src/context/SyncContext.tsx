import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SyncService, SyncQueueItem, SyncQueueState } from '../services/syncService';

interface SyncContextType {
  isOnline: boolean;
  isServerReachable: boolean;
  isManualOfflineSimulated: boolean;
  serverStatus: 'connected' | 'offline';
  syncQueue: SyncQueueItem[];
  pendingCount: number;
  failedCount: number;
  syncedCount: number;
  isSyncing: boolean;
  lastSyncTime: string | null;
  activeCommMode: 'none' | 'ham' | 'satellite' | 'mesh';
  isAltCommModalOpen: boolean;
  enqueueRecord: <T = any>(params: {
    entityType: 'incident' | 'hazard' | 'logistics' | 'consignment' | 'verification';
    action: 'CREATE' | 'UPDATE' | 'STATUS_CHANGE';
    data: T;
    commMode?: 'STANDARD' | 'HAM_RADIO' | 'SATELLITE' | 'MESH_NETWORK';
    id?: string;
  }) => SyncQueueItem<T>;
  syncNow: () => Promise<{ synced: number; failed: number }>;
  retrySingleItem: (id: string) => Promise<boolean>;
  toggleSimulateOffline: () => void;
  setActiveCommMode: (mode: 'none' | 'ham' | 'satellite' | 'mesh') => void;
  setIsAltCommModalOpen: (open: boolean) => void;
  clearSyncedRecords: () => void;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export const SyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [browserOnline, setBrowserOnline] = useState<boolean>(navigator.onLine);
  const [isServerReachable, setIsServerReachable] = useState<boolean>(true);
  const [isManualOfflineSimulated, setIsManualOfflineSimulated] = useState<boolean>(false);
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [activeCommMode, setActiveCommMode] = useState<'none' | 'ham' | 'satellite' | 'mesh'>('none');
  const [isAltCommModalOpen, setIsAltCommModalOpen] = useState<boolean>(false);

  // Subscribe to SyncService queue updates
  useEffect(() => {
    const unsubscribe = SyncService.subscribe((queue) => {
      setSyncQueue(queue);
    });
    return unsubscribe;
  }, []);

  // Check server health periodically
  const checkHealth = useCallback(async (): Promise<boolean> => {
    if (isManualOfflineSimulated) {
      setIsServerReachable(false);
      return false;
    }
    if (!navigator.onLine) {
      setIsServerReachable(false);
      return false;
    }
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const res = await fetch('/api/health', { signal: controller.signal });
      clearTimeout(timeout);
      const ok = res.ok;
      setIsServerReachable(ok);
      return ok;
    } catch {
      setIsServerReachable(false);
      return false;
    }
  }, [isManualOfflineSimulated]);

  // Handle browser online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setBrowserOnline(true);
      checkHealth().then((reachable) => {
        if (reachable) {
          // Auto-sync when connectivity returns
          triggerSync();
        }
      });
    };

    const handleOffline = () => {
      setBrowserOnline(false);
      setIsServerReachable(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check and periodic heartbeat
    checkHealth();
    const interval = setInterval(checkHealth, 15000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [checkHealth]);

  // Overall effective online status
  const isOnline = browserOnline && isServerReachable && !isManualOfflineSimulated;
  const serverStatus: 'connected' | 'offline' = isOnline ? 'connected' : 'offline';

  // Automatically sync pending items when transitioning to online
  const triggerSync = useCallback(async () => {
    if (!isOnline && !isManualOfflineSimulated) {
      const reachable = await checkHealth();
      if (!reachable) return { synced: 0, failed: 0 };
    }
    if (isManualOfflineSimulated) {
      return { synced: 0, failed: 0 };
    }

    setIsSyncing(true);
    try {
      const result = await SyncService.syncAllPending();
      setLastSyncTime(new Date().toLocaleTimeString());
      return result;
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, isManualOfflineSimulated, checkHealth]);

  // Enqueue new record with state tracking
  const enqueueRecord = useCallback(
    <T = any>(params: {
      entityType: 'incident' | 'hazard' | 'logistics' | 'consignment' | 'verification';
      action: 'CREATE' | 'UPDATE' | 'STATUS_CHANGE';
      data: T;
      commMode?: 'STANDARD' | 'HAM_RADIO' | 'SATELLITE' | 'MESH_NETWORK';
      id?: string;
    }) => {
      const offline = !isOnline;
      const item = SyncService.enqueue({
        ...params,
        isOffline: offline,
      });

      // If we are online, immediately attempt to sync
      if (!offline) {
        SyncService.syncItem(item).then((success) => {
          if (success) {
            setLastSyncTime(new Date().toLocaleTimeString());
          }
        });
      }

      return item;
    },
    [isOnline]
  );

  const retrySingleItem = useCallback(
    async (id: string): Promise<boolean> => {
      const item = syncQueue.find((i) => i.id === id);
      if (!item) return false;
      setIsSyncing(true);
      try {
        const success = await SyncService.syncItem(item);
        if (success) {
          setLastSyncTime(new Date().toLocaleTimeString());
        }
        return success;
      } finally {
        setIsSyncing(false);
      }
    },
    [syncQueue]
  );

  const toggleSimulateOffline = useCallback(() => {
    setIsManualOfflineSimulated((prev) => {
      const next = !prev;
      if (!next) {
        // Turning back online -> trigger auto sync!
        setTimeout(() => {
          checkHealth().then((ok) => {
            if (ok) triggerSync();
          });
        }, 300);
      } else {
        setIsServerReachable(false);
      }
      return next;
    });
  }, [checkHealth, triggerSync]);

  const clearSyncedRecords = useCallback(() => {
    SyncService.clearSyncedRecords();
  }, []);

  const pendingCount = syncQueue.filter((i) => i.syncState === 'PENDING').length;
  const failedCount = syncQueue.filter((i) => i.syncState === 'FAILED').length;
  const syncedCount = syncQueue.filter((i) => i.syncState === 'SYNCHRONIZED').length;

  return (
    <SyncContext.Provider
      value={{
        isOnline,
        isServerReachable,
        isManualOfflineSimulated,
        serverStatus,
        syncQueue,
        pendingCount,
        failedCount,
        syncedCount,
        isSyncing,
        lastSyncTime,
        activeCommMode,
        isAltCommModalOpen,
        enqueueRecord,
        syncNow: triggerSync,
        retrySingleItem,
        toggleSimulateOffline,
        setActiveCommMode,
        setIsAltCommModalOpen,
        clearSyncedRecords,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = (): SyncContextType => {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
};
