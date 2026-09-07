import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  GitFork,
  Truck,
  PlusCircle,
  ExternalLink,
  Clock,
  Droplets,
  CloudRain,
  Compass,
  Activity,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Incident, Vehicle, HubWeather } from '../types';
import { LeafletMap } from './LeafletMap';
import { ACCESSIBILITY_SCORES } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

interface DashboardViewProps {
  incidents: Incident[];
  vehicles: Vehicle[];
  weatherHubs: HubWeather[];
  onOpenReportModal: () => void;
  onNavigateTab: (tab: string, context?: any) => void;
  onSelectIncident: (inc: Incident) => void;
  theme?: 'dark' | 'light';
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  incidents,
  vehicles,
  weatherHubs,
  onOpenReportModal,
  onNavigateTab,
  onSelectIncident,
  theme = 'dark',
}) => {
  const { at } = useLanguage();
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const blockedCount = incidents.filter((i) => i.status === 'BLOCKED').length;
  const restrictedCount = incidents.filter((i) => i.status === 'RESTRICTED').length;
  const activeVehiclesCount = vehicles.filter((v) => v.status === 'MOVING').length;

  const filteredIncidents = selectedSector === 'all'
    ? incidents
    : incidents.filter((i) => i.district.toLowerCase().includes(selectedSector.toLowerCase()));

  const cardBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const surfaceBg = theme === 'dark' ? 'bg-black' : 'bg-white shadow-sm';
  const consoleBg = theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-slate-50';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-neutral-300' : 'text-slate-700';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-600';
  const innerBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const subtleBg = theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-slate-100';

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Regional Corridor Operations Banner */}
      <div className={`p-3.5 rounded-xl border ${cardBorder} ${surfaceBg} flex flex-col md:flex-row md:items-center justify-between gap-3`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${
            theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626] text-emerald-400' : 'bg-slate-100 border-slate-300 text-emerald-600'
          } border flex items-center justify-center font-bold text-xs shrink-0`}>
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className={`text-base font-bold tracking-tight ${textPrimary}`}>
                {at.dashCorridorOps}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border flex items-center gap-1.5 ${
                theme === 'dark' ? 'bg-amber-950/40 border-amber-800/80 text-amber-300' : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}>
                <span>⚠️</span>
                <span>{at.dashMonsoonAdvisory}</span>
              </span>
            </div>
            <p className={`text-xs ${textMuted} mt-0.5`}>
              {at.dashCoveringArteries}
            </p>
          </div>
        </div>

        {/* Action Button: Consolidated */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateTab('routes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border ${
              theme === 'dark'
                ? 'bg-[#0a0a0a] hover:bg-[#141414] text-white border-[#262626]'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300'
            } transition active:scale-98`}
          >
            <GitFork className="w-4 h-4 text-emerald-500" />
            <span>{at.dashPlanRouteDetour}</span>
          </button>
        </div>
      </div>

      {/* 2. Key Corridor Metric Cards */}
      <div className={`rounded-xl border ${cardBorder} ${surfaceBg} overflow-hidden`}>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x ${
          theme === 'dark' ? 'divide-[#262626]' : 'divide-slate-200'
        }`}>
          {/* Card 1: Road Network Clearance */}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium ${textMuted}`}>{at.dashRoadClearance}</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                {at.dashRestrictedMovement}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${textPrimary} tracking-tight`}>68% {at.dashPassable}</span>
            </div>
            <div className={`w-full ${
              theme === 'dark' ? 'bg-[#141414] border-[#262626]' : 'bg-slate-200 border-slate-300'
            } h-2 rounded-full overflow-hidden border`}>
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '68%' }} />
            </div>
            <div className={`text-xs ${textMuted} leading-relaxed`}>
              {at.dashClearanceSub}
            </div>
          </div>

          {/* Card 2: Active Road Blockages */}
          <div 
            onClick={() => onNavigateTab('incidents')}
            className={`p-4 space-y-2 cursor-pointer ${
              theme === 'dark' ? 'hover:bg-neutral-900/50' : 'hover:bg-slate-50'
            } transition group`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium ${textMuted}`}>{at.dashActiveBlockages}</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                {blockedCount} {at.dashCritical}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-rose-500 tracking-tight">
                {blockedCount} {at.dashTotalClosure}
              </span>
            </div>
            <div className={`text-xs ${textMuted} leading-relaxed`}>
              {at.dashBlockagesSub}
            </div>
            <div className="pt-1 flex items-center justify-end">
              <span className={`text-xs ${theme === 'dark' ? 'text-neutral-300 group-hover:text-white' : 'text-slate-700 group-hover:text-black'} flex items-center gap-1 font-semibold`}>
                {at.dashViewBlockages}
              </span>
            </div>
          </div>

          {/* Card 3: Active Fleet on Route */}
          <div 
            onClick={() => onNavigateTab('vehicles')}
            className={`p-4 space-y-2 cursor-pointer ${
              theme === 'dark' ? 'hover:bg-neutral-900/50' : 'hover:bg-slate-50'
            } transition group`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium ${textMuted}`}>{at.dashActiveFleet}</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
                <Truck className="w-3 h-3" />
                {at.dashEnRoute}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${textPrimary} tracking-tight`}>
                {activeVehiclesCount} {at.dashVehiclesMoving}
              </span>
              <span className={`text-xs ${textMuted}`}>{at.dashVehiclesDispatched}</span>
            </div>
            <div className={`text-xs ${textMuted} leading-relaxed`}>
              {at.dashFleetSub}
            </div>
            <div className="pt-1 flex items-center justify-end">
              <span className={`text-xs ${theme === 'dark' ? 'text-neutral-300 group-hover:text-white' : 'text-slate-700 group-hover:text-black'} flex items-center gap-1 font-semibold`}>
                {at.dashTrackVehicles}
              </span>
            </div>
          </div>

          {/* Card 4: Landslide Hazard Alert */}
          <div 
            onClick={() => onNavigateTab('weather')}
            className={`p-4 space-y-2 cursor-pointer ${
              theme === 'dark' ? 'hover:bg-neutral-900/50' : 'hover:bg-slate-50'
            } transition group`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium ${textMuted}`}>{at.dashLandslideAlert}</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center gap-1">
                {at.dashHighVulnerability}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-rose-500 tracking-tight">
                {at.dashHighRiskLevel}
              </span>
            </div>
            <div className={`text-xs ${textMuted} leading-relaxed`}>
              {at.dashRainSub}
            </div>
            <div className="pt-1 flex items-center justify-end">
              <span className={`text-xs ${theme === 'dark' ? 'text-neutral-300 group-hover:text-white' : 'text-slate-700 group-hover:text-black'} flex items-center gap-1 font-semibold`}>
                {at.dashWeatherRadar}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Operational Command Console: Interactive Map (Left) + Tactical Incident Dispatch (Right) */}
      {/* 3. Main Operational Command Center */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Left (7 cols): Map Terminal */}
        <div className={`xl:col-span-7 ${surfaceBg} border ${cardBorder} rounded-xl p-3.5 space-y-3`}>
          {/* Map Console Header */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b ${innerBorder} pb-2.5`}>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`text-sm font-bold tracking-tight ${textPrimary}`}>
                {at.dashLiveHighwayMap}
              </span>
            </div>

            {/* Quick Sector Selector Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {[
                { id: 'all', label: at.dashAllCorridors },
                { id: 'east khasi', label: at.dashShillongNH40 },
                { id: 'ri-bhoi', label: at.dashNongpohNH6 },
                { id: 'jaintia', label: at.dashJowaiSilchar },
              ].map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSector(sec.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                    selectedSector === sec.id
                      ? theme === 'dark'
                        ? 'bg-white text-black font-bold'
                        : 'bg-slate-900 text-white font-bold'
                      : theme === 'dark'
                      ? 'text-neutral-400 hover:text-white bg-[#0a0a0a] border border-[#262626]'
                      : 'text-slate-700 hover:text-slate-950 bg-slate-100 border border-slate-300'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>

          {/* Map Display */}
          <div className={`isolate relative rounded-lg overflow-hidden border ${innerBorder}`}>
            {/* Human-readable Location Strip */}
            <div className={`absolute top-2 left-2 z-10 px-2.5 py-1 rounded-md border backdrop-blur text-xs flex items-center gap-1.5 shadow-sm ${
              theme === 'dark'
                ? 'bg-[#0a0a0a]/90 border-[#262626] text-neutral-200'
                : 'bg-white/95 border-slate-300 text-slate-800'
            }`}>
              <span className="text-emerald-500">📍</span>
              <span className="font-semibold">Meghalaya – Assam Corridor</span>
              <span className={theme === 'dark' ? 'text-neutral-600' : 'text-slate-400'}>•</span>
              <span className={`text-[11px] ${textMuted}`}>25.58°N, 91.89°E</span>
            </div>

            <LeafletMap
              incidents={filteredIncidents}
              vehicles={vehicles}
              showLegend={false}
              showActiveFilters={false}
              onSelectIncident={(inc) => {
                onSelectIncident(inc);
              }}
              className="w-full h-[410px]"
            />
          </div>

          {/* Map Footer status with integrated Route Status Legend */}
          <div className={`flex flex-wrap items-center justify-between text-xs ${textMuted} pt-1 gap-2`}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-rose-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                {at.dashBlockedLabel}: {blockedCount}
              </span>
              <span className="flex items-center gap-1.5 text-amber-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                {at.dashRestrictedLabel}: {restrictedCount}
              </span>
              <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                {at.dashMovingLabel}: {activeVehiclesCount}
              </span>

              {/* Integrated Highway Status Legend in Bottom Footer */}
              <div className={`hidden sm:flex items-center gap-2.5 text-[11px] border-l ${innerBorder} pl-3 ${textSecondary}`}>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> {at.statusPassable}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> {at.statusRestricted}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> {at.dashBlockedLabel}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('map')}
              className={`${textSecondary} hover:text-emerald-400 flex items-center gap-1 group font-semibold text-xs transition`}
            >
              <span>{at.dashViewFullscreenMap}</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </button>
          </div>
        </div>

        {/* Right (5 cols): Operational Hazard Dispatch Queue */}
        <div className={`xl:col-span-5 ${surfaceBg} border ${cardBorder} rounded-xl p-3.5 space-y-3`}>
          <div className={`flex items-center justify-between border-b ${innerBorder} pb-2.5`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span className={`text-sm font-bold tracking-tight ${textPrimary}`}>
                {at.dashActiveIncidentsTitle}
              </span>
            </div>
            <button
              onClick={() => onNavigateTab('incidents')}
              className={`text-xs ${textMuted} hover:text-emerald-400 transition font-semibold`}
            >
              {at.dashViewAll} ({incidents.length}) →
            </button>
          </div>

          <div className="space-y-2.5">
            {filteredIncidents.slice(0, 3).map((inc) => (
              <div
                key={inc.id}
                className={`${consoleBg} border ${innerBorder} rounded-lg p-3 hover:border-neutral-500 transition group`}
              >
                {/* Header tag with regular sans-serif text */}
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className={`font-semibold ${textPrimary}`}>
                    {inc.district} ({inc.landmark.includes('NH') ? inc.landmark.split(' ')[0] : 'NH-6'})
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inc.status === 'BLOCKED'
                        ? theme === 'dark'
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                        : inc.status === 'RESTRICTED'
                        ? theme === 'dark'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                        : theme === 'dark'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    {inc.status}
                  </span>
                </div>

                <div className={`text-xs font-bold ${textPrimary} transition`}>
                  {inc.title}
                </div>

                <p className={`text-xs ${textSecondary} mt-1 line-clamp-2 leading-relaxed`}>
                  {inc.description}
                </p>

                {/* Timestamp & Human Reporting Source */}
                <div className={`flex items-center justify-between mt-2.5 pt-2 border-t ${innerBorder} text-xs flex-wrap gap-2`}>
                  <div className="flex flex-col">
                    <span className={`${textMuted} flex items-center gap-1 font-medium text-[11px]`}>
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {inc.timeAgo}
                    </span>
                    {inc.reportedBy && (
                      <span className={`text-[10px] ${textMuted} mt-0.5`}>
                        {inc.reportedBy}
                      </span>
                    )}
                  </div>

                  {/* Realistic Action Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSelectIncident(inc)}
                      className={`px-2.5 py-1 rounded text-xs font-medium border transition ${
                        theme === 'dark'
                          ? 'bg-[#141414] hover:bg-[#202020] text-neutral-200 border-[#333]'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      {at.dashViewOnMap}
                    </button>

                    {inc.status === 'PASSABLE' ? (
                      <span className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                        theme === 'dark'
                          ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        {at.statusPassable}
                      </span>
                    ) : (
                      <button
                        onClick={() => onNavigateTab('routes', { incidentId: inc.id })}
                        className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-semibold transition active:scale-95 ${
                          theme === 'dark'
                            ? 'bg-white hover:bg-neutral-200 text-black'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        <GitFork className="w-3 h-3" />
                        <span>{at.dashFindDetour}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Reroute advisory banner - Human Phrasing */}
          <div className={`p-3 rounded-lg ${subtleBg} border ${innerBorder} flex items-center justify-between text-xs`}>
            <div className={`flex items-center gap-2 ${textSecondary}`}>
              <span className="text-amber-500 font-bold text-sm">⚡</span>
              <span className="font-semibold">{at.dashAlternativeRoute}</span>
            </div>
            <button
              onClick={() => onNavigateTab('routes')}
              className="text-emerald-500 hover:text-emerald-400 font-bold transition shrink-0 ml-2"
            >
              {at.dashReviewBypass}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: State Highway Network Status + Regional Weather & Rain Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
        {/* Road Accessibility Index (7 cols) */}
        <div className={`xl:col-span-7 ${surfaceBg} border ${cardBorder} rounded-xl p-3.5 flex flex-col justify-between space-y-3`}>
          <div>
            <div className={`flex items-center justify-between border-b ${innerBorder} pb-2`}>
              <div>
                <span className={`text-sm font-bold tracking-tight ${textPrimary}`}>
                  {at.dashStateHighwayStatus}
                </span>
                <p className={`text-xs ${textMuted} mt-0.5`}>
                  {at.dashLiveClearanceScore}
                </p>
              </div>
              <span className={`text-xs ${textMuted} font-semibold`}>{at.dashClearanceScoreHeader}</span>
            </div>

            <div className="space-y-3 pt-3">
              {ACCESSIBILITY_SCORES.map((item) => (
                <div key={item.state} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`${textPrimary} font-semibold`}>{item.state}</span>
                    <div className="flex items-center gap-2 font-sans">
                      <span className={`text-xs font-semibold ${
                        item.score >= 70 ? 'text-emerald-500' : 'text-amber-500'
                      }`}>
                        {item.score}% {item.score >= 70 ? at.dashOperationalState : at.dashRestrictedState}
                      </span>
                    </div>
                  </div>
                  <div className={`w-full ${
                    theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-200 border-slate-300'
                  } h-2 rounded-full overflow-hidden border`}>
                    <div
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`pt-2 border-t ${innerBorder} text-xs ${textMuted} flex items-center justify-between`}>
            <span>{at.dashRegionalTransportMonitoring}</span>
            <span className="text-emerald-500 font-semibold">{at.dashRealtimeSync}</span>
          </div>
        </div>

        {/* Regional Weather & Rain Alerts (5 cols) */}
        <div className={`xl:col-span-5 ${surfaceBg} border ${cardBorder} rounded-xl p-3.5 flex flex-col justify-between space-y-3`}>
          <div>
            <div className={`flex items-center justify-between border-b ${innerBorder} pb-2`}>
              <span className={`text-sm font-bold tracking-tight ${textPrimary} flex items-center gap-1.5`}>
                <CloudRain className={`w-4 h-4 text-sky-500`} />
                {at.dashRegionalWeatherAlerts}
              </span>
              <button
                onClick={() => onNavigateTab('weather')}
                className={`text-xs ${textMuted} hover:text-emerald-400 font-semibold`}
              >
                {at.dashDetailedForecast}
              </button>
            </div>

            {/* 4-Hub Balanced 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-3">
              {weatherHubs.map((hub) => (
                <div
                  key={hub.city}
                  onClick={() => onNavigateTab('weather')}
                  className={`${consoleBg} border ${innerBorder} rounded-lg p-2.5 hover:border-neutral-500 cursor-pointer transition`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold ${textPrimary}`}>{hub.city}</span>
                    <span className="text-amber-500 font-bold">{hub.temp}°C</span>
                  </div>
                  <div className={`text-xs ${textSecondary} truncate mt-0.5`}>
                    {hub.condition}
                  </div>
                  <div className={`flex items-center justify-between text-[11px] ${textMuted} mt-2 pt-1 border-t ${innerBorder}`}>
                    <span>Rain: {hub.rainProb}%</span>
                    <span>{hub.windSpeed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Amber Landslide Warning Footer */}
          <div className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
            theme === 'dark'
              ? 'bg-amber-950/30 border-amber-800/60 text-amber-200'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}>
            <span className="flex items-center gap-1.5 font-medium">
              <span>⚠️</span>
              <span>{at.dashLandslideWarningFooter}</span>
            </span>
            <span className="font-bold text-[11px] px-1.5 py-0.5 rounded bg-amber-500/20">
              {at.dashActivePill}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
