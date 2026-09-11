import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  Wifi,
  WifiOff,
  Radio,
  Send,
  Trash2,
  ArrowUpRight
} from 'lucide-react';
import { useSync } from '../context/SyncContext';
import { useLanguage } from '../context/LanguageContext';
import { UserProfile } from '../types';

interface SyncQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'light';
  currentUser?: UserProfile;
}

export const SyncQueueModal: React.FC<SyncQueueModalProps> = ({
  isOpen,
  onClose,
  theme = 'dark',
  currentUser,
}) => {
  const {
    isOnline,
    serverStatus,
    syncQueue,
    pendingCount,
    failedCount,
    syncedCount,
    isSyncing,
    lastSyncTime,
    syncNow,
    retrySingleItem,
    toggleSimulateOffline,
    isManualOfflineSimulated,
    clearSyncedRecords,
    removeRecord,
    setIsAltCommModalOpen,
  } = useSync();

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'authority';

  const { at } = useLanguage();

  if (!isOpen || typeof document === 'undefined') return null;

  const cardBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const surfaceBg = theme === 'dark' ? 'bg-black' : 'bg-white';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-500';
  const innerCard = theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-50 border-slate-200';

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[99998] overflow-y-auto p-3 sm:p-5 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${surfaceBg} border ${cardBorder} rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[88vh]`}
      >
        {/* Header */}
        <div className={`px-5 py-4 border-b ${cardBorder} flex items-center justify-between ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-slate-50'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
              isOnline ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
              {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-sm font-bold ${textPrimary}`}>
                  Client Sync Queue & Offline Storage
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isOnline ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}>
                  {isOnline ? 'Server Connected' : 'Server Offline'}
                </span>
              </div>
              <p className={`text-xs ${textMuted} mt-0.5`}>
                Local data persists across browser reloads. Never deleted until central server confirmation.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg ${textMuted} hover:${textPrimary} ${theme === 'dark' ? 'hover:bg-neutral-900' : 'hover:bg-slate-200'} transition`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Bar */}
        <div className={`px-5 py-3 border-b ${cardBorder} flex flex-wrap items-center justify-between gap-3 text-xs ${
          theme === 'dark' ? 'bg-[#111111]' : 'bg-slate-100'
        }`}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <strong className={textPrimary}>{pendingCount}</strong> Pending
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <strong className={textPrimary}>{failedCount}</strong> Failed
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <strong className={textPrimary}>{syncedCount}</strong> Synchronized
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSimulateOffline}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition flex items-center gap-1.5 ${
                isManualOfflineSimulated
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                  : theme === 'dark'
                  ? 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:text-black'
              }`}
              title="Simulate network loss to test offline queue without disconnecting Wi-Fi"
            >
              {isManualOfflineSimulated ? 'Exit Offline Simulation' : 'Simulate Offline Outage'}
            </button>

            <button
              onClick={() => syncNow()}
              disabled={isSyncing || !isOnline}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition ${
                isOnline
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Pending'}</span>
            </button>
          </div>
        </div>

        {/* Offline Emergency Warning */}
        {!isOnline && (
          <div className="px-5 py-2.5 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between gap-3 text-xs text-amber-300">
            <span className="flex items-center gap-2">
              <Radio className="w-4 h-4 animate-pulse shrink-0" />
              <span>Network down: Alternate emergency transmission (HAM Radio / Satellite / Mesh) available.</span>
            </span>
            <button
              onClick={() => {
                onClose();
                setIsAltCommModalOpen(true);
              }}
              className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-semibold text-[11px] hover:bg-amber-400 transition shrink-0"
            >
              Open Alt-Comm
            </button>
          </div>
        )}

        {/* Queue List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {syncQueue.length === 0 ? (
            <div className="text-center py-10">
              <CheckCircle2 className="w-10 h-10 text-emerald-500/40 mx-auto mb-2" />
              <p className={`text-sm font-medium ${textPrimary}`}>All operational records are synchronized</p>
              <p className={`text-xs ${textMuted} mt-1`}>
                New incident reports, field hazards, and consignment data created while offline will queue here automatically.
              </p>
            </div>
          ) : (
            syncQueue.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border ${innerCard} flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      item.syncState === 'SYNCHRONIZED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : item.syncState === 'FAILED'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      {item.syncState}
                    </span>
                    <span className={`text-[10px] font-mono ${textMuted}`}>
                      ID: {item.id}
                    </span>
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase">
                      • {item.entityType} ({item.action})
                    </span>
                    {item.commMode && item.commMode !== 'STANDARD' && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {item.commMode}
                      </span>
                    )}
                  </div>

                  <p className={`text-xs font-semibold ${textPrimary} truncate max-w-md`}>
                    {item.data?.title || item.data?.commodity || item.data?.landmark || `${item.entityType} record`}
                  </p>

                  <div className={`flex items-center gap-3 text-[11px] ${textMuted}`}>
                    <span>Created: {new Date(item.createdAt).toLocaleTimeString()}</span>
                    {item.serverSyncedAt && (
                      <span className="text-emerald-400">
                        Confirmed: {new Date(item.serverSyncedAt).toLocaleTimeString()}
                      </span>
                    )}
                    {item.errorMessage && (
                      <span className="text-rose-400 truncate max-w-xs">
                        Error: {item.errorMessage}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {item.syncState !== 'SYNCHRONIZED' && (
                    <button
                      onClick={() => retrySingleItem(item.id)}
                      disabled={isSyncing || !isOnline}
                      className={`px-2.5 py-1 rounded text-xs font-medium border flex items-center gap-1 transition ${
                        isOnline
                          ? 'border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10'
                          : 'border-neutral-700 text-neutral-600 cursor-not-allowed'
                      }`}
                    >
                      <RefreshCw className="w-3 h-3" />
                      Retry
                    </button>
                  )}

                  {/* Admin-only Delete Option for Pending / Offline records */}
                  {isAdmin && (
                    confirmDeleteId === item.id ? (
                      <div className="flex items-center gap-1.5 bg-rose-950/80 border border-rose-600 px-2 py-1 rounded text-xs">
                        <span className="text-[11px] text-rose-300 font-semibold">Delete?</span>
                        <button
                          onClick={() => {
                            removeRecord(item.id);
                            setConfirmDeleteId(null);
                          }}
                          className="px-1.5 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px] hover:bg-rose-500"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px] hover:bg-neutral-700"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(item.id)}
                        className={`px-2.5 py-1 rounded text-xs font-semibold border flex items-center gap-1 transition ${
                          theme === 'dark'
                            ? 'border-rose-800/60 bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 hover:text-white'
                            : 'border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-900'
                        }`}
                        title="Delete pending offline record (Admin only)"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className={`px-5 py-3 border-t ${cardBorder} flex items-center justify-between text-xs ${
          theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-slate-50'
        }`}>
          <div className={textMuted}>
            {lastSyncTime ? `Last sync confirmed: ${lastSyncTime}` : 'Idempotent transmission queue active'}
          </div>
          {syncedCount > 0 && (
            <button
              onClick={clearSyncedRecords}
              className={`text-[11px] font-medium ${textMuted} hover:text-rose-400 transition flex items-center gap-1`}
            >
              <Trash2 className="w-3 h-3" />
              Clear Synchronized Records ({syncedCount})
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
