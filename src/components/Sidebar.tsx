import React from 'react';
import {
  Radio,
  LayoutDashboard,
  Map,
  GitFork,
  AlertTriangle,
  FileText,
  Package,
  Truck,
  CloudRain,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { UserProfile, UserRole, isPublicUser, isAuthorityUser, isLogisticsUser } from '../types';
import { LanguageCode, TRANSLATIONS } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentUser: UserProfile;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
  unreadAlertsCount: number;
  pendingVerificationCount?: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  theme?: 'dark' | 'light';
  currentLang?: LanguageCode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onSwitchRole,
  onLogout,
  unreadAlertsCount,
  pendingVerificationCount = 2,
  isCollapsed = false,
  onToggleCollapse,
  isOpenMobile = false,
  onCloseMobile,
  theme = 'dark',
  currentLang: propLang,
}) => {
  const { currentLang: contextLang, at } = useLanguage();
  const currentLang = propLang || contextLang;
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const getNavIconAnimation = (id: string) => {
    switch (id) {
      case 'alerts':
        return 'icon-anim-ring';
      case 'map':
        return 'icon-anim-spin';
      case 'routes':
        return 'icon-anim-diagonal';
      case 'incidents':
      case 'verificationQueue':
        return 'icon-anim-heart';
      case 'vehicles':
      case 'logistics':
        return 'icon-anim-shift';
      case 'weather':
        return 'icon-anim-pulse';
      case 'fieldReporting':
      case 'dashboard':
      default:
        return 'icon-anim-pop';
    }
  };

  // Navigation items grouped strictly based on the Image 4 RBAC Visibility Matrix:
  // Role 1 (Public): Map, Incidents Feed, Weather, Report Hazard, Alerts (Read-only)
  // Role 2 (Govt Authority): Dashboard, Map, Weather, Verification Queue, Incidents, Field Logging, Alerts (Broadcast)
  // Role 3 (Logistics Operator): Dashboard, Map, Weather, Route Planning, Cargo, Fleet Tracking, Incidents, Report, Alerts (Action)
  const getNavGroups = (role: UserRole) => {
    if (isPublicUser(role)) {
      return [
        {
          title: at.navPublicSafetyTitle,
          items: [
            { id: 'map', label: at.navLiveHighwayMap, icon: Map },
            { id: 'incidents', label: at.navActiveIncidentsFeed, icon: AlertTriangle },
            { id: 'weather', label: at.navWeatherRainAlerts, icon: CloudRain },
          ],
        },
        {
          title: at.navPublicActionsTitle,
          items: [
            { id: 'fieldReporting', label: at.navReportRoadHazard, icon: FileText },
            { id: 'alerts', label: at.navEmergencyAlerts, icon: Bell, badge: unreadAlertsCount },
          ],
        },
      ];
    }

    if (isAuthorityUser(role)) {
      return [
        {
          title: at.navCorridorOversightTitle,
          items: [
            { id: 'dashboard', label: at.navOperationsDashboard, icon: LayoutDashboard },
            { id: 'map', label: at.navLiveHighwayMap, icon: Map },
            { id: 'weather', label: at.navWeatherRiskRadar, icon: CloudRain },
          ],
        },
        {
          title: at.navIncidentCommandTitle,
          items: [
            { id: 'verificationQueue', label: at.navIncidentVerificationQueue, icon: ShieldCheck, badge: pendingVerificationCount },
            { id: 'incidents', label: at.navIncidentManagement, icon: AlertTriangle },
            { id: 'fieldReporting', label: at.navOfficialRoadblockLogging, icon: FileText },
            { id: 'alerts', label: at.navEmergencyAlertsBroadcasts, icon: Bell, badge: unreadAlertsCount },
          ],
        },
      ];
    }

    // Role 3: Logistics & Fleet Operator (Transporters, Dispatchers)
    return [
      {
        title: at.navOperationsTitle,
        items: [
          { id: 'dashboard', label: at.navFleetOperationsDashboard, icon: LayoutDashboard },
          { id: 'map', label: at.navLiveFleetMap, icon: Map },
          { id: 'weather', label: at.navWeatherRiskRadar, icon: CloudRain },
        ],
      },
      {
        title: at.navLogisticsDetoursTitle,
        items: [
          { id: 'routes', label: at.navRoutePlanningDetour, icon: GitFork },
          { id: 'logistics', label: at.navCargoShipments, icon: Package },
          { id: 'vehicles', label: at.navFleetTracking, icon: Truck },
        ],
      },
      {
        title: at.navHazardsSafetyTitle,
        items: [
          { id: 'incidents', label: at.navActiveHazardsFeed, icon: AlertTriangle },
          { id: 'fieldReporting', label: at.navReportIncidentHazard, icon: FileText },
          { id: 'alerts', label: at.navEmergencyAlerts, icon: Bell, badge: unreadAlertsCount },
        ],
      },
    ];
  };

  const navGroups = getNavGroups(currentUser.role);

  return (
    <>
      {/* Mobile Drawer (Only on small screens when open) */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer content */}
          <aside className={`fixed inset-y-0 left-0 w-72 ${
            theme === 'dark' ? 'bg-black border-[#262626] text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          } border-r flex flex-col justify-between select-none shadow-2xl z-50 animate-slide-in transition-colors duration-200`}>
            <div>
              {/* Header with close button */}
              <div className={`p-4 flex items-center justify-between border-b ${
                theme === 'dark' ? 'border-[#262626]' : 'border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-950 shadow-md shadow-white/5 shrink-0">
                    <Radio strokeWidth={2.25} className="w-5 h-5 icon-anim-pulse" />
                  </div>
                  <div>
                    <div className={`text-sm font-bold tracking-tight leading-tight ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      NER Intelligence
                    </div>
                    <div className={`text-[10px] ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'
                    }`}>
                      Regional Command
                    </div>
                  </div>
                </div>
                <button
                  onClick={onCloseMobile}
                  className={`p-1.5 rounded-lg ${
                    theme === 'dark' ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  } transition`}
                  title="Close sidebar"
                >
                  <X strokeWidth={2.25} className="w-5 h-5 icon-anim-pop" />
                </button>
              </div>

              {/* Mobile Nav */}
              <nav className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-220px)]">
                {navGroups.map((group) => (
                  <div key={group.title} className="space-y-1">
                    <div className="px-3 text-[10px] font-mono tracking-wider text-slate-500 uppercase">
                      {group.title}
                    </div>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentTab === item.id;
                      const animClass = getNavIconAnimation(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onSelectTab(item.id);
                            if (onCloseMobile) onCloseMobile();
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition group ${
                            isActive
                              ? theme === 'dark'
                                ? 'bg-white text-black font-bold shadow-sm'
                                : 'bg-slate-900 text-white font-bold shadow-sm'
                              : theme === 'dark'
                              ? 'text-neutral-400 hover:text-white hover:bg-[#141414]'
                              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon strokeWidth={2} className={`w-4 h-4 shrink-0 ${animClass}`} />
                            <span>{item.label}</span>
                          </div>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className="px-1.5 py-0.2 rounded font-mono text-[10px] font-bold bg-rose-600 text-white">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>

            {/* Mobile Bottom Section: Settings & Log Out */}
            <div className={`p-3 border-t ${theme === 'dark' ? 'border-[#262626]' : 'border-slate-200'} space-y-1.5`}>
              <button
                onClick={() => {
                  onSelectTab('settings');
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition group ${
                  currentTab === 'settings'
                    ? theme === 'dark'
                      ? 'bg-white text-black shadow-sm font-bold'
                      : 'bg-slate-900 text-white shadow-sm font-bold'
                    : theme === 'dark'
                    ? 'text-neutral-300 hover:text-white hover:bg-[#141414]'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <Settings strokeWidth={2} className="w-4 h-4" />
                <span>{at.navSettings}</span>
              </button>

              <button
                onClick={onLogout}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition group ${
                  theme === 'dark'
                    ? 'text-neutral-400 hover:text-rose-400 hover:bg-[#141414]'
                    : 'text-slate-600 hover:text-rose-600 hover:bg-slate-100'
                }`}
              >
                <LogOut strokeWidth={2} className="w-4 h-4" />
                <span>{at.navLogOut}</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar: In-flow, spans all the way to page bottom naturally */}
      <aside
        className={`hidden md:flex flex-col shrink-0 h-full border-r ${
          theme === 'dark' ? 'border-[#262626] bg-black text-slate-100' : 'border-slate-200 bg-white text-slate-900 shadow-sm'
        } select-none transition-all duration-200 relative z-20 ${
          isCollapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Top Control & Status Header */}
        <div className={`p-3 flex items-center justify-between border-b ${
          theme === 'dark' ? 'border-[#262626]' : 'border-slate-200'
        } shrink-0 h-14`}>
          {!isCollapsed ? (
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-slate-200 shrink-0 group">
                <Radio strokeWidth={2.25} className="w-3.5 h-3.5 icon-anim-pulse" />
              </div>
              <div className="overflow-hidden">
                <div className={`text-[11px] font-bold tracking-wide uppercase truncate ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {at.navCorridorOversightTitle}
                </div>
                <div className={`text-[9px] flex items-center gap-1 truncate ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  <span>{at.navActiveSession}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto">
              <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-slate-200 group">
                <Radio strokeWidth={2.25} className="w-3.5 h-3.5 icon-anim-pulse" />
              </div>
            </div>
          )}

          {onToggleCollapse && !isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className={`p-1.5 rounded-lg group ${
                theme === 'dark' ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              } transition`}
              title="Collapse sidebar"
            >
              <ChevronLeft strokeWidth={2.25} className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            </button>
          )}
        </div>

        {/* Desktop Nav Items (Flex-1 scrollable, natural spacing) */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-3 min-h-0">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              {!isCollapsed && (
                <div className={`px-2 pt-1 pb-0.5 text-[9px] font-mono tracking-widest ${
                  theme === 'dark' ? 'text-neutral-500' : 'text-slate-600 font-bold'
                } uppercase flex items-center justify-between`}>
                  <span>{group.title}</span>
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                const animClass = getNavIconAnimation(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${
                      isCollapsed ? 'justify-center px-2 py-2' : 'justify-between px-2.5 py-1.5'
                    } rounded-md text-xs font-semibold transition group ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-white text-black font-bold shadow-sm'
                          : 'bg-slate-900 text-white font-bold shadow-sm'
                        : theme === 'dark'
                        ? 'text-neutral-400 hover:text-white hover:bg-[#141414]'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        strokeWidth={2}
                        className={`w-3.5 h-3.5 shrink-0 ${animClass}`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>
                    {!isCollapsed && item.badge !== undefined && item.badge > 0 && (
                      <span className="px-1.5 py-0.2 rounded font-mono text-[9px] font-bold bg-rose-600 text-white">
                        {item.badge}
                      </span>
                    )}
                    {isCollapsed && item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-black" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Desktop Bottom Section: Settings & Log Out (Clean & uncluttered) */}
        <div className={`p-2.5 border-t ${
          theme === 'dark' ? 'border-[#262626] bg-black' : 'border-slate-200 bg-white'
        } shrink-0 space-y-1`}>
          {/* Settings */}
          <button
            onClick={() => onSelectTab('settings')}
            title={isCollapsed ? at.navSettings : undefined}
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center p-2' : 'gap-2.5 px-3 py-2'
            } rounded-lg text-xs font-semibold transition group ${
              currentTab === 'settings'
                ? theme === 'dark'
                  ? 'bg-white text-black shadow-sm font-bold'
                  : 'bg-slate-900 text-white shadow-sm font-bold'
                : theme === 'dark'
                ? 'text-neutral-300 hover:text-white hover:bg-[#141414]'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Settings strokeWidth={2} className={`w-4 h-4 shrink-0 transition-colors ${
              currentTab === 'settings' && theme === 'dark' ? 'text-black' : ''
            }`} />
            {!isCollapsed && <span>{at.navSettings}</span>}
          </button>

          {/* Log Out */}
          <button
            onClick={onLogout}
            title={isCollapsed ? at.navLogOut : undefined}
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center p-2' : 'gap-2.5 px-3 py-2'
            } rounded-lg text-xs font-semibold transition group ${
              theme === 'dark'
                ? 'text-neutral-400 hover:text-rose-400 hover:bg-[#141414]'
                : 'text-slate-600 hover:text-rose-600 hover:bg-slate-100'
            }`}
          >
            <LogOut strokeWidth={2} className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>{at.navLogOut}</span>}
          </button>

          {/* Expand Button when collapsed */}
          {isCollapsed && onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className={`w-full flex items-center justify-center p-2 rounded-lg group ${
                theme === 'dark' ? 'text-neutral-400 hover:text-white hover:bg-neutral-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              } transition mt-1`}
              title="Expand sidebar"
            >
              <ChevronRight strokeWidth={2} className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
