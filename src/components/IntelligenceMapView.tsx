import React, { useState } from 'react';
import { AlertTriangle, Truck, GitFork, ArrowRight, Filter, ShieldCheck, MapPin, Layers, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Incident, Vehicle, UserProfile, isPublicUser, isAuthorityUser, isLogisticsUser } from '../types';
import { LeafletMap } from './LeafletMap';
import { useLanguage } from '../context/LanguageContext';

interface IntelligenceMapViewProps {
  incidents: Incident[];
  vehicles: Vehicle[];
  currentUser?: UserProfile;
  onNavigateTab: (tab: string, context?: any) => void;
  onSelectIncident: (inc: Incident) => void;
  onSelectVehicle: (veh: Vehicle) => void;
  theme?: 'dark' | 'light';
}

export const IntelligenceMapView: React.FC<IntelligenceMapViewProps> = ({
  incidents,
  vehicles,
  currentUser,
  onNavigateTab,
  onSelectIncident,
  onSelectVehicle,
  theme = 'dark',
}) => {
  const { at, t } = useLanguage();
  const isPublic = currentUser ? isPublicUser(currentUser.role) : false;
  const isAuthority = currentUser ? isAuthorityUser(currentUser.role) : false;
  const isLogistics = currentUser ? isLogisticsUser(currentUser.role) : true;

  const [layers, setLayers] = useState({
    weatherRadar: true,
    incidents: true,
    vehicles: true, // Accessible for all users including public travelers/drivers
    roadStatus: true,
  });

  const [activeFilters, setActiveFilters] = useState<{
    roadStatus?: string;
    district?: string;
    vehicleStatus?: string;
  }>({
    roadStatus: 'Blocked',
    district: 'East Khasi Hills',
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const activeFiltersCount = [
    activeFilters.roadStatus && activeFilters.roadStatus !== 'All' ? activeFilters.roadStatus : null,
    activeFilters.district && activeFilters.district !== 'All' ? activeFilters.district : null,
    activeFilters.vehicleStatus && activeFilters.vehicleStatus !== 'All' ? activeFilters.vehicleStatus : null,
  ].filter(Boolean).length;

  const handleToggleLayer = (
    key: 'weatherRadar' | 'incidents' | 'vehicles' | 'roadStatus'
  ) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setLayers((prev) => ({ ...prev, vehicles: true }));
  };

  const cardBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const surfaceBg = theme === 'dark' ? 'bg-black' : 'bg-white shadow-sm';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-600';
  const textSecondary = theme === 'dark' ? 'text-neutral-300' : 'text-slate-700';

  // For public users, only verified incidents are shown on the live map
  const visibleIncidents = isPublic
    ? incidents.filter((i) => i.verificationStatus !== 'PENDING' && i.verificationStatus !== 'REJECTED')
    : incidents;

  const filteredIncidents = visibleIncidents.filter((inc) => {
    if (activeFilters.roadStatus && activeFilters.roadStatus !== 'All' && inc.status.toLowerCase() !== activeFilters.roadStatus.toLowerCase()) {
      return false;
    }
    if (activeFilters.district && activeFilters.district !== 'All' && !inc.district.toLowerCase().includes(activeFilters.district.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Fleet vehicles filtered according to the Fleet Tracking filter toolbar (available to public drivers too)
  const mapVehicles = vehicles.filter((veh) => {
    if (!layers.vehicles) return false;
    if (activeFilters.vehicleStatus && activeFilters.vehicleStatus !== 'All') {
      if (veh.status.toLowerCase() !== activeFilters.vehicleStatus.toLowerCase()) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-3 pb-6 flex flex-col h-[calc(100vh-6rem)]">
      {/* Full Map Canvas Container with Collapsible Right-Side Controls */}
      <div className={`relative flex-1 w-full rounded-2xl overflow-hidden border ${cardBorder} ${
        theme === 'dark' ? 'bg-black' : 'bg-slate-100'
      } shadow-xl`}>
        <LeafletMap
          incidents={filteredIncidents}
          vehicles={mapVehicles}
          showActiveFilters={false}
          showLayersControl={false}
          showLegend={false}
          layers={layers}
          onToggleLayer={handleToggleLayer}
          onSelectIncident={onSelectIncident}
          onSelectVehicle={onSelectVehicle}
          theme={theme}
          className="w-full h-full min-h-[500px]"
        />

        {/* Top-Right Collapsible Controls Deck: Active Filters & Map Layers */}
        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-2 max-w-[calc(100%-24px)] pointer-events-none">
          {/* Action Pills Row */}
          <div className="flex items-center gap-2 flex-wrap justify-end pointer-events-auto">
            {/* Active Filters Toggle */}
            <button
              type="button"
              onClick={() => {
                setIsFiltersOpen((prev) => !prev);
                if (!isFiltersOpen) setIsLayersOpen(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold shadow-lg transition backdrop-blur-md cursor-pointer ${
                isFiltersOpen
                  ? theme === 'dark'
                    ? 'bg-[#f1f3f7] border-white text-slate-950'
                    : 'bg-slate-900 border-slate-900 text-white'
                  : activeFiltersCount > 0
                  ? theme === 'dark'
                    ? 'bg-black/90 border-rose-500/60 text-rose-300 hover:text-white hover:bg-neutral-900'
                    : 'bg-white/95 border-rose-400 text-rose-700 hover:text-black hover:bg-slate-50'
                  : theme === 'dark'
                  ? 'bg-black/90 border-[#262626] text-neutral-300 hover:text-white hover:bg-[#141414]'
                  : 'bg-white/95 border-slate-300 text-slate-800 hover:text-black hover:bg-slate-50'
              }`}
              title="Toggle Active Filters"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{at.mapFilter || 'Active Filters'}</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
              {isFiltersOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Map Layers Toggle */}
            <button
              type="button"
              onClick={() => {
                setIsLayersOpen((prev) => !prev);
                if (!isLayersOpen) setIsFiltersOpen(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold shadow-lg transition backdrop-blur-md cursor-pointer ${
                isLayersOpen
                  ? theme === 'dark'
                    ? 'bg-[#f1f3f7] border-white text-slate-950'
                    : 'bg-slate-900 border-slate-900 text-white'
                  : theme === 'dark'
                  ? 'bg-black/90 border-[#262626] text-neutral-300 hover:text-white hover:bg-[#141414]'
                  : 'bg-white/95 border-slate-300 text-slate-800 hover:text-black hover:bg-slate-50'
              }`}
              title="Toggle Map Layers"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{at.dashLayers || 'Map Layers'}</span>
              {isLayersOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {/* Collapsible Active Filters Dropdown Card */}
          {isFiltersOpen && (
            <div className={`pointer-events-auto ${surfaceBg} backdrop-blur-md border ${cardBorder} rounded-xl p-3 shadow-2xl text-xs flex flex-col gap-2.5 w-[270px]`}>
              <div className={`flex items-center justify-between pb-1.5 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-slate-200'}`}>
                <span className={`font-bold uppercase tracking-wider text-[10px] ${textMuted} flex items-center gap-1`}>
                  <Filter className="w-3 h-3 text-neutral-400" />
                  {at.mapFilter || 'Active Filters'}
                </span>
                <div className="flex items-center gap-2">
                  {activeFiltersCount > 0 && (
                    <button
                      type="button"
                      onClick={handleClearFilters}
                      className="text-[11px] text-rose-500 hover:underline font-semibold cursor-pointer"
                    >
                      {at.mapReset || 'Reset'}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsFiltersOpen(false)}
                    className={`${textMuted} hover:text-white text-xs p-1 cursor-pointer`}
                    title="Collapse Filters"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label className={`block text-[10px] font-semibold uppercase tracking-wider ${textMuted} mb-1`}>
                    Road Status
                  </label>
                  <select
                    value={activeFilters.roadStatus || 'All'}
                    onChange={(e) => setActiveFilters((prev) => ({ ...prev, roadStatus: e.target.value === 'All' ? undefined : e.target.value }))}
                    className={`w-full px-2.5 py-1.5 rounded-md border text-xs font-medium cursor-pointer transition ${
                      theme === 'dark'
                        ? 'bg-[#0a0a0a] border-[#262626] text-white hover:border-neutral-500'
                        : 'bg-white border-slate-300 text-slate-900 hover:border-slate-400'
                    }`}
                  >
                    <option value="All">{at.mapStatusAll || 'Status: All'}</option>
                    <option value="Blocked">{at.mapStatusBlocked || 'Status: Blocked'}</option>
                    <option value="Restricted">{at.mapStatusRestricted || 'Status: Restricted'}</option>
                    <option value="Passable">{at.statusPassable || 'Status: Passable'}</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-[10px] font-semibold uppercase tracking-wider ${textMuted} mb-1`}>
                    District
                  </label>
                  <select
                    value={activeFilters.district || 'All'}
                    onChange={(e) => setActiveFilters((prev) => ({ ...prev, district: e.target.value === 'All' ? undefined : e.target.value }))}
                    className={`w-full px-2.5 py-1.5 rounded-md border text-xs font-medium cursor-pointer transition ${
                      theme === 'dark'
                        ? 'bg-[#0a0a0a] border-[#262626] text-white hover:border-neutral-500'
                        : 'bg-white border-slate-300 text-slate-900 hover:border-slate-400'
                    }`}
                  >
                    <option value="All">{at.incidentsFilterAllDistricts || 'District: All'}</option>
                    <option value="East Jaintia Hills">{at.districtEastJaintia || 'East Jaintia Hills'}</option>
                    <option value="East Khasi Hills">{at.districtEastKhasi || 'East Khasi Hills'}</option>
                    <option value="Ri-Bhoi">{at.districtRiBhoi || 'Ri-Bhoi'}</option>
                    <option value="Kamrup Metropolitan">{at.districtKamrupMetro || 'Kamrup Metropolitan'}</option>
                    <option value="Cachar">{at.districtCachar || 'Cachar'}</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className={`text-[10px] font-semibold uppercase tracking-wider ${textMuted}`}>
                      Fleet Tracking
                    </label>
                    <button
                      type="button"
                      onClick={() => handleToggleLayer('vehicles')}
                      className={`text-[10px] font-bold ${layers.vehicles ? 'text-emerald-400' : 'text-neutral-500'} hover:underline`}
                    >
                      {layers.vehicles ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                  {layers.vehicles && (
                    <select
                      value={activeFilters.vehicleStatus || 'All'}
                      onChange={(e) => setActiveFilters((prev) => ({ ...prev, vehicleStatus: e.target.value === 'All' ? undefined : e.target.value }))}
                      className={`w-full px-2.5 py-1.5 rounded-md border text-xs font-medium cursor-pointer transition ${
                        theme === 'dark'
                          ? 'bg-[#0a0a0a] border-[#262626] text-white hover:border-neutral-500'
                          : 'bg-white border-slate-300 text-slate-900 hover:border-slate-400'
                      }`}
                      title="Filter Fleet Vehicles by Status"
                    >
                      <option value="All">{at.filterAllVehicles || 'Fleet: All Statuses'}</option>
                      <option value="MOVING">{at.statusMoving || 'Fleet: Moving'}</option>
                      <option value="DELAYED">{at.statusDelayedTag || 'Fleet: Delayed'}</option>
                      <option value="IDLE">{at.statusIdle || 'Fleet: Idle / Parked'}</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Collapsible Map Layers Dropdown Card */}
          {isLayersOpen && (
            <div className={`pointer-events-auto ${surfaceBg} backdrop-blur-md border ${cardBorder} rounded-xl p-3 shadow-2xl text-xs w-[185px] space-y-2`}>
              <div className={`flex items-center justify-between pb-1.5 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-slate-200'}`}>
                <span className={`font-bold uppercase tracking-wider text-[10px] ${textMuted}`}>
                  {at.dashLayers || 'Map Layers'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsLayersOpen(false)}
                  className={`${textMuted} hover:text-white text-xs p-1 cursor-pointer`}
                  title="Collapse Layers"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <label className={`flex items-center justify-between ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'} cursor-pointer select-none`}>
                <span className="flex items-center gap-1.5">
                  <span className="text-xs">🌧️</span> {at.dashWeatherRadar || 'Weather Radar'}
                </span>
                <input
                  type="checkbox"
                  checked={layers.weatherRadar}
                  onChange={() => handleToggleLayer('weatherRadar')}
                  className="rounded border-slate-400 text-slate-900 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                />
              </label>
              <label className={`flex items-center justify-between ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'} cursor-pointer select-none`}>
                <span className="flex items-center gap-1.5">
                  <span className="text-amber-500 text-xs">⚠️</span> {at.navHazardsSafetyTitle || 'Incidents'}
                </span>
                <input
                  type="checkbox"
                  checked={layers.incidents}
                  onChange={() => handleToggleLayer('incidents')}
                  className="rounded border-slate-400 text-slate-900 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                />
              </label>
              <label className={`flex items-center justify-between ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'} cursor-pointer select-none`}>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-500 text-xs">🚛</span> {at.navFleetTracking || 'Fleet Tracking'}
                </span>
                <input
                  type="checkbox"
                  checked={layers.vehicles}
                  onChange={() => handleToggleLayer('vehicles')}
                  className="rounded border-slate-400 text-slate-900 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                />
              </label>
              <label className={`flex items-center justify-between ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'} cursor-pointer select-none`}>
                <span className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-xs">↗</span> {at.incidentsColStatus || 'Road Status'}
                </span>
                <input
                  type="checkbox"
                  checked={layers.roadStatus}
                  onChange={() => handleToggleLayer('roadStatus')}
                  className="rounded border-slate-400 text-slate-900 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                />
              </label>
            </div>
          )}
        </div>

        {/* Bottom-Right Collapsible Route Status Legend */}
        <div className="absolute bottom-3 right-14 z-10 pointer-events-auto">
          {!isLegendOpen ? (
            <button
              type="button"
              onClick={() => setIsLegendOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold shadow-lg backdrop-blur-md transition cursor-pointer ${
                theme === 'dark'
                  ? 'bg-black/90 border-[#262626] text-neutral-300 hover:text-white hover:bg-neutral-900'
                  : 'bg-white/95 border-slate-300 text-slate-800 hover:text-black hover:bg-slate-50'
              }`}
              title="Show Route Status Legend"
            >
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              </span>
              <span>Route Legend</span>
              <span className="text-[9px]">▲</span>
            </button>
          ) : (
            <div className={`${surfaceBg} backdrop-blur-md border ${cardBorder} rounded-xl p-2.5 shadow-2xl text-xs min-w-[175px]`}>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1.5 pb-1 border-b border-neutral-800">
                <span className={textMuted}>ROUTE STATUS LEGEND</span>
                <button
                  type="button"
                  onClick={() => setIsLegendOpen(false)}
                  title="Collapse Legend"
                  className={`${textMuted} hover:text-white text-xs px-1 cursor-pointer`}
                >
                  −
                </button>
              </div>
              <div className={`flex flex-col gap-1 text-[11px] ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" /> {at.mapLegendOpen || 'Open / Clear'}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" /> {at.mapLegendPartial || 'Partial Disruption'}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" /> {at.mapLegendBlocked || 'Blocked / Closed'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Role-Specific Quick-Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
        {isPublic ? (
          <>
            {/* Public Card 1: Verified Incidents */}
            <div
              onClick={() => onNavigateTab('incidents')}
              className={`${surfaceBg} border ${cardBorder} hover:border-neutral-500 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition group shadow-sm`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${
                  theme === 'dark' ? 'bg-rose-950/60 border-rose-800/60 text-rose-400' : 'bg-rose-100 border-rose-200 text-rose-700'
                } border flex items-center justify-center shrink-0`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-bold ${textPrimary}`}>
                    {visibleIncidents.length} {at.publicCardVerifiedHazards || 'Verified Road Hazards'}
                  </div>
                  <div className={`text-[11px] ${textMuted}`}>
                    {at.publicCardHazardsSub || 'Read-only corridor safety bulletins'}
                  </div>
                </div>
              </div>
              <button className={`text-xs font-semibold ${
                theme === 'dark' ? 'text-neutral-300 group-hover:text-white' : 'text-slate-800 group-hover:text-black'
              } flex items-center gap-1`}>
                <span>{at.publicCardViewBulletins || 'View Bulletins'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Public Card 2: Weather & Rain Radar */}
            <div
              onClick={() => onNavigateTab('weather')}
              className={`${surfaceBg} border ${cardBorder} hover:border-neutral-500 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition group shadow-sm`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${
                  theme === 'dark' ? 'bg-blue-950/60 border-blue-800/60 text-blue-400' : 'bg-blue-100 border-blue-200 text-blue-700'
                } border flex items-center justify-center shrink-0`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-bold ${textPrimary}`}>
                    {at.publicCardWeatherWarnings || 'Weather & Rain Warnings'}
                  </div>
                  <div className={`text-[11px] ${textMuted}`}>
                    {at.publicCardWeatherSub || 'Shillong, Silchar & Guwahati'}
                  </div>
                </div>
              </div>
              <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-500 flex items-center gap-1">
                <span>{at.publicCardCheckRadar || 'Check Radar'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Public Card 3: Report Incident */}
            <div
              onClick={() => onNavigateTab('fieldReporting')}
              className={`${surfaceBg} border ${cardBorder} hover:border-neutral-500 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition group shadow-sm`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${
                  theme === 'dark' ? 'bg-amber-950/60 border-amber-800/60 text-amber-400' : 'bg-amber-100 border-amber-200 text-amber-700'
                } border flex items-center justify-center shrink-0`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-bold ${textPrimary}`}>
                    {at.publicCardReportObstruction || 'Report Road Obstruction'}
                  </div>
                  <div className={`text-[11px] ${textMuted}`}>
                    {at.publicCardReportSub || 'Submit photo to disaster authority queue'}
                  </div>
                </div>
              </div>
              <button className={`text-xs font-semibold ${
                theme === 'dark' ? 'text-amber-400 group-hover:text-amber-300' : 'text-amber-700 group-hover:text-amber-900'
              } flex items-center gap-1`}>
                <span>{at.publicCardReportHazard || 'Report Hazard'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        ) : isAuthority ? (
          <>
            {/* Authority Card 1: Verification Queue */}
            <div
              onClick={() => onNavigateTab('verificationQueue')}
              className={`${surfaceBg} border ${cardBorder} hover:border-neutral-500 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition group shadow-sm`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${
                  theme === 'dark' ? 'bg-amber-950/60 border-amber-800/60 text-amber-400' : 'bg-amber-100 border-amber-200 text-amber-700'
                } border flex items-center justify-center shrink-0`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-bold ${textPrimary}`}>
                    {at.authorityCardQueueTitle || 'Incident Verification Queue'}
                  </div>
                  <div className={`text-[11px] ${textMuted}`}>
                    {at.authorityCardQueueSub || 'Review & approve citizen hazard reports'}
                  </div>
                </div>
              </div>
              <button className="text-xs font-semibold text-amber-500 flex items-center gap-1">
                <span>{at.authorityCardOpenQueue || 'Open Queue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Authority Card 2: Operations Dashboard */}
            <div
              onClick={() => onNavigateTab('dashboard')}
              className={`${surfaceBg} border ${cardBorder} hover:border-neutral-500 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition group shadow-sm`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${
                  theme === 'dark' ? 'bg-rose-950/60 border-rose-800/60 text-rose-400' : 'bg-rose-100 border-rose-200 text-rose-700'
                } border flex items-center justify-center shrink-0`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-bold ${textPrimary}`}>
                    {at.authorityCardCorridorHealth || 'Corridor Health & Saturation'}
                  </div>
                  <div className={`text-[11px] ${textMuted}`}>
                    {at.authorityCardCorridorSub || 'District slope stability & roadblocks'}
                  </div>
                </div>
              </div>
              <button className={`text-xs font-semibold ${
                theme === 'dark' ? 'text-neutral-300 group-hover:text-white' : 'text-slate-800 group-hover:text-black'
              } flex items-center gap-1`}>
                <span>{at.authorityCardDashboard || 'Dashboard'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Authority Card 3: Weather Radar */}
            <div
              onClick={() => onNavigateTab('weather')}
              className={`${surfaceBg} border ${cardBorder} hover:border-neutral-500 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition group shadow-sm`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${
                  theme === 'dark' ? 'bg-blue-950/60 border-blue-800/60 text-blue-400' : 'bg-blue-100 border-blue-200 text-blue-700'
                } border flex items-center justify-center shrink-0`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-bold ${textPrimary}`}>
                    {at.authorityCardRainfallRadar || 'Rainfall & Weather Radar'}
                  </div>
                  <div className={`text-[11px] ${textMuted}`}>
                    {at.authorityCardRadarSub || 'Regional precipitation telemetry'}
                  </div>
                </div>
              </div>
              <button className="text-xs font-semibold text-blue-500 flex items-center gap-1">
                <span>{at.authorityCardViewRadar || 'View Radar'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Logistics Card 1: Active Road Hazards */}
            <div
              onClick={() => onNavigateTab('incidents')}
              className={`${surfaceBg} border ${cardBorder} hover:border-neutral-500 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition group shadow-sm`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${
                  theme === 'dark' ? 'bg-rose-950/60 border-rose-800/60 text-rose-400' : 'bg-rose-100 border-rose-200 text-rose-700'
                } border flex items-center justify-center shrink-0`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-bold ${textPrimary}`}>
                    {incidents.length} {at.mapCardActiveHazards || 'Active Road Hazards'}
                  </div>
                  <div className={`text-[11px] ${textMuted}`}>
                    {at.mapCardHazardsSub || 'Sonapur landslide & lowland flood'}
                  </div>
                </div>
              </div>
              <button className={`text-xs font-semibold ${
                theme === 'dark' ? 'text-neutral-300 group-hover:text-white' : 'text-slate-800 group-hover:text-black'
              } flex items-center gap-1`}>
                <span>{at.mapCardViewHazards || 'View Hazards'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Logistics Card 2: Active Supply Trucks */}
            <div
              onClick={() => onNavigateTab('vehicles')}
              className={`${surfaceBg} border ${cardBorder} hover:border-neutral-500 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition group shadow-sm`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${
                  theme === 'dark' ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-400' : 'bg-emerald-100 border-emerald-200 text-emerald-700'
                } border flex items-center justify-center shrink-0`}>
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-bold ${textPrimary}`}>
                    {vehicles.length} {at.mapCardActiveTrucks || 'Active Supply Trucks'}
                  </div>
                  <div className={`text-[11px] ${textMuted}`}>
                    {at.mapCardTrucksSub || 'All units connected via GPS'}
                  </div>
                </div>
              </div>
              <button className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500 flex items-center gap-1">
                <span>{at.mapCardTrackFleet || 'Track Fleet'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Logistics Card 3: Calculate Safe Detour */}
            <div
              onClick={() => onNavigateTab('routes')}
              className={`${surfaceBg} border ${cardBorder} hover:border-neutral-500 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition group shadow-sm`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${
                  theme === 'dark' ? 'bg-white/10 border-white/20 text-neutral-200' : 'bg-slate-100 border-slate-300 text-slate-800'
                } border flex items-center justify-center shrink-0`}>
                  <GitFork className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-bold ${textPrimary}`}>
                    {at.mapCardCalcDetour || 'Calculate Safe Detour'}
                  </div>
                  <div className={`text-[11px] ${textMuted}`}>
                    {at.mapCardDetourSub || 'Bypass active blockages & flood zones'}
                  </div>
                </div>
              </div>
              <button className={`text-xs font-semibold ${
                theme === 'dark' ? 'text-neutral-300 group-hover:text-white' : 'text-slate-800 group-hover:text-black'
              } flex items-center gap-1`}>
                <span>{at.mapCardPlanRoute || 'Plan Route'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
