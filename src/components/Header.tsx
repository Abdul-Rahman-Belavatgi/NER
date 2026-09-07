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
  ChevronDown
} from 'lucide-react';
import { UserProfile, UserRole, isPublicUser, isAuthorityUser, isLogisticsUser } from '../types';
import { LANGUAGES, LanguageCode, TRANSLATIONS } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';

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
  currentLang: propLang,
  onSelectLang,
}) => {
  const { currentLang: contextLang, setLang, at } = useLanguage();
  const currentLang = propLang || contextLang;
  const [timeStr, setTimeStr] = useState<string>('');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isServerOnline, setIsServerOnline] = useState(true);
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
          onClick={() => setIsServerOnline((prev) => !prev)}
          title={isServerOnline ? "Click to switch to Server Offline / Local Cache" : "Click to switch to Live Server Connected"}
          className={`whitespace-nowrap shrink-0 flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium cursor-pointer transition select-none hover:shadow-sm active:scale-95 ${
            isServerOnline
              ? theme === 'dark'
                ? 'bg-[#0a0a0a] border-[#262626] text-neutral-200 hover:border-emerald-500/60'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-emerald-500'
              : theme === 'dark'
                ? 'bg-rose-950/40 border-rose-800/70 text-rose-300 hover:border-rose-500'
                : 'bg-rose-50 border-rose-300 text-rose-800 hover:border-rose-400'
          }`}
        >
          {isServerOnline ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="leading-none whitespace-nowrap font-medium">{at.headerLiveServerConnected || t.liveServerConnected}</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span className="leading-none whitespace-nowrap font-medium">{at.headerServerOffline || 'Server Offline / Local Cache'}</span>
            </>
          )}
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

        {/* User Profile Badge: Clean avatar & designation */}
        <div
          onClick={() => onSelectTab('settings')}
          className={`flex items-center gap-2.5 pl-2.5 border-l ${
            theme === 'dark' ? 'border-[#262626]' : 'border-slate-200'
          } cursor-pointer group`}
          title="Operator Profile & Settings"
        >
          <div className="relative shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-neutral-700 group-hover:ring-neutral-400 transition"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-black" />
          </div>
          <div className="hidden sm:block text-left">
            <div className={`text-xs font-semibold ${
              theme === 'dark' ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-600'
            } transition leading-tight tracking-tight`}>
              {currentUser.name}
            </div>
            <div className={`text-[10px] ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'} leading-tight`}>
              {currentUser.roleBadge || (isPublicUser(currentUser.role) ? at.operatorRolePublic : isAuthorityUser(currentUser.role) ? at.operatorRoleAuthority : at.operatorRoleLogistics)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
