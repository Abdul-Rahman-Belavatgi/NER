import React, { useState } from 'react';
import {
  ShieldCheck,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  Send,
  X,
  Check
} from 'lucide-react';
import { ROUTE_OPTIONS } from '../data/initialData';
import { Vehicle, Incident } from '../types';
import { LeafletMap } from './LeafletMap';
import { useLanguage } from '../context/LanguageContext';

interface RoutePlanningViewProps {
  vehicles: Vehicle[];
  incidents: Incident[];
  theme?: 'dark' | 'light';
}

export const RoutePlanningView: React.FC<RoutePlanningViewProps> = ({
  vehicles,
  incidents,
  theme = 'dark',
}) => {
  const { at } = useLanguage();
  const [selectedRouteId, setSelectedRouteId] = useState<'routeB' | 'routeA'>('routeB');
  const [selectedVehiclePlate, setSelectedVehiclePlate] = useState('MH-12-AB-1234');
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [dispatchToast, setDispatchToast] = useState<string | null>(null);

  const cardBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const surfaceBg = theme === 'dark' ? 'bg-black' : 'bg-white shadow-sm';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-neutral-300' : 'text-slate-700';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-600';
  const innerBg = theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-50 border-slate-200';

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      setShowToast(true);
    }, 700);
  };

  const handleDispatch = () => {
    const veh = vehicles.find((v) => v.plate === selectedVehiclePlate);
    const driverName = veh ? veh.driverName : 'Assigned Driver';
    const routeName = selectedRouteId === 'routeB' ? at.routeSaferBypass : at.routeDirectHighway;
    setDispatchToast(
      `Route confirmed and dispatched to ${selectedVehiclePlate} (${driverName}) via ${routeName}.`
    );
    setTimeout(() => {
      setDispatchToast(null);
    }, 4500);
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Top Banner: Optimal Route Recommendation */}
      <div className={`${surfaceBg} border ${cardBorder} rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm`}>
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-lg ${
            theme === 'dark' ? 'bg-emerald-950/50 border-emerald-800/60 text-emerald-400' : 'bg-emerald-100 border-emerald-200 text-emerald-700'
          } border flex items-center justify-center shrink-0 mt-0.5`}>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-sm font-bold ${textPrimary} flex items-center gap-2`}>
              <span>{at.routeOptimalTitle}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {at.routeBVerified}
              </span>
            </div>
            <p className={`text-xs ${textSecondary} mt-0.5 leading-relaxed`}>
              Route B is recommended to avoid active rockfalls and flash flood zones on NH-6 Sonapur Tunnel.
            </p>
          </div>
        </div>

        <button
          onClick={handleRecalculate}
          disabled={isRecalculating}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition shrink-0 ${
            theme === 'dark'
              ? 'bg-white hover:bg-neutral-200 text-black'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRecalculating ? 'animate-spin' : ''}`} />
          <span>{isRecalculating ? at.routeUpdating : at.routeRecalculate}</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Left Column: Route Cards and Dispatch (6 cols) */}
        <div className="xl:col-span-6 space-y-3">
          {/* Card 1: Route B (Recommended Safer Route) */}
          <div
            onClick={() => setSelectedRouteId('routeB')}
            className={`rounded-xl p-4 border transition cursor-pointer ${
              selectedRouteId === 'routeB'
                ? theme === 'dark'
                  ? 'bg-[#051a0d] border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                  : 'bg-emerald-50/70 border-emerald-600 shadow-sm ring-1 ring-emerald-600/30'
                : `${surfaceBg} border ${cardBorder} hover:border-neutral-500`
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-bold">{at.routeSaferBypass}</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                theme === 'dark'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {at.routeRecommended}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              <div className={`${innerBg} rounded-lg p-2.5 border`}>
                <div className={`text-[10px] uppercase font-semibold ${textMuted}`}>
                  {at.routeTotalDistance}
                </div>
                <div className={`text-base font-bold ${textPrimary} mt-0.5`}>
                  196.4 km
                </div>
              </div>
              <div className={`${innerBg} rounded-lg p-2.5 border`}>
                <div className={`text-[10px] uppercase font-semibold ${textMuted}`}>
                  {at.routeEstTravelTime}
                </div>
                <div className={`text-base font-bold ${textPrimary} mt-0.5`}>
                  4h 15m
                </div>
              </div>
            </div>

            <div className={`text-xs font-semibold ${textPrimary}`}>
              Corridor: NH-6 via Nongpoh 4-Lane Express Bypass
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5 font-medium">
              <span>✓</span>
              <span>Bypasses active Sonapur mudslide and tunnel closures safely.</span>
            </div>

            {/* Advisories */}
            <div className={`mt-3 pt-3 border-t ${cardBorder} space-y-1.5 text-xs`}>
              <div className={`flex items-start justify-between gap-2 ${textSecondary}`}>
                <span className={`${textMuted} shrink-0`}>{at.weatherRiskModerate}</span>
                <span className="text-right">Minor delay expected near River Crossing 4</span>
              </div>
              <div className={`flex items-start justify-between gap-2 ${textSecondary}`}>
                <span className={`${textMuted} shrink-0`}>{at.dashWeatherRadar}</span>
                <span className="text-right">Steady showers expected (22mm rain)</span>
              </div>
              <div className="flex items-start justify-between gap-2 text-emerald-600 dark:text-emerald-400">
                <span className={`${textMuted} shrink-0`}>{at.fieldPassageStatusLabel}</span>
                <span className="text-right font-semibold">Open and patrolled by state highway teams</span>
              </div>
            </div>
          </div>

          {/* Card 2: Route A (Direct Route - Blocked / High Risk) */}
          <div
            onClick={() => setSelectedRouteId('routeA')}
            className={`rounded-xl p-4 border transition cursor-pointer ${
              selectedRouteId === 'routeA'
                ? theme === 'dark'
                  ? 'bg-[#1f0a0d] border-rose-500 shadow-md ring-1 ring-rose-500/50'
                  : 'bg-rose-50/70 border-rose-600 shadow-sm ring-1 ring-rose-600/30'
                : `${surfaceBg} border ${cardBorder} hover:border-neutral-500`
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center gap-2 text-xs font-bold ${textPrimary}`}>
                <span className="text-sm font-bold">{at.routeDirectHighway}</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                theme === 'dark'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}>
                {at.routeHighRisk}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              <div className={`${innerBg} rounded-lg p-2.5 border`}>
                <div className={`text-[10px] uppercase font-semibold ${textMuted}`}>
                  {at.routeTotalDistance}
                </div>
                <div className={`text-base font-bold ${textPrimary} mt-0.5`}>
                  182.0 km
                </div>
              </div>
              <div className={`${innerBg} rounded-lg p-2.5 border`}>
                <div className={`text-[10px] uppercase font-semibold ${textMuted}`}>
                  {at.routeEstTravelTime}
                </div>
                <div className={`text-base font-bold ${textPrimary} mt-0.5`}>
                  3h 45m (Delayed)
                </div>
              </div>
            </div>

            <div className={`text-xs font-semibold ${textPrimary}`}>
              Corridor: NH-6 via Old Umiam Alignment
            </div>
            <div className="text-xs text-rose-500 mt-1 flex items-center gap-1.5 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>Severe delays and active rockfall warnings near Sonapur Tunnel.</span>
            </div>

            {/* Advisories */}
            <div className={`mt-3 pt-3 border-t ${cardBorder} space-y-1.5 text-xs`}>
              <div className="flex items-start justify-between gap-2 text-rose-500">
                <span className={`${textMuted} shrink-0`}>{at.dashBlockedLabel}</span>
                <span className="text-right font-semibold">Total closure at Sonapur Tunnel landslide zone</span>
              </div>
              <div className="flex items-start justify-between gap-2 text-rose-500">
                <span className={`${textMuted} shrink-0`}>{at.weatherSlopeTitle}</span>
                <span className="text-right font-medium">Restricted single-lane flow near Umiam Pass</span>
              </div>
            </div>
          </div>

          {/* Dispatch Section (bottom left) */}
          <div className={`${surfaceBg} border ${cardBorder} rounded-xl p-4 space-y-3`}>
            <div className="flex items-center justify-between text-xs">
              <span className={`font-semibold ${textMuted}`}>{at.routeSelectedRoute}</span>
              <span className={`font-bold ${selectedRouteId === 'routeB' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {selectedRouteId === 'routeB' ? at.routeSaferBypass : at.routeDirectHighway}
              </span>
            </div>

            <div>
              <label className={`block text-xs font-semibold ${textSecondary} mb-1`}>
                {at.routeAssignVehicle}
              </label>
              <select
                value={selectedVehiclePlate}
                onChange={(e) => setSelectedVehiclePlate(e.target.value)}
                className={`w-full ${innerBg} border rounded-lg px-3 py-2 text-xs ${textPrimary} focus:outline-none focus:border-neutral-400 cursor-pointer`}
              >
                {vehicles.map((veh) => (
                  <option key={veh.id} value={veh.plate}>
                    {veh.plate} ({veh.modelType}) — Driver: {veh.driverName}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleDispatch}
              className={`w-full font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] ${
                theme === 'dark'
                  ? 'bg-white hover:bg-neutral-200 text-black'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{at.routeConfirmSend}</span>
            </button>

            {dispatchToast && (
              <div className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
                theme === 'dark'
                  ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300'
                  : 'bg-emerald-100 border-emerald-300 text-emerald-900'
              }`}>
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium">{dispatchToast}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pathing & Elevation Visualization (6 cols) */}
        <div className="xl:col-span-6 relative">
          <div className={`${surfaceBg} border ${cardBorder} rounded-2xl p-4 shadow-xl space-y-3`}>
            <div className="flex items-center justify-between text-xs pb-1 border-b border-inherit">
              <div className={`flex items-center gap-2 font-bold ${textPrimary}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{at.routeComparisonTitle}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-rose-500">
                  <span className="w-3 h-1 bg-rose-500 rounded"></span> {at.routeDirectHighway}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="w-3 h-1 bg-emerald-500 rounded"></span> {at.routeSaferBypass}
                </span>
              </div>
            </div>

            <LeafletMap
              incidents={incidents}
              vehicles={vehicles}
              showRouteAB={true}
              selectedRouteId={selectedRouteId}
              showActiveFilters={false}
              showLegend={false}
              theme={theme}
              className="w-full h-[540px]"
            />
          </div>

          {/* Floating Toast */}
          {showToast && (
            <div className={`absolute bottom-4 right-4 z-30 ${surfaceBg} border ${cardBorder} rounded-xl p-3.5 shadow-2xl max-w-sm flex items-start gap-3`}>
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-bold ${textPrimary}`}>
                  {at.routeAnalysisUpdated}
                </div>
                <div className={`text-xs ${textMuted} mt-0.5 leading-relaxed`}>
                  Route B confirmed as clear bypass route around NH-6 closures.
                </div>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className={`${textMuted} hover:${textPrimary} text-sm`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
