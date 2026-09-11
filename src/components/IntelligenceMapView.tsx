import React, { useState } from 'react';
import { AlertTriangle, Truck, GitFork, ArrowRight, Filter, ShieldCheck, MapPin } from 'lucide-react';
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
      {/* Tidy Horizontal Filter Toolbar above the map */}
      <div className={`p-2.5 rounded-xl border ${cardBorder} ${surfaceBg} flex flex-wrap items-center justify-between gap-3 text-xs shrink-0`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-semibold ${textPrimary} flex items-center gap-1.5`}>
            <Filter className="w-3.5 h-3.5 text-neutral-400" />
            {at.mapFilter || 'Filter:'}
          </span>
          <select
            value={activeFilters.roadStatus || 'All'}
            onChange={(e) => setActiveFilters((prev) => ({ ...prev, roadStatus: e.target.value === 'All' ? undefined : e.target.value }))}
            className={`px-2.5 py-1 rounded-md border text-xs font-medium cursor-pointer transition ${
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
          <select
            value={activeFilters.district || 'All'}
            onChange={(e) => setActiveFilters((prev) => ({ ...prev, district: e.target.value === 'All' ? undefined : e.target.value }))}
            className={`px-2.5 py-1 rounded-md border text-xs font-medium cursor-pointer transition ${
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

          {/* Fleet Tracking Filter - explicitly accessible for ALL users including public traveler/driver */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-neutral-700/60">
            <button
              type="button"
              onClick={() => handleToggleLayer('vehicles')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold transition cursor-pointer ${
                layers.vehicles
                  ? theme === 'dark'
                    ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300 shadow-sm'
                    : 'bg-emerald-100 border-emerald-300 text-emerald-800 shadow-sm'
                  : theme === 'dark'
                    ? 'bg-[#0a0a0a] border-[#262626] text-neutral-400 hover:text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-500 hover:text-slate-900'
              }`}
              title={layers.vehicles ? 'Click to hide fleet tracking on map' : 'Click to show fleet tracking on map'}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{at.navFleetTracking || 'Fleet Tracking'}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${layers.vehicles ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'}`} />
            </button>

            {layers.vehicles && (
              <select
                value={activeFilters.vehicleStatus || 'All'}
                onChange={(e) => setActiveFilters((prev) => ({ ...prev, vehicleStatus: e.target.value === 'All' ? undefined : e.target.value }))}
                className={`px-2.5 py-1 rounded-md border text-xs font-medium cursor-pointer transition ${
                  theme === 'dark'
                    ? 'bg-[#0a0a0a] border-[#262626] text-white hover:border-neutral-500'
                    : 'bg-white border-slate-300 text-slate-900 hover:border-slate-400'
                }`}
                title="Filter Fleet Vehicles by Status"
              >
                <option value="All">{at.filterAllVehicles || 'Fleet: All'}</option>
                <option value="MOVING">{at.statusMoving || 'Fleet: Moving'}</option>
                <option value="DELAYED">{at.statusDelayedTag || 'Fleet: Delayed'}</option>
                <option value="IDLE">{at.statusIdle || 'Fleet: Idle / Parked'}</option>
              </select>
            )}
          </div>

          {(activeFilters.roadStatus || activeFilters.district || activeFilters.vehicleStatus || !layers.vehicles) && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-rose-500 hover:underline font-semibold ml-1.5 cursor-pointer"
            >
              {at.mapReset || 'Reset'}
            </button>
          )}
        </div>

        {/* Docked Highway Status Legend */}
        <div className={`hidden sm:flex items-center gap-3 text-[11px] ${textSecondary}`}>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> {at.mapLegendOpen || 'Open / Clear'}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> {at.mapLegendPartial || 'Partial Disruption'}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> {at.mapLegendBlocked || 'Blocked'}
          </span>
        </div>
      </div>

      {/* Full Map Canvas Container */}
      <div className={`relative flex-1 w-full rounded-2xl overflow-hidden border ${cardBorder} ${
        theme === 'dark' ? 'bg-black' : 'bg-slate-100'
      } shadow-xl`}>
        <LeafletMap
          incidents={filteredIncidents}
          vehicles={mapVehicles}
          showActiveFilters={false}
          showLegend={false}
          layers={layers}
          onToggleLayer={handleToggleLayer}
          onSelectIncident={onSelectIncident}
          onSelectVehicle={onSelectVehicle}
          theme={theme}
          className="w-full h-full min-h-[500px]"
        />
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
