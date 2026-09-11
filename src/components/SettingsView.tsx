import React, { useState } from 'react';
import {
  Settings,
  User,
  Shield,
  Bell,
  MapPin,
  Save,
  CheckCircle,
  Truck,
  AlertTriangle
} from 'lucide-react';
import { UserProfile, UserRole, isPublicUser, isAuthorityUser, isLogisticsUser } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SettingsViewProps {
  currentUser: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onSwitchRole: (role: UserRole) => void;
  theme?: 'dark' | 'light';
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentUser,
  onUpdateProfile,
  onSwitchRole,
  theme = 'dark',
}) => {
  const { at } = useLanguage();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState('30s');
  const [savedNotice, setSavedNotice] = useState(false);

  const cardBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const surfaceBg = theme === 'dark' ? 'bg-black' : 'bg-white shadow-sm';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-neutral-300' : 'text-slate-700';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-600';
  const innerBg = theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-50 border-slate-200';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, email, phone });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-5 pb-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className={`flex items-center gap-2 ${textPrimary} text-lg font-bold`}>
          <Settings className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`} />
          <h2>{at.settingsTitle}</h2>
        </div>
        <p className={`text-xs ${textMuted} mt-0.5`}>
          {at.settingsSubtitle}
        </p>
      </div>

      {savedNotice && (
        <div className={`p-3 rounded-xl text-xs flex items-center gap-2 shadow-lg ${
          theme === 'dark'
            ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
            : 'bg-emerald-50 border border-emerald-300 text-emerald-800'
        }`}>
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>Profile and operational settings saved successfully.</span>
        </div>
      )}

      {/* Role Profile Info Card */}
      <div className={`${surfaceBg} border ${cardBorder} rounded-2xl p-6 shadow-xl space-y-4`}>
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className={`w-16 h-16 rounded-2xl object-cover ring-2 ${theme === 'dark' ? 'ring-white/30' : 'ring-slate-300'}`}
          />
          <div>
            <div className={`text-base font-bold ${textPrimary} flex items-center gap-2`}>
              <span>{currentUser.name}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                theme === 'dark'
                  ? 'bg-white/10 text-slate-200 border border-white/20'
                  : 'bg-slate-100 text-slate-800 border border-slate-300'
              }`}>
                {isPublicUser(currentUser.role)
                  ? 'Role 1: Public View'
                  : isLogisticsUser(currentUser.role)
                  ? 'Role 3: Logistics Operator'
                  : 'Role 2: Govt Authority'}
              </span>
            </div>
            <div className={`text-xs ${textMuted} mt-1`}>
              {currentUser.roleTitle || (
                isPublicUser(currentUser.role)
                  ? 'General Public & Drivers (Unauthenticated / Public View)'
                  : isLogisticsUser(currentUser.role)
                  ? 'Logistics & Fleet Operator (Transporter / Dispatcher)'
                  : 'Government & Disaster Authority (BRO / SDMA / Police)'
              )}
            </div>
          </div>
        </div>

        {/* Assigned Sectors */}
        <div className={`pt-3 border-t ${cardBorder}`}>
          <div className={`text-xs font-semibold ${textMuted} mb-2`}>
            {at.settingsAssignedSectors}
          </div>
          <div className="flex flex-wrap gap-2">
            {currentUser.assignedSectors.map((sector) => (
              <span
                key={sector}
                className={`px-2.5 py-1 rounded-lg ${innerBg} border text-xs ${textSecondary} flex items-center gap-1.5`}
              >
                <MapPin className={`w-3 h-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`} />
                {sector}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Role Switcher */}
      <div className={`${surfaceBg} border ${cardBorder} rounded-2xl p-5 shadow-xl space-y-3`}>
        <div className={`text-xs font-bold ${textPrimary} uppercase tracking-wider`}>
          {at.settingsSwitchProfile || 'SWITCH USER ROLE / ACCESS LEVEL'}
        </div>
        <p className={`text-xs ${textMuted}`}>
          {at.settingsSwitchDesc || 'Switch role to inspect permissions, visibility filters, and operational tool access across the corridor.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <button
            onClick={() => onSwitchRole('public')}
            className={`p-3.5 rounded-xl border text-left transition ${
              isPublicUser(currentUser.role)
                ? theme === 'dark'
                  ? 'bg-sky-600/20 border-sky-500 text-white shadow-md ring-1 ring-sky-500/50'
                  : 'bg-sky-50 border-sky-500 text-sky-950 shadow-md ring-1 ring-sky-500/40'
                : theme === 'dark'
                ? 'bg-[#0a0a0a] border-[#262626] text-neutral-400 hover:text-white'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-black'
            }`}
          >
            <div className={`flex items-center justify-between text-xs font-bold ${isPublicUser(currentUser.role) ? 'text-sky-400' : ''}`}>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>General Public &amp; Drivers</span>
              </div>
              {isPublicUser(currentUser.role) && <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono">ACTIVE</span>}
            </div>
            <div className={`text-[11px] font-semibold mt-1.5 ${isPublicUser(currentUser.role) ? 'text-sky-300' : textSecondary}`}>
              Role 1: Unauthenticated / Public View
            </div>
            <div className={`text-[10px] mt-1 line-clamp-2 ${textMuted}`}>
              View-only live highway map, active verified incidents, weather alerts &amp; public hazard reporting.
            </div>
          </button>

          <button
            onClick={() => onSwitchRole('authority')}
            className={`p-3.5 rounded-xl border text-left transition ${
              isAuthorityUser(currentUser.role)
                ? theme === 'dark'
                  ? 'bg-purple-600/20 border-purple-500 text-white shadow-md ring-1 ring-purple-500/50'
                  : 'bg-purple-50 border-purple-500 text-purple-950 shadow-md ring-1 ring-purple-500/40'
                : theme === 'dark'
                ? 'bg-[#0a0a0a] border-[#262626] text-neutral-400 hover:text-white'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-black'
            }`}
          >
            <div className={`flex items-center justify-between text-xs font-bold ${isAuthorityUser(currentUser.role) ? 'text-purple-400' : ''}`}>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Capt. Arjun Das</span>
              </div>
              {isAuthorityUser(currentUser.role) && <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">ACTIVE</span>}
            </div>
            <div className={`text-[11px] font-semibold mt-1.5 ${isAuthorityUser(currentUser.role) ? 'text-purple-300' : textSecondary}`}>
              Role 2: Govt &amp; Disaster Authority
            </div>
            <div className={`text-[10px] mt-1 line-clamp-2 ${textMuted}`}>
              BRO / SDMA nodal command, incident verification queue, and official roadblock broadcasting.
            </div>
          </button>

          <button
            onClick={() => onSwitchRole('logistics')}
            className={`p-3.5 rounded-xl border text-left transition ${
              isLogisticsUser(currentUser.role)
                ? theme === 'dark'
                  ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md ring-1 ring-emerald-500/50'
                  : 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md ring-1 ring-emerald-500/40'
                : theme === 'dark'
                ? 'bg-[#0a0a0a] border-[#262626] text-neutral-400 hover:text-white'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-black'
            }`}
          >
            <div className={`flex items-center justify-between text-xs font-bold ${isLogisticsUser(currentUser.role) ? 'text-emerald-400' : ''}`}>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>B. Borah</span>
              </div>
              {isLogisticsUser(currentUser.role) && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">ACTIVE</span>}
            </div>
            <div className={`text-[11px] font-semibold mt-1.5 ${isLogisticsUser(currentUser.role) ? 'text-emerald-300' : textSecondary}`}>
              Role 3: Logistics &amp; Fleet Operator
            </div>
            <div className={`text-[10px] mt-1 line-clamp-2 ${textMuted}`}>
              Commercial fleet GPS tracking, dynamic detour routing &amp; cargo consignment tracking.
            </div>
          </button>
        </div>
      </div>

      {/* Profile Edit Form */}
      <form onSubmit={handleSave} className={`${surfaceBg} border ${cardBorder} rounded-2xl p-6 shadow-xl space-y-4`}>
        <div className={`text-xs font-bold ${textPrimary} uppercase tracking-wider`}>
          {at.settingsPersonalPref}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
              {at.settingsFullName}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full ${innerBg} border rounded-xl px-3.5 py-2 text-xs ${textPrimary} focus:outline-none focus:border-slate-500`}
            />
          </div>

          <div>
            <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
              {at.settingsEmail}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full ${innerBg} border rounded-xl px-3.5 py-2 text-xs ${textPrimary} focus:outline-none focus:border-slate-500`}
            />
          </div>

          <div>
            <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
              {at.settingsPhone}
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full ${innerBg} border rounded-xl px-3.5 py-2 text-xs ${textPrimary} focus:outline-none focus:border-slate-500`}
            />
          </div>

          <div>
            <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
              {at.settingsRefreshInterval}
            </label>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(e.target.value)}
              className={`w-full ${innerBg} border rounded-xl px-3.5 py-2 text-xs ${textPrimary} focus:outline-none focus:border-slate-500`}
            >
              <option value="15s">Every 15 Seconds (High Precision)</option>
              <option value="30s">Every 30 Seconds (Default)</option>
              <option value="1m">Every 1 Minute</option>
              <option value="5m">Every 5 Minutes (Low Bandwidth)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className={`flex items-center gap-2 text-xs ${textSecondary} cursor-pointer`}>
            <input
              type="checkbox"
              checked={soundAlerts}
              onChange={(e) => setSoundAlerts(e.target.checked)}
              className="rounded text-blue-600 focus:ring-0 cursor-pointer"
            />
            <span>{at.settingsSoundAlerts}</span>
          </label>

          <button
            type="submit"
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold shadow-md transition self-end sm:self-auto ${
              theme === 'dark'
                ? 'bg-[#f1f3f7] hover:bg-white text-slate-950 shadow-white/5'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{at.settingsSaveChanges}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
