import React, { useState } from 'react';
import {
  Truck,
  PlusCircle,
  Search,
  MapPin,
  Gauge,
  Fuel,
  Phone,
  AlertTriangle,
  GitFork,
  Radio
} from 'lucide-react';
import { Vehicle } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface VehiclesViewProps {
  vehicles: Vehicle[];
  onNavigateTab: (tab: string, context?: any) => void;
  onSelectVehicle: (veh: Vehicle) => void;
  theme?: 'dark' | 'light';
}

export const VehiclesView: React.FC<VehiclesViewProps> = ({
  vehicles,
  onNavigateTab,
  onSelectVehicle,
  theme = 'dark',
}) => {
  const { at } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [pingStatus, setPingStatus] = useState<string | null>(null);

  const cardBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const surfaceBg = theme === 'dark' ? 'bg-black' : 'bg-white shadow-sm';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-neutral-300' : 'text-slate-700';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-600';
  const innerBg = theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-50 border-slate-200';

  const filteredVehicles = vehicles.filter((v) => {
    return (
      v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.modelType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.currentLocation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handlePing = (veh: Vehicle) => {
    setPingStatus(`Pinged unit ${veh.plate}. Latency: 42ms. GPS locked: [${veh.coordinates.join(', ')}]`);
    setTimeout(() => {
      setPingStatus(null);
    }, 4000);
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className={`flex items-center gap-2 ${textPrimary} text-lg font-bold`}>
            <Truck className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`} />
            <h2>{at.vehiclesTitle}</h2>
          </div>
          <p className={`text-xs ${textMuted} mt-0.5`}>
            {at.vehiclesSubtitle}
          </p>
        </div>

        <button
          onClick={() => alert('Add New Vehicle module open.')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition shrink-0 self-start sm:self-auto ${
            theme === 'dark'
              ? 'bg-[#f1f3f7] hover:bg-white text-slate-950 shadow-white/5'
              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>{at.vehiclesAddNew}</span>
        </button>
      </div>

      {pingStatus && (
        <div className={`p-3 rounded-xl text-xs flex items-center gap-2 shadow-lg ${
          theme === 'dark'
            ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
            : 'bg-emerald-100 border border-emerald-300 text-emerald-900'
        }`}>
          <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span>{pingStatus}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className={`${surfaceBg} border ${cardBorder} rounded-xl p-3.5`}>
          <div className={`text-[10px] uppercase font-bold ${textMuted}`}>{at.vehiclesTotalFleet}</div>
          <div className={`text-xl font-extrabold ${textPrimary} mt-1`}>
            {vehicles.length}
          </div>
        </div>
        <div className={`${surfaceBg} border ${cardBorder} rounded-xl p-3.5`}>
          <div className={`text-[10px] uppercase font-bold ${textMuted}`}>{at.vehiclesOnTheRoad}</div>
          <div className={`text-xl font-extrabold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} mt-1`}>
            {vehicles.filter((v) => v.status === 'MOVING').length} {at.statusMoving}
          </div>
        </div>
        <div className={`${surfaceBg} border ${cardBorder} rounded-xl p-3.5`}>
          <div className={`text-[10px] uppercase font-bold ${textMuted}`}>{at.vehiclesDelayedHalted}</div>
          <div className="text-xl font-extrabold text-rose-500 mt-1">
            {vehicles.filter((v) => v.status === 'DELAYED').length} {at.statusDelayedTag}
          </div>
        </div>
        <div className={`${surfaceBg} border ${cardBorder} rounded-xl p-3.5`}>
          <div className={`text-[10px] uppercase font-bold ${textMuted}`}>{at.vehiclesAtDepot}</div>
          <div className="text-xl font-extrabold text-amber-500 mt-1">
            {vehicles.filter((v) => v.status === 'IDLE').length} {at.statusIdle}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={`${surfaceBg} border ${cardBorder} rounded-2xl p-3`}>
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={at.vehiclesSearchPlaceholder}
            className={`w-full ${innerBg} border rounded-xl pl-9 pr-3 py-2 text-xs ${textPrimary} placeholder-slate-400 focus:outline-none focus:border-slate-500`}
          />
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredVehicles.map((veh) => (
          <div
            key={veh.id}
            className={`${surfaceBg} border ${cardBorder} rounded-2xl p-4.5 hover:border-slate-400 transition flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono font-bold text-xs ${textPrimary} ${innerBg} px-2.5 py-1 rounded-lg border`}>
                  {veh.plate}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    veh.status === 'MOVING'
                      ? theme === 'dark'
                        ? 'bg-white/10 text-slate-200 border border-white/15'
                        : 'bg-slate-100 text-slate-800 border border-slate-300'
                      : veh.status === 'DELAYED'
                      ? theme === 'dark'
                        ? 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                      : theme === 'dark'
                      ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  • {veh.status === 'MOVING' ? at.statusMoving : veh.status === 'DELAYED' ? at.statusDelayedTag : at.statusIdle}
                </span>
              </div>

              <div className={`text-sm font-bold ${textPrimary}`}>
                {veh.modelType} • {veh.tonnage}
              </div>
              <div className={`text-xs ${textMuted} mt-0.5`}>
                Route: {veh.currentRoute}
              </div>

              {/* Alert Callout if Delayed */}
              {veh.alertNote && (
                <div className={`mt-2.5 p-2.5 rounded-xl text-xs flex items-start gap-2 border ${
                  theme === 'dark'
                    ? 'bg-rose-950/60 border-rose-900 text-rose-300'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>{veh.alertNote}</span>
                </div>
              )}

              {/* Telematics Bar */}
              <div className={`grid grid-cols-2 gap-2 mt-3 text-xs ${innerBg} rounded-xl p-2.5 border`}>
                <div className={`flex items-center gap-2 ${textSecondary}`}>
                  <Gauge className="w-4 h-4 text-slate-400" />
                  <span>{veh.speedKmh} km/h</span>
                </div>
                <div className={`flex items-center gap-2 ${textSecondary}`}>
                  <Fuel className="w-4 h-4 text-emerald-500" />
                  <span>{veh.fuelPercent}% Fuel</span>
                </div>
                <div className={`col-span-2 ${textMuted} flex items-center gap-1.5 pt-1 border-t ${cardBorder} text-[11px] truncate`}>
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{veh.currentLocation}</span>
                </div>
              </div>

              {/* Driver details */}
              <div className={`mt-3 text-xs ${textMuted} flex items-center justify-between`}>
                <span>Driver: <strong className={textPrimary}>{veh.driverName}</strong></span>
                <span className={textMuted}>{veh.driverPhone}</span>
              </div>
            </div>

            {/* Actions */}
            <div className={`mt-4 pt-3 border-t ${cardBorder} flex items-center gap-2`}>
              {veh.status === 'DELAYED' || veh.alertNote ? (
                <button
                  onClick={() => onNavigateTab('routes')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold shadow-md transition text-center ${
                    theme === 'dark'
                      ? 'bg-[#f1f3f7] hover:bg-white text-slate-950 shadow-white/5'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
                  }`}
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>{at.vehiclesReroute}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onSelectVehicle(veh);
                    onNavigateTab('map');
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition text-center ${
                    theme === 'dark'
                      ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-200 hover:text-white border-[#262626]'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-black border-slate-300'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{at.vehiclesTrackMap}</span>
                </button>
              )}

              <button
                onClick={() => {
                  setPingStatus(`Direct call connected to ${veh.driverName} (${veh.driverPhone})`);
                  setTimeout(() => setPingStatus(null), 4000);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                  theme === 'dark'
                    ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-300 hover:text-white border-[#262626]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-black border-slate-300'
                }`}
                title={`Call ${veh.driverName} (${veh.driverPhone})`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{at.vehiclesCallDriver}</span>
              </button>

              <button
                onClick={() => handlePing(veh)}
                className={`p-2 rounded-xl border transition ${
                  theme === 'dark'
                    ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-300 hover:text-white border-[#262626]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-black border-slate-300'
                }`}
                title="Send Radio Ping / Ping GPS"
              >
                <Radio className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

