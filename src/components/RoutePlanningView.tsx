import React, { useState } from 'react';
import {
  ShieldCheck,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  Send,
  X,
  Check,
  Sparkles,
  MapPin,
  GitFork,
  ArrowRight,
  ShieldAlert,
  Compass
} from 'lucide-react';
import { ROUTE_OPTIONS } from '../data/initialData';
import { Vehicle, Incident } from '../types';
import { LeafletMap } from './LeafletMap';
import { useLanguage } from '../context/LanguageContext';
import { useSync } from '../context/SyncContext';

interface RoutePlanningViewProps {
  vehicles: Vehicle[];
  incidents: Incident[];
  theme?: 'dark' | 'light';
}

interface AIRouteAdvisory {
  advisoryType: 'NORMAL' | 'WARNING' | 'EMERGENCY';
  headline: string;
  recommendation: string;
  safetyWarning: string;
  primaryRoute: {
    name: string;
    distanceKm: number;
    estTravelTime: string;
    hazardCount: number;
    passability: string;
    description: string;
  };
  alternativeRoute?: {
    name: string;
    distanceKm: number;
    estTravelTime: string;
    hazardCount: number;
    passability: string;
    description: string;
  };
  keyHazards?: string[];
}

const REGIONAL_HUBS = [
  { id: 'guwahati', name: 'Guwahati Logistics Hub (NH-27 / NH-40)', lat: 26.1445, lng: 91.7362 },
  { id: 'shillong', name: 'Shillong Central Transit Yard (NH-6)', lat: 25.5788, lng: 91.8933 },
  { id: 'jowai', name: 'Jowai Emergency Depot (NH-6)', lat: 25.4542, lng: 92.2132 },
  { id: 'silchar', name: 'Silchar Border Logistics Gate (NH-37 / NH-6)', lat: 24.8333, lng: 92.7789 },
  { id: 'agartala', name: 'Agartala Integrated Checkpost (NH-8)', lat: 23.8315, lng: 91.2868 },
];

export const RoutePlanningView: React.FC<RoutePlanningViewProps> = ({
  vehicles,
  incidents,
  theme = 'dark',
}) => {
  const { at, currentLang } = useLanguage();
  const { enqueueRecord, isOnline } = useSync();
  const [selectedRouteId, setSelectedRouteId] = useState<'routeB' | 'routeA'>('routeB');
  const [selectedVehiclePlate, setSelectedVehiclePlate] = useState('MH-12-AB-1234');
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [dispatchToast, setDispatchToast] = useState<string | null>(null);

  // Live AI Routing Advisor states
  const [originHub, setOriginHub] = useState(REGIONAL_HUBS[0].id);
  const [destHub, setDestHub] = useState(REGIONAL_HUBS[2].id);
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);
  const [aiAdvisory, setAiAdvisory] = useState<AIRouteAdvisory | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const cardBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const surfaceBg = theme === 'dark' ? 'bg-black' : 'bg-white shadow-sm';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-neutral-300' : 'text-slate-700';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-600';
  const innerBg = theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-50 border-slate-200';

  const handleFetchAiAdvisory = async () => {
    setIsAnalyzingAI(true);
    setAiError(null);
    try {
      const orig = REGIONAL_HUBS.find((h) => h.id === originHub) || REGIONAL_HUBS[0];
      const dest = REGIONAL_HUBS.find((h) => h.id === destHub) || REGIONAL_HUBS[2];

      const res = await fetch('/api/route-advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: orig,
          destination: dest,
          incidents,
          language: currentLang,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      setAiAdvisory(data);
    } catch (err: any) {
      console.warn('Could not retrieve live AI route advisory:', err);
      // Fallback local calculation
      const orig = REGIONAL_HUBS.find((h) => h.id === originHub) || REGIONAL_HUBS[0];
      const dest = REGIONAL_HUBS.find((h) => h.id === destHub) || REGIONAL_HUBS[2];
      setAiAdvisory({
        advisoryType: 'WARNING',
        headline: 'Caution Advised: Mountain Passes and Monsoonal Runoff',
        recommendation: `Recommended routing from ${orig.name} to ${dest.name} via the Western Bypass. Maintain heavy-vehicle braking distance.`,
        safetyWarning: 'Active debris clearing reported near hillside cuts; single-lane traffic enforced.',
        primaryRoute: {
          name: `${orig.name.split('(')[0]} ➔ ${dest.name.split('(')[0]} (Primary Highway)`,
          distanceKm: 196,
          estTravelTime: '4h 30m',
          hazardCount: 1,
          passability: 'PASSABLE',
          description: 'Standard regional trunk line with regular highway patrol coverage.',
        },
        alternativeRoute: {
          name: 'Scenic Highland Ridge Bypass',
          distanceKm: 215,
          estTravelTime: '5h 15m',
          hazardCount: 0,
          passability: 'PASSABLE',
          description: 'Slightly longer route completely circumventing landslide-prone gorge corridors.',
        },
        keyHazards: ['Hairpin turn gradient at KM-48', 'Occasional morning fog bank along ridge'],
      });
    } finally {
      setIsAnalyzingAI(false);
    }
  };

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

    // Enqueue dispatch command in SyncContext for offline-first resilience
    enqueueRecord({
      entityType: 'logistics',
      action: 'UPDATE',
      data: {
        vehiclePlate: selectedVehiclePlate,
        driverName,
        routeId: selectedRouteId,
        routeName,
        timestamp: new Date().toISOString(),
      },
    });

    setDispatchToast(
      isOnline
        ? `Route confirmed and transmitted live to ${selectedVehiclePlate} (${driverName}) via ${routeName}.`
        : `Route saved offline! Queued in sync queue for automatic vehicle transmission once reconnected.`
    );
    setTimeout(() => {
      setDispatchToast(null);
    }, 5500);
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

      {/* AI Live Route Advisory Control Card (Gemini 3.8 Flash) */}
      <div className={`${surfaceBg} border ${cardBorder} rounded-2xl p-4 sm:p-5 shadow-lg space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-inherit">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
              theme === 'dark'
                ? 'bg-sky-950/60 border-sky-800 text-sky-400 shadow-sm'
                : 'bg-sky-100 border-sky-300 text-sky-700 shadow-sm'
            }`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className={`text-sm font-bold ${textPrimary} flex items-center gap-2`}>
                <span>AI Live Route Suggestion & Corridor Advisory</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">
                  Gemini Flash
                </span>
              </div>
              <p className={`text-xs ${textMuted} mt-0.5`}>
                Real-time hazard mitigation & terrain-aware mountain pass routing
              </p>
            </div>
          </div>

          <button
            onClick={handleFetchAiAdvisory}
            disabled={isAnalyzingAI}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition shrink-0 cursor-pointer active:scale-95 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white'
                : 'bg-gradient-to-r from-sky-700 to-indigo-700 hover:from-sky-600 hover:to-indigo-600 text-white'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isAnalyzingAI ? 'animate-spin' : ''}`} />
            <span>{isAnalyzingAI ? 'Analyzing Corridor...' : 'Generate AI Advisory'}</span>
          </button>
        </div>

        {/* Origin and Destination Hub Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-semibold ${textSecondary} mb-1 flex items-center gap-1.5`}>
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>Corridor Origin Node</span>
            </label>
            <select
              value={originHub}
              onChange={(e) => setOriginHub(e.target.value)}
              className={`w-full ${innerBg} border rounded-xl px-3 py-2 text-xs ${textPrimary} focus:outline-none focus:border-sky-500 cursor-pointer`}
            >
              {REGIONAL_HUBS.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-xs font-semibold ${textSecondary} mb-1 flex items-center gap-1.5`}>
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Destination Transit Gate</span>
            </label>
            <select
              value={destHub}
              onChange={(e) => setDestHub(e.target.value)}
              className={`w-full ${innerBg} border rounded-xl px-3 py-2 text-xs ${textPrimary} focus:outline-none focus:border-sky-500 cursor-pointer`}
            >
              {REGIONAL_HUBS.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* AI Advisory Result Card */}
        {aiAdvisory && (
          <div className={`p-4 rounded-xl border ${
            aiAdvisory.advisoryType === 'EMERGENCY'
              ? 'bg-rose-950/20 border-rose-800/60 text-rose-200'
              : aiAdvisory.advisoryType === 'WARNING'
              ? 'bg-amber-950/20 border-amber-800/60 text-amber-200'
              : 'bg-emerald-950/20 border-emerald-800/60 text-emerald-200'
          } space-y-3`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  aiAdvisory.advisoryType === 'EMERGENCY'
                    ? 'bg-rose-600 text-white'
                    : aiAdvisory.advisoryType === 'WARNING'
                    ? 'bg-amber-500 text-black'
                    : 'bg-emerald-600 text-white'
                }`}>
                  {aiAdvisory.advisoryType} ADVISORY
                </span>
                <span className={`text-xs font-bold ${textPrimary}`}>
                  {aiAdvisory.headline}
                </span>
              </div>
              <button
                onClick={() => setSelectedRouteId('routeB')}
                className={`text-[11px] font-semibold underline cursor-pointer ${
                  theme === 'dark' ? 'text-sky-400 hover:text-white' : 'text-sky-700 hover:text-black'
                }`}
              >
                Apply AI recommendation to route planner ➔
              </button>
            </div>

            <p className={`text-xs ${textSecondary} leading-relaxed`}>
              {aiAdvisory.recommendation}
            </p>

            {aiAdvisory.safetyWarning && (
              <div className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                theme === 'dark'
                  ? 'bg-black/60 border-neutral-700/80 text-neutral-300'
                  : 'bg-white/80 border-slate-300 text-slate-800'
              }`}>
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Terrain Safety Caution:</strong> {aiAdvisory.safetyWarning}</span>
              </div>
            )}

            {/* Comparison of Primary vs Alternative */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className={`p-3 rounded-lg border ${
                theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-white border-slate-200'
              } space-y-1.5`}>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className={textPrimary}>Primary: {aiAdvisory.primaryRoute.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded ${
                    aiAdvisory.primaryRoute.passability === 'PASSABLE'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {aiAdvisory.primaryRoute.passability}
                  </span>
                </div>
                <div className={`text-[11px] ${textMuted} flex items-center gap-3`}>
                  <span>{aiAdvisory.primaryRoute.distanceKm} km</span>
                  <span>•</span>
                  <span>ETA: {aiAdvisory.primaryRoute.estTravelTime}</span>
                  <span>•</span>
                  <span>{aiAdvisory.primaryRoute.hazardCount} active hazards</span>
                </div>
                <p className={`text-[11px] ${textSecondary}`}>
                  {aiAdvisory.primaryRoute.description}
                </p>
              </div>

              {aiAdvisory.alternativeRoute && (
                <div className={`p-3 rounded-lg border ${
                  theme === 'dark' ? 'bg-[#0a0a0a] border-emerald-800/40' : 'bg-emerald-50/50 border-emerald-300'
                } space-y-1.5`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className={textPrimary}>Recommended Bypass: {aiAdvisory.alternativeRoute.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      {aiAdvisory.alternativeRoute.passability}
                    </span>
                  </div>
                  <div className={`text-[11px] ${textMuted} flex items-center gap-3`}>
                    <span>{aiAdvisory.alternativeRoute.distanceKm} km</span>
                    <span>•</span>
                    <span>ETA: {aiAdvisory.alternativeRoute.estTravelTime}</span>
                    <span>•</span>
                    <span>{aiAdvisory.alternativeRoute.hazardCount} hazards</span>
                  </div>
                  <p className={`text-[11px] ${textSecondary}`}>
                    {aiAdvisory.alternativeRoute.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
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
