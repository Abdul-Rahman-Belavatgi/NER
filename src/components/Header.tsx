import React, { useState, useEffect } from 'react';
import {
  Menu,
  Search,
  Sun,
  Moon,
  PlusCircle,
  Bell,
  LayoutDashboard,
  MapPin,
  GitFork,
  AlertTriangle,
  Truck,
  FileText,
  Activity,
  Radio,
  Globe,
  ChevronDown,
  CloudUpload,
  Wifi,
  WifiOff,
  RadioTower,
  Shield,
  Check,
  Settings
} from 'lucide-react';
import { UserProfile, UserRole, isPublicUser, isAuthorityUser, isLogisticsUser } from '../types';
import { LANGUAGES, LanguageCode, TRANSLATIONS } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';
import { useSync } from '../context/SyncContext';
import { SyncQueueModal } from './SyncQueueModal';
import { AlternativeCommModal } from './AlternativeCommModal';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentUser: UserProfile;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenReportModal: () => void;
  unreadAlertsCount: number;
  onOpenAlerts: () => void;
  onToggleSidebar?: () => void;
  onSwitchRole?: (role: UserRole) => void;
  onOpenLogin?: () => void;
  currentLang?: LanguageCode;
  onSelectLang?: (lang: LanguageCode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  theme,
  onToggleTheme,
  onOpenReportModal,
  unreadAlertsCount,
  onOpenAlerts,
  onToggleSidebar,
  onSwitchRole,
  onOpenLogin,
  currentLang: propLang,
  onSelectLang,
}) => {
  const { currentLang: contextLang, setLang, at } = useLanguage();
  const currentLang = propLang || contextLang;
  const [timeStr, setTimeStr] = useState<string>('');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);

  const {
    isOnline,
    toggleSimulateOffline,
    syncQueue,
    isSyncing,
    syncNow,
    pendingCount,
    failedCount,
    isAltCommModalOpen,
    setIsAltCommModalOpen,
  } = useSync();

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as IST time
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute top fast nav buttons based on role
  const getTopTabs = (role: UserRole) => {
    if (isPublicUser(role)) {
      return [
        { id: 'map', label: at.topLiveHighwayMap, icon: MapPin },
        { id: 'incidents', label: at.topActiveIncidents, icon: AlertTriangle },
        { id: 'weather', label: at.topWeatherAlerts, icon: Activity },
      ];
    }
    if (isAuthorityUser(role)) {
      return [
        { id: 'dashboard', label: at.topOperationsDashboard, icon: LayoutDashboard },
        { id: 'map', label: at.topLiveHighwayMap, icon: MapPin },
        { id: 'verificationQueue', label: at.topVerificationQueue, icon: AlertTriangle },
        { id: 'incidents', label: at.topActiveIncidents, icon: FileText },
      ];
    }
    // Logistics Operator
    return [
      { id: 'dashboard', label: at.topFleetDashboard, icon: LayoutDashboard },
      { id: 'map', label: at.topFleetMap, icon: MapPin },
      { id: 'routes', label: at.topRoutePlanning, icon: GitFork },
      { id: 'logistics', label: at.topCargoShipments, icon: Truck },
    ];
  };

  const topTabs = getTopTabs(currentUser.role);

  return (
    <header className={`h-14 shrink-0 border-b ${
      theme === 'dark' 
        ? 'border-[#262626] bg-black/95 text-slate-100' 
        : 'border-slate-200 bg-white text-slate-900 shadow-sm'
    } backdrop-blur-md sticky top-0 z-40 px-3 md:px-4 flex items-center justify-between gap-3 select-none transition-colors duration-200`}>
      {/* Left side: System Code, Ticker, Hamburger & Nav */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className={`p-1.5 rounded-md border ${
            theme === 'dark' 
              ? 'border-[#262626] bg-[#0a0a0a] text-slate-300 hover:text-white hover:border-neutral-500' 
              : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
          } transition shrink-0`}
          title="Toggle Navigation Rail"
        >
          <Menu strokeWidth={2} className="w-4 h-4" />
        </button>

        {/* System Status Indicator: Live Server Connected / Offline Toggle */}
        <button
          type="button"
          onClick={toggleSimulateOffline}
          title={isOnline ? "Click to switch to Server Offline / Local Cache (Simulate Network Drop)" : "Click to switch to Live Server Connected"}
          className={`whitespace-nowrap shrink-0 flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium cursor-pointer transition select-none hover:shadow-sm active:scale-95 ${
            isOnline
              ? theme === 'dark'
                ? 'bg-[#0a0a0a] border-[#262626] text-neutral-200 hover:border-emerald-500/60'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-emerald-500'
              : theme === 'dark'
                ? 'bg-rose-950/40 border-rose-800/70 text-rose-300 hover:border-rose-500'
                : 'bg-rose-50 border-rose-300 text-rose-800 hover:border-rose-400'
          }`}
        >
          {isOnline ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="leading-none whitespace-nowrap font-medium">{at.headerLiveServerConnected || t.liveServerConnected || 'Live Server Connected'}</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span className="leading-none whitespace-nowrap font-medium">{at.headerServerOffline || 'Server Offline / Local Cache'}</span>
            </>
          )}
        </button>

        {/* Sync Queue Visual Status Indicator & Trigger */}
        {(pendingCount > 0 || failedCount > 0) && (
          <button
            type="button"
            onClick={() => setIsQueueModalOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition cursor-pointer ${
              failedCount > 0
                ? 'bg-rose-950/60 border-rose-700 text-rose-300 hover:bg-rose-900/80'
                : isSyncing
                ? 'bg-indigo-950/60 border-indigo-700 text-indigo-300 animate-pulse'
                : theme === 'dark'
                ? 'bg-amber-950/60 border-amber-700 text-amber-300 hover:bg-amber-900/80'
                : 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
            }`}
            title="Open Sync Queue"
          >
            <CloudUpload className="w-3.5 h-3.5 shrink-0" />
            <span>
              {failedCount > 0 ? `${failedCount} Failed` : `${pendingCount} Pending`}
            </span>
          </button>
        )}

        {/* Off-Grid / Alt-Comm Trigger */}
        <button
          type="button"
          onClick={() => setIsAltCommModalOpen(true)}
          className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-medium transition cursor-pointer ${
            theme === 'dark'
              ? 'border-[#262626] bg-[#0a0a0a] text-neutral-300 hover:text-white hover:border-neutral-500'
              : 'border-slate-300 bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
          }`}
          title="Off-Grid Transmission Modes (SMS, HAM/VHF Radio, Satellite, QR)"
        >
          <RadioTower className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[11px] font-mono">Alt-Comm</span>
        </button>

        {/* Live IST Monospace Clock */}
        <div className={`hidden lg:flex items-center gap-2 pl-3 border-l ${
          theme === 'dark' ? 'border-[#262626]' : 'border-slate-200'
        } font-mono text-[11px]`}>
          <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}>IST</span>
          <span className={`font-semibold px-2 py-0.5 rounded border ${
            theme === 'dark'
              ? 'text-white bg-[#0a0a0a] border-[#262626]'
              : 'text-slate-900 bg-slate-100 border-slate-300'
          }`}>
            {timeStr || '12:00:00'}
          </span>
        </div>

        {/* Tactical Segmented Nav Tabs (no numbers beside functions) */}
        <div className={`hidden xl:flex items-center gap-1 ml-2 ${
          theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-100 border-slate-200'
        } p-0.5 rounded-md border`}>
          {topTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition ${
                  isActive
                    ? theme === 'dark'
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'bg-white text-slate-950 font-bold shadow-sm border border-slate-300'
                    : theme === 'dark'
                    ? 'text-neutral-400 hover:text-white hover:bg-[#141414]'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/70'
                }`}
              >
                <Icon strokeWidth={2} className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side: Language Selector, Theme Toggle, Report button, Alerts, Profile */}
      <div className="flex items-center gap-2">
        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLangMenuOpen((prev) => !prev)}
            className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium transition ${
              theme === 'dark'
                ? 'border-[#262626] bg-[#0a0a0a] text-neutral-200 hover:border-neutral-500 hover:text-white'
                : 'border-slate-300 bg-slate-100 text-slate-700 hover:border-slate-400 hover:text-slate-900'
            }`}
            title="Change Language"
          >
            <Globe strokeWidth={2} className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[11px] hidden md:inline">
              {LANGUAGES.find((l) => l.code === currentLang)?.nativeName || 'English'}
            </span>
            <ChevronDown strokeWidth={2} className="w-3 h-3 text-neutral-400" />
          </button>

          {isLangMenuOpen && (
            <div
              className={`absolute right-0 mt-1.5 w-44 rounded-xl border py-1 shadow-2xl z-50 ${
                theme === 'dark' ? 'bg-[#0f0f0f] border-[#262626] text-neutral-200' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLang(lang.code);
                    if (onSelectLang) onSelectLang(lang.code);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition ${
                    currentLang === lang.code
                      ? theme === 'dark'
                        ? 'bg-neutral-800 text-white font-bold'
                        : 'bg-slate-100 text-slate-950 font-bold'
                      : theme === 'dark'
                      ? 'hover:bg-neutral-900 text-neutral-300'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{lang.nativeName}</span>
                  <span className="text-[10px] font-mono text-neutral-500">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className={`p-1.5 rounded-md border ${
            theme === 'dark'
              ? 'border-[#262626] bg-[#0a0a0a] text-amber-400 hover:text-amber-300 hover:border-neutral-500'
              : 'border-slate-300 bg-slate-100 text-slate-800 hover:text-slate-950 hover:bg-slate-200'
          } transition`}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun strokeWidth={2} className="w-3.5 h-3.5" />
          ) : (
            <Moon strokeWidth={2} className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Report Incident Action */}
        <button
          onClick={onOpenReportModal}
          className={`flex items-center justify-center ${
            theme === 'dark'
              ? 'bg-white hover:bg-neutral-200 text-black shadow-sm'
              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
          } px-3 py-1.5 rounded-lg text-xs font-bold transition active:scale-98 cursor-pointer`}
        >
          <span className="tracking-tight whitespace-nowrap">{at.headerReportIncident || t.reportRoadIncident}</span>
        </button>

        {/* Operator Sign In (When in Public View) */}
        {isPublicUser(currentUser.role) && onOpenLogin && (
          <button
            type="button"
            onClick={onOpenLogin}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm cursor-pointer"
            title="Log in with BRO / Police / Transporter credentials"
          >
            <Shield className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden xs:inline whitespace-nowrap">Operator Sign In</span>
            <span className="xs:hidden">Sign In</span>
          </button>
        )}

        {/* Alerts Bell with Badge */}
        <button
          onClick={onOpenAlerts}
          className={`relative p-1.5 rounded-md border ${
            theme === 'dark' 
              ? 'border-[#262626] bg-[#0a0a0a] text-slate-200 hover:text-white hover:border-neutral-500' 
              : 'border-slate-300 bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200'
          } transition`}
          title="Incident Alerts & Feeds"
        >
          <Bell strokeWidth={2} className="w-3.5 h-3.5" />
          {unreadAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1 min-w-[15px] h-[15px] rounded-full bg-rose-600 text-[9px] font-mono font-bold text-white flex items-center justify-center border border-black">
              {unreadAlertsCount}
            </span>
          )}
        </button>

        {/* User Profile Badge: Clean avatar & designation with quick role switcher */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsRoleMenuOpen((prev) => !prev)}
            className={`flex items-center gap-2.5 pl-2.5 border-l ${
              theme === 'dark' ? 'border-[#262626]' : 'border-slate-200'
            } cursor-pointer group text-left`}
            title="Click to switch role or view profile"
          >
            <div className="relative shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-neutral-700 group-hover:ring-neutral-400 transition"
              />
              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-black ${
                isPublicUser(currentUser.role) ? 'bg-sky-400' : isAuthorityUser(currentUser.role) ? 'bg-purple-500' : 'bg-emerald-500'
              }`} />
            </div>
            <div className="hidden sm:block text-left">
              <div className={`text-xs font-semibold ${
                theme === 'dark' ? 'text-white group-hover:text-sky-400' : 'text-slate-900 group-hover:text-sky-600'
              } transition leading-tight tracking-tight flex items-center gap-1`}>
                <span>{currentUser.name}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400 group-hover:text-white transition" />
              </div>
              <div className={`text-[10px] ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'} leading-tight`}>
                {currentUser.roleBadge || (isPublicUser(currentUser.role) ? 'Public View' : isAuthorityUser(currentUser.role) ? 'Govt Authority' : 'Logistics Operator')}
              </div>
            </div>
          </button>

          {/* Quick Role Switcher Dropdown */}
          {isRoleMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsRoleMenuOpen(false)}
              />
              <div className={`absolute right-0 top-full mt-2 w-80 rounded-2xl border shadow-2xl z-50 p-2.5 ${
                theme === 'dark' ? 'bg-[#0f0f0f] border-[#262626] text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <div className="px-2 py-1.5 border-b border-inherit mb-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Switch Access Level / Role
                  </div>
                  <div className="text-xs font-semibold mt-0.5 flex items-center justify-between">
                    <span className="truncate">{currentUser.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                      isPublicUser(currentUser.role)
                        ? 'bg-sky-950/80 text-sky-300 border border-sky-800/60'
                        : isAuthorityUser(currentUser.role)
                        ? 'bg-purple-950/80 text-purple-300 border border-purple-800/60'
                        : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                    }`}>
                      {currentUser.roleBadge || (isPublicUser(currentUser.role) ? 'Public View' : isAuthorityUser(currentUser.role) ? 'Govt Authority' : 'Logistics')}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  {/* Role 1: General Public & Drivers */}
                  <button
                    type="button"
                    onClick={() => {
                      onSwitchRole?.('public');
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full p-2 rounded-xl text-left border transition flex items-start justify-between gap-2 ${
                      isPublicUser(currentUser.role)
                        ? theme === 'dark'
                          ? 'bg-sky-950/60 border-sky-600/80 text-white'
                          : 'bg-sky-50 border-sky-300 text-sky-950'
                        : theme === 'dark'
                        ? 'bg-transparent border-transparent hover:bg-[#1a1a1a] text-neutral-300'
                        : 'bg-transparent border-transparent hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-sky-400" />
                        <span>Role 1: General Public &amp; Drivers</span>
                      </div>
                      <div className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                        Unauthenticated / Public View (Live Map, Hazards, Weather)
                      </div>
                    </div>
                    {isPublicUser(currentUser.role) && <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />}
                  </button>

                  {/* Role 2: Govt & Disaster Authority */}
                  <button
                    type="button"
                    onClick={() => {
                      onSwitchRole?.('authority');
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full p-2 rounded-xl text-left border transition flex items-start justify-between gap-2 ${
                      isAuthorityUser(currentUser.role)
                        ? theme === 'dark'
                          ? 'bg-purple-950/60 border-purple-600/80 text-white'
                          : 'bg-purple-50 border-purple-300 text-purple-950'
                        : theme === 'dark'
                        ? 'bg-transparent border-transparent hover:bg-[#1a1a1a] text-neutral-300'
                        : 'bg-transparent border-transparent hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-purple-400" />
                        <span>Role 2: Govt &amp; Disaster Authority</span>
                      </div>
                      <div className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                        BRO / SDMA / Police (Incident Command &amp; Verification Queue)
                      </div>
                    </div>
                    {isAuthorityUser(currentUser.role) && <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />}
                  </button>

                  {/* Role 3: Logistics & Fleet Operator */}
                  <button
                    type="button"
                    onClick={() => {
                      onSwitchRole?.('logistics');
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full p-2 rounded-xl text-left border transition flex items-start justify-between gap-2 ${
                      isLogisticsUser(currentUser.role)
                        ? theme === 'dark'
                          ? 'bg-emerald-950/60 border-emerald-600/80 text-white'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : theme === 'dark'
                        ? 'bg-transparent border-transparent hover:bg-[#1a1a1a] text-neutral-300'
                        : 'bg-transparent border-transparent hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Role 3: Logistics &amp; Fleet Operator</span>
                      </div>
                      <div className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                        Transporter / Dispatcher (Fleet Tracking, Detours, Cargo)
                      </div>
                    </div>
                    {isLogisticsUser(currentUser.role) && <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                  </button>
                </div>

                <div className="pt-2 mt-2 border-t border-inherit space-y-1.5">
                  {onOpenLogin && (
                    <button
                      type="button"
                      onClick={() => {
                        onOpenLogin();
                        setIsRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        theme === 'dark'
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-sm'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600 shadow-sm'
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Return to Log In Screen / Portal</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      onSelectTab('settings');
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition ${
                      theme === 'dark' ? 'bg-[#1a1a1a] text-neutral-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:text-black'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Regional Settings &amp; Full Profile</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sync Queue Modal */}
      <SyncQueueModal
        isOpen={isQueueModalOpen}
        onClose={() => setIsQueueModalOpen(false)}
        theme={theme}
      />

      {/* Alternative Communication Modes Modal */}
      <AlternativeCommModal
        isOpen={isAltCommModalOpen}
        onClose={() => setIsAltCommModalOpen(false)}
        theme={theme}
      />
    </header>
  );
};
