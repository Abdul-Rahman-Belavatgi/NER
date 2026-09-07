import React from 'react';
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  Clock,
  GitFork,
  CheckCircle2,
  Info
} from 'lucide-react';
import { OperationalAlert } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AlertsViewProps {
  alerts: OperationalAlert[];
  onMarkAllAsRead: () => void;
  onAcknowledgeAlert: (id: string) => void;
  onNavigateTab: (tab: string, context?: any) => void;
  theme?: 'dark' | 'light';
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  onMarkAllAsRead,
  onAcknowledgeAlert,
  onNavigateTab,
  theme = 'dark',
}) => {
  const { at } = useLanguage();
  const cardBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const surfaceBg = theme === 'dark' ? 'bg-black' : 'bg-white shadow-sm';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-neutral-300' : 'text-slate-700';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-600';
  const innerBg = theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-50 border-slate-200';

  return (
    <div className="space-y-4 pb-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className={`flex items-center gap-2 ${textPrimary} text-lg font-bold`}>
            <Bell className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`} />
            <h2>{at.alertsTitle}</h2>
          </div>
          <p className={`text-xs ${textMuted} mt-0.5`}>
            {at.alertsSubtitle}
          </p>
        </div>

        <button
          onClick={onMarkAllAsRead}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition self-start sm:self-auto ${
            theme === 'dark'
              ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-200 hover:text-white border-[#262626]'
              : 'bg-white hover:bg-slate-100 text-slate-800 hover:text-black border-slate-300 shadow-sm'
          }`}
        >
          <CheckCheck className="w-4 h-4 text-emerald-500" />
          <span>{at.alertsMarkAllRead}</span>
        </button>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`${surfaceBg} border rounded-2xl p-4.5 transition ${
              alert.isRead
                ? theme === 'dark'
                  ? 'border-[#262626]/60 opacity-80'
                  : 'border-slate-200 opacity-75'
                : theme === 'dark'
                ? 'border-[#262626] ring-1 ring-white/20 shadow-lg'
                : 'border-slate-300 ring-1 ring-slate-400/30 shadow-md'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    alert.type === 'CRITICAL'
                      ? theme === 'dark'
                        ? 'bg-rose-950 text-rose-400 border border-rose-800'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                      : alert.type === 'HIGH'
                      ? theme === 'dark'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                      : alert.type === 'MEDIUM'
                      ? theme === 'dark'
                        ? 'bg-yellow-950 text-yellow-400 border border-yellow-800'
                        : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                      : theme === 'dark'
                      ? 'bg-white/10 text-slate-200 border border-white/15'
                      : 'bg-slate-100 text-slate-800 border border-slate-300'
                  }`}
                >
                  {alert.type}
                </span>
                <span className={`text-xs font-bold ${textPrimary}`}>
                  {alert.title}
                </span>
              </div>

              <span className={`${textMuted} text-[11px] flex items-center gap-1 shrink-0`}>
                <Clock className="w-3 h-3" />
                {alert.timeAgo}
              </span>
            </div>

            <p className={`text-xs ${textSecondary} leading-relaxed pl-1`}>
              {alert.message}
            </p>

            <div className={`mt-3 pt-3 border-t ${cardBorder} flex items-center justify-between text-xs`}>
              <span className={`${textMuted} text-[11px]`}>
                {alert.isRead ? at.alertsMarkHandled : at.alertsStatusAction}
              </span>

              <div className="flex items-center gap-2">
                {alert.relatedIncidentId && (
                  <button
                    onClick={() => onNavigateTab('routes', { incidentId: alert.relatedIncidentId })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow transition ${
                      theme === 'dark'
                        ? 'bg-[#f1f3f7] hover:bg-white text-slate-950 shadow-white/5'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
                    }`}
                  >
                    <GitFork className="w-3.5 h-3.5" />
                    <span>{at.alertsRerouteConvoys}</span>
                  </button>
                )}

                {alert.id === 'alt-3' && (
                  <button
                    onClick={() => onNavigateTab('vehicles')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      theme === 'dark'
                        ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-200 border-[#262626]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    }`}
                  >
                    <span>{at.alertsCheckVanTemp}</span>
                  </button>
                )}

                {!alert.isRead && (
                  <button
                    onClick={() => onAcknowledgeAlert(alert.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      theme === 'dark'
                        ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-300 border-[#262626]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    }`}
                  >
                    {at.alertsMarkHandled}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

