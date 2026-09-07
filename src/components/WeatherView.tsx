import React from 'react';
import {
  CloudRain,
  CloudLightning,
  CloudSun,
  Droplets,
  Wind,
  ShieldAlert,
} from 'lucide-react';
import { HubWeather } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface WeatherViewProps {
  weatherHubs: HubWeather[];
  onNavigateTab: (tab: string) => void;
  theme?: 'dark' | 'light';
}

export const WeatherView: React.FC<WeatherViewProps> = ({
  weatherHubs,
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
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className={`p-4 rounded-xl border ${cardBorder} ${surfaceBg}`}>
        <div className={`flex items-center gap-2.5 ${textPrimary} text-lg font-bold`}>
          <CloudRain className="w-5 h-5 text-sky-500" />
          <h2>{at.weatherTitle}</h2>
        </div>
        <p className={`text-xs ${textMuted} mt-1`}>
          {at.weatherSubtitle}
        </p>
      </div>

      {/* 4 Main Weather Hub Cards (Balanced 4-column grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {weatherHubs.map((hub) => {
          const isHighRain = hub.rainProb > 70;
          const isModerate = hub.rainProb >= 40 && hub.rainProb <= 70;

          return (
            <div
              key={hub.city}
              className={`${surfaceBg} border ${cardBorder} rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className={`text-[11px] font-semibold ${textMuted}`}>
                    {hub.hubType || at.weatherStation}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isHighRain
                        ? theme === 'dark'
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                        : isModerate
                        ? theme === 'dark'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                        : theme === 'dark'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    {isHighRain ? at.weatherHighRain : isModerate ? at.weatherModerateRain : at.weatherLowRisk}
                  </span>
                </div>

                <div className="flex items-center justify-between my-2">
                  <div>
                    <div className={`text-2xl font-bold ${textPrimary}`}>
                      {hub.temp}°C
                    </div>
                    <div className={`text-sm font-semibold ${textSecondary} mt-0.5`}>
                      {hub.city}
                    </div>
                  </div>

                  <div className={`w-12 h-12 rounded-xl ${innerBg} border flex items-center justify-center`}>
                    {hub.city.includes('Shillong') ? (
                      <CloudRain className="w-6 h-6 text-sky-500" />
                    ) : hub.city.includes('Silchar') ? (
                      <CloudLightning className="w-6 h-6 text-amber-500" />
                    ) : hub.city.includes('Kohima') ? (
                      <CloudRain className="w-6 h-6 text-indigo-400" />
                    ) : (
                      <CloudSun className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                </div>

                <div className={`text-xs ${textMuted} mt-1 line-clamp-1`}>{hub.condition}</div>
              </div>

              <div className={`grid grid-cols-2 gap-2 mt-4 pt-3 border-t ${innerBg} text-xs ${textSecondary}`}>
                <div className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-sky-500" />
                  <span>{hub.rainProb}% Rain</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{hub.windSpeed}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slope Saturation & Landslide Warning Index */}
      <div className={`${surfaceBg} border ${cardBorder} rounded-xl p-4 shadow-sm`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 pb-2 border-b border-inherit">
          <div className={`flex items-center gap-2 text-sm font-bold ${textPrimary}`}>
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>{at.weatherSlopeTitle}</span>
          </div>
          <span className={`text-xs ${textMuted}`}>{at.weatherLastUpdated}</span>
        </div>

        <div className="space-y-3">
          {[
            { zone: 'East Jaintia Hills (Sonapur Belt)', saturation: 94, risk: at.weatherRiskCritical, advisory: 'Active mudflows and rock displacements across NH-6 Sonapur Tunnel zone.' },
            { zone: 'Ri-Bhoi (Umiam Lake Gradient)', saturation: 78, risk: at.weatherRiskHigh, advisory: 'High gradient runoff with loose gravel on downhill curve.' },
            { zone: 'Kamrup Metro (Guwahati Basin)', saturation: 42, risk: at.weatherRiskLow, advisory: 'Storm channels flowing freely; highway bridges operating without restriction.' },
            { zone: 'Cachar Valley (Silchar Plains)', saturation: 86, risk: at.weatherRiskHigh, advisory: 'Lowland inundation threatening alternative cargo route B.' },
          ].map((item) => (
            <div
              key={item.zone}
              className={`${innerBg} border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
            >
              <div className="space-y-0.5">
                <div className={`text-xs font-bold ${textPrimary}`}>{item.zone}</div>
                <div className={`text-xs ${textMuted}`}>{item.advisory}</div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className={`w-28 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-slate-200'} rounded-full h-2 overflow-hidden`}>
                  <div
                    className={`h-full rounded-full ${
                      item.saturation > 80 ? 'bg-rose-500' : item.saturation > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${item.saturation}%` }}
                  />
                </div>
                <span className={`text-xs font-semibold ${textSecondary} w-10 text-right`}>
                  {item.saturation}%
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.risk === at.weatherRiskCritical || item.risk === 'CRITICAL'
                      ? theme === 'dark'
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                      : item.risk === at.weatherRiskHigh || item.risk === 'HIGH'
                      ? theme === 'dark'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                      : theme === 'dark'
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {item.risk}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
