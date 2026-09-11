import React, { useState } from 'react';
import {
  AlertTriangle,
  PlusCircle,
  Search,
  Clock,
  GitFork,
  Eye,
  MapPin,
  Camera,
  CheckCircle,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Incident, UserProfile, isPublicUser, isAuthorityUser, isLogisticsUser } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface IncidentsViewProps {
  incidents: Incident[];
  selectedIncident: Incident | null;
  onSelectIncident: (inc: Incident) => void;
  onOpenReportModal: () => void;
  onNavigateTab: (tab: string, context?: any) => void;
  currentUser?: UserProfile;
  theme?: 'dark' | 'light';
}

export const IncidentsView: React.FC<IncidentsViewProps> = ({
  incidents,
  selectedIncident,
  onSelectIncident,
  onOpenReportModal,
  onNavigateTab,
  currentUser,
  theme = 'dark',
}) => {
  const { at } = useLanguage();
  const isPublic = currentUser ? isPublicUser(currentUser.role) : false;
  const isAuthority = currentUser ? isAuthorityUser(currentUser.role) : false;
  const isLogistics = currentUser ? isLogisticsUser(currentUser.role) : true;

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [hazardFilter, setHazardFilter] = useState('all');

  const cardBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const surfaceBg = theme === 'dark' ? 'bg-black' : 'bg-white shadow-sm';
  const inputBg = theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626] text-neutral-200' : 'bg-slate-50 border-slate-300 text-slate-900';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-neutral-300' : 'text-slate-700';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-600';
  const innerBg = theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-50 border-slate-200';

  // For public users, only show verified incidents
  const visibleIncidents = isPublic
    ? incidents.filter((i) => i.verificationStatus !== 'PENDING' && i.verificationStatus !== 'REJECTED')
    : incidents;

  const filteredIncidents = visibleIncidents.filter((inc) => {
    const matchesSearch =
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.landmark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity =
      severityFilter === 'all' || inc.severity === severityFilter;

    const matchesHazard =
      hazardFilter === 'all' || inc.hazardType === hazardFilter;

    return matchesSearch && matchesSeverity && matchesHazard;
  });

  return (
    <div className="space-y-4 pb-8">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className={`flex items-center gap-2 ${textPrimary} text-lg font-bold`}>
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <h2>{at.incidentsTitle}</h2>
          </div>
          <p className={`text-xs ${textMuted} mt-0.5`}>
            {at.incidentsSubtitle}
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition shrink-0 self-start sm:self-auto ${
            theme === 'dark'
              ? 'bg-[#f1f3f7] hover:bg-white text-slate-950 shadow-white/5'
              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
          }`}
        >
          <span>{at.headerReportIncident || 'Report Incident'}</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className={`${surfaceBg} border ${cardBorder} rounded-2xl p-3 flex flex-col md:flex-row items-center gap-3`}>
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={at.incidentsSearchPlaceholder}
            className={`w-full ${inputBg} rounded-xl pl-9 pr-3 py-2 text-xs placeholder-slate-400 focus:outline-none focus:border-slate-500 border`}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className={`${inputBg} rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-slate-500 border`}
          >
            <option value="all">{at.incidentsAllSeverities}</option>
            <option value="critical">{at.incidentsCritical}</option>
            <option value="high">{at.incidentsHigh}</option>
            <option value="medium">{at.incidentsMedium}</option>
            <option value="low">{at.incidentsLow}</option>
          </select>

          <select
            value={hazardFilter}
            onChange={(e) => setHazardFilter(e.target.value)}
            className={`${inputBg} rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-slate-500 border`}
          >
            <option value="all">{at.incidentsAllHazards}</option>
            <option value="Landslide">{at.incidentsLandslide}</option>
            <option value="Flash Flood">{at.incidentsFlashFlood}</option>
            <option value="Rockfall">{at.incidentsRockfall}</option>
            <option value="Commercial Congestion">{at.incidentsCongestion}</option>
            <option value="Bridge/Culvert Damage">{at.incidentsBridgeDamage}</option>
          </select>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Column: Feed List (7 cols) */}
        <div className="xl:col-span-7 space-y-3">
          {filteredIncidents.length === 0 ? (
            <div className={`${surfaceBg} border ${cardBorder} rounded-2xl p-8 text-center ${textMuted} text-xs`}>
              {at.incidentsNoHazards}
            </div>
          ) : (
            filteredIncidents.map((inc) => {
              const isSelected = selectedIncident?.id === inc.id;
              return (
                <div
                  key={inc.id}
                  onClick={() => onSelectIncident(inc)}
                  className={`rounded-2xl p-4 border transition cursor-pointer ${
                    isSelected
                      ? theme === 'dark'
                        ? 'bg-[#121212] border-white/60 shadow-xl ring-1 ring-white/30'
                        : 'bg-white border-slate-900 shadow-lg ring-1 ring-slate-900/20'
                      : theme === 'dark'
                      ? 'bg-black border-[#262626] hover:border-neutral-500'
                      : 'bg-white border-slate-200 hover:border-slate-400 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`font-mono font-bold ${textMuted}`}>
                      {inc.code} • {inc.location}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        inc.status === 'BLOCKED'
                          ? theme === 'dark'
                            ? 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                          : inc.status === 'RESTRICTED'
                          ? theme === 'dark'
                            ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                          : theme === 'dark'
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      • {inc.status === 'BLOCKED' ? at.statusBlocked : inc.status === 'RESTRICTED' ? at.statusRestricted : at.statusPassable}
                    </span>
                  </div>

                  <h3 className={`text-xs font-bold ${textPrimary} leading-snug`}>
                    {inc.title}
                  </h3>
                  <p className={`text-xs ${textSecondary} mt-1 leading-relaxed`}>
                    {inc.description}
                  </p>

                  <div className={`text-[11px] ${textMuted} mt-2 flex items-center gap-1`}>
                    <span>{at.incidentsSource}</span>
                    <strong className={textSecondary}>{inc.reportedBy}</strong>
                  </div>

                  <div className={`flex items-center justify-between mt-3 pt-2.5 border-t ${cardBorder} text-xs`}>
                    <div className="flex items-center gap-3">
                      <span className={`${textMuted} flex items-center gap-1 text-[11px]`}>
                        <Clock className="w-3.5 h-3.5" />
                        {inc.timeAgo}
                      </span>
                      {inc.delayText && (
                        <span className="text-rose-500 font-semibold text-[11px]">
                          {at.incidentsDelay} {inc.delayText}
                        </span>
                      )}
                    </div>

                    {inc.status === 'BLOCKED' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateTab('routes', { incidentId: inc.id });
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-xs shadow-sm transition active:scale-95 ${
                          theme === 'dark'
                            ? 'bg-[#f1f3f7] hover:bg-white text-slate-950'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        <GitFork className="w-3.5 h-3.5" />
                        <span>{at.incidentsCalculateDetour}</span>
                      </button>
                    ) : inc.status === 'RESTRICTED' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateTab('routes', { incidentId: inc.id });
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-xs border transition active:scale-95 ${
                          theme === 'dark'
                            ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-200 border-[#262626]'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{at.incidentsViewAdvisory}</span>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectIncident(inc);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-xs border transition active:scale-95 ${
                          theme === 'dark'
                            ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-200 border-[#262626]'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{at.incidentsViewDetails}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Detail Pane (5 cols) */}
        <div className={`xl:col-span-5 ${surfaceBg} border ${cardBorder} rounded-2xl p-5 shadow-xl min-h-[420px] flex flex-col justify-center`}>
          {selectedIncident ? (
            <div className="space-y-4">
              <div className={`flex items-center justify-between pb-3 border-b ${cardBorder}`}>
                <div>
                  <div className={`text-[11px] font-mono font-bold ${textMuted}`}>
                    Incident Details: {selectedIncident.code}
                  </div>
                  <h3 className={`text-sm font-bold ${textPrimary} mt-0.5`}>
                    {selectedIncident.title}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedIncident.status === 'BLOCKED'
                      ? theme === 'dark'
                        ? 'bg-rose-950 text-rose-400 border border-rose-800'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                      : theme === 'dark'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {selectedIncident.status === 'BLOCKED' ? at.statusBlocked : selectedIncident.status === 'RESTRICTED' ? at.statusRestricted : at.statusPassable}
                </span>
              </div>

              {/* Photo Evidence if exists or fallback banner */}
              {selectedIncident.photoUrl ? (
                <div className={`relative rounded-xl overflow-hidden border ${cardBorder} h-44 group`}>
                  <img
                    src={selectedIncident.photoUrl}
                    alt={selectedIncident.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] text-white flex items-center gap-1">
                    <Camera className="w-3 h-3 text-slate-300" />
                    <span>📷 Field Photo (Verified by Local Police)</span>
                  </div>
                </div>
              ) : (
                <div className={`rounded-xl ${innerBg} p-4 text-center text-xs ${textMuted} flex items-center justify-center gap-2 border`}>
                  <Camera className="w-4 h-4 text-slate-400" />
                  <span>No photographic upload attached for this record.</span>
                </div>
              )}

              {/* Location & GPS */}
              <div className={`${innerBg} rounded-xl p-3 border space-y-1.5 text-xs`}>
                <div className={`flex items-center justify-between ${textSecondary}`}>
                  <span className={textMuted}>{at.incidentsCorridorLandmark}</span>
                  <span className={`font-semibold ${textPrimary}`}>{selectedIncident.landmark}</span>
                </div>
                <div className={`flex items-center justify-between ${textSecondary}`}>
                  <span className={textMuted}>{at.incidentsDistrictState}</span>
                  <span className={`font-semibold ${textPrimary}`}>{selectedIncident.location}</span>
                </div>
                <div className={`flex items-center justify-between ${textSecondary}`}>
                  <span className={textMuted}>{at.incidentsReportingSource}</span>
                  <span className={`font-semibold ${textPrimary}`}>{selectedIncident.reportedBy}</span>
                </div>
                <div className={`flex items-center justify-between ${textSecondary}`}>
                  <span className={textMuted}>{at.incidentsGpsCoordinates}</span>
                  <span className={`font-mono ${textPrimary}`}>
                    {selectedIncident.coordinates[0]}° N, {selectedIncident.coordinates[1]}° E
                  </span>
                </div>
                <div className={`flex items-center justify-between ${textSecondary}`}>
                  <span className={textMuted}>{at.incidentsEstClearance}</span>
                  <span className="font-semibold text-rose-500">{selectedIncident.delayText}</span>
                </div>
              </div>

              {/* Operational Action */}
              <div className="pt-2 flex gap-2">
                {isPublic ? (
                  <>
                    <button
                      onClick={() => onNavigateTab('map')}
                      className={`flex-1 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition ${
                        theme === 'dark'
                          ? 'bg-[#f1f3f7] hover:bg-white text-slate-950'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{at.incidentsViewOnLiveMap}</span>
                    </button>
                    <button
                      onClick={onOpenReportModal}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition ${
                        theme === 'dark'
                          ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-200 border-[#262626]'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                      }`}
                    >
                      {at.incidentsReportUpdate}
                    </button>
                  </>
                ) : isAuthority ? (
                  <>
                    <button
                      onClick={() => onNavigateTab('verificationQueue')}
                      className={`flex-1 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition ${
                        theme === 'dark'
                          ? 'bg-amber-400 hover:bg-amber-300 text-black font-bold'
                          : 'bg-amber-500 hover:bg-amber-600 text-white font-bold'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{at.incidentsVerificationQueue}</span>
                    </button>
                    <button
                      onClick={() => onNavigateTab('map')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition ${
                        theme === 'dark'
                          ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-200 border-[#262626]'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                      }`}
                    >
                      {at.incidentsViewOnMap}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onNavigateTab('routes', { incidentId: selectedIncident.id })}
                      className={`flex-1 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition ${
                        theme === 'dark'
                          ? 'bg-[#f1f3f7] hover:bg-white text-slate-950'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <GitFork className="w-4 h-4" />
                      <span>{at.incidentsFindSafeDetour}</span>
                    </button>
                    <button
                      onClick={() => onNavigateTab('map')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition ${
                        theme === 'dark'
                          ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-200 border-[#262626]'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                      }`}
                    >
                      {at.incidentsViewOnMap}
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 px-4 space-y-3">
              <div className={`w-12 h-12 rounded-2xl ${innerBg} border flex items-center justify-center text-slate-400 mx-auto`}>
                <Eye className="w-6 h-6" />
              </div>
              <div className={`text-sm font-bold ${textPrimary}`}>
                {at.incidentsNoSelectedTitle}
              </div>
              <p className={`text-xs ${textMuted} max-w-xs mx-auto leading-relaxed`}>
                {at.incidentsNoSelectedSub}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
