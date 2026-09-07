import React, { useState } from 'react';
import { UserRole, UserProfile, Incident, Vehicle, Shipment, OperationalAlert, HubWeather, isPublicUser, isAuthorityUser, isLogisticsUser } from './types';
import {
  OPERATOR_PROFILES,
  INITIAL_INCIDENTS,
  INITIAL_VEHICLES,
  INITIAL_SHIPMENTS,
  INITIAL_ALERTS,
  INITIAL_WEATHER_HUBS,
} from './data/initialData';
import { LanguageCode } from './data/translations';
import { useLanguage } from './context/LanguageContext';

import { LoginView } from './components/LoginView';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { IntelligenceMapView } from './components/IntelligenceMapView';
import { RoutePlanningView } from './components/RoutePlanningView';
import { IncidentsView } from './components/IncidentsView';
import { FieldReportingView } from './components/FieldReportingView';
import { LogisticsView } from './components/LogisticsView';
import { VehiclesView } from './components/VehiclesView';
import { WeatherView } from './components/WeatherView';
import { AlertsView } from './components/AlertsView';
import { SettingsView } from './components/SettingsView';
import { ReportIncidentModal } from './components/ReportIncidentModal';
import { IncidentVerificationQueueView } from './components/IncidentVerificationQueueView';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile>(OPERATOR_PROFILES.admin);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { currentLang, setLang } = useLanguage();

  const handleSelectLang = (lang: LanguageCode) => {
    setLang(lang);
  };

  // Application Data State
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [alerts, setAlerts] = useState<OperationalAlert[]>(INITIAL_ALERTS);
  const [weatherHubs, setWeatherHubs] = useState<HubWeather[]>(INITIAL_WEATHER_HUBS);

  // Selected details
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(INITIAL_INCIDENTS[0]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(INITIAL_VEHICLES[0]);

  // Modals & Navigation
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setIsSidebarCollapsed((prev) => !prev);
    } else {
      setIsSidebarMobileOpen((prev) => !prev);
    }
  };

  const handleLogin = (role: UserRole) => {
    const profile = OPERATOR_PROFILES[role] || OPERATOR_PROFILES.admin;
    setCurrentUser(profile);
    setIsAuthenticated(true);
    if (isPublicUser(role)) {
      setCurrentTab('map');
    } else {
      setCurrentTab('dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleSwitchRole = (role: UserRole) => {
    const profile = OPERATOR_PROFILES[role] || OPERATOR_PROFILES.admin;
    setCurrentUser(profile);
    if (isPublicUser(role)) {
      // Public users only have access to map, incidents, weather, fieldReporting, alerts
      if (['dashboard', 'routes', 'logistics', 'vehicles', 'verificationQueue'].includes(currentTab)) {
        setCurrentTab('map');
      }
    } else if (isAuthorityUser(role)) {
      // Authorities do not have commercial routes, logistics, or vehicles
      if (['routes', 'logistics', 'vehicles'].includes(currentTab)) {
        setCurrentTab('dashboard');
      }
    } else if (isLogisticsUser(role)) {
      // Logistics operators do not have verification queue
      if (['verificationQueue'].includes(currentTab)) {
        setCurrentTab('dashboard');
      }
    }
  };

  const handleReportIncident = (newIncidentData: Omit<Incident, 'id' | 'code' | 'timeAgo'>) => {
    const newCode = `INC-${8920 + incidents.length + 1}`;
    const isAuthority = isAuthorityUser(currentUser.role);

    const newIncident: Incident = {
      ...newIncidentData,
      id: `inc-${Date.now()}`,
      code: newCode,
      timeAgo: 'Just now',
      verificationStatus: isAuthority ? 'VERIFIED' : 'PENDING',
      reportedBy: isAuthority ? currentUser.name : (newIncidentData.reportedBy || `${currentUser.name} (Citizen / Field)`),
    };

    setIncidents([newIncident, ...incidents]);
    setSelectedIncident(newIncident);

    // Create operational alert
    const newAlert: OperationalAlert = {
      id: `alt-${Date.now()}`,
      type: newIncident.severity === 'critical' ? 'CRITICAL' : 'HIGH',
      title: isAuthority
        ? `Official Road Declaration - ${newIncident.landmark}`
        : `Citizen Report Queued for Verification - ${newIncident.landmark}`,
      timeAgo: 'Just now',
      message: `${newIncident.title} in ${newIncident.location}. Status: ${newIncident.status}. Delay estimated at ${newIncident.delayText}.`,
      relatedIncidentId: newIncident.id,
      isRead: false,
    };

    setAlerts([newAlert, ...alerts]);
  };

  const handleVerifyIncident = (
    id: string,
    updates: { status: 'PASSABLE' | 'RESTRICTED' | 'BLOCKED'; clearanceEta: string; officialNotes: string }
  ) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === id) {
          return {
            ...inc,
            verificationStatus: 'VERIFIED',
            status: updates.status,
            delayText: updates.clearanceEta,
            clearanceEta: updates.clearanceEta,
            officialNotes: updates.officialNotes,
          };
        }
        return inc;
      })
    );

    const target = incidents.find((i) => i.id === id);
    if (target) {
      const newAlert: OperationalAlert = {
        id: `alt-verified-${Date.now()}`,
        type: updates.status === 'BLOCKED' ? 'CRITICAL' : 'HIGH',
        title: `Official Road Closure Verified - ${target.landmark}`,
        timeAgo: 'Just now',
        message: `BRO and Disaster Authorities have verified: ${target.title}. Status set to ${updates.status}. Clearance ETA: ${updates.clearanceEta}. Official Notes: ${updates.officialNotes || 'Confirmed by field patrol.'}`,
        relatedIncidentId: id,
        isRead: false,
      };
      setAlerts((prev) => [newAlert, ...prev]);
    }
  };

  const handleRejectIncident = (id: string, reason: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === id) {
          return {
            ...inc,
            verificationStatus: 'REJECTED',
            officialNotes: reason,
          };
        }
        return inc;
      })
    );
  };

  const handleAcknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
  };

  const handleMarkAllAlertsRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...updated }));
  };

  const handleNavigateTab = (tab: string, context?: any) => {
    setCurrentTab(tab);
    if (context?.incidentId) {
      const found = incidents.find((i) => i.id === context.incidentId);
      if (found) setSelectedIncident(found);
    }
    if (context?.vehicleId) {
      const found = vehicles.find((v) => v.id === context.vehicleId);
      if (found) setSelectedVehicle(found);
    }
  };

  const unreadAlertsCount = alerts.filter((a) => !a.isRead).length;
  const pendingVerificationCount = incidents.filter((i) => i.verificationStatus === 'PENDING').length;

  if (!isAuthenticated) {
    return (
      <LoginView
        onLogin={handleLogin}
        onViewMap={() => {
          handleLogin('field');
          setCurrentTab('map');
        }}
        onReportIssue={() => {
          handleLogin('field');
          setCurrentTab('fieldReporting');
          setIsReportModalOpen(true);
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
      />
    );
  }

  return (
    <div className={`h-screen max-h-screen w-screen overflow-hidden ${theme === 'dark' ? 'bg-black text-slate-100' : 'bg-slate-100 text-slate-900'} flex flex-col font-sans transition-colors`}>
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentUser={currentUser}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        unreadAlertsCount={unreadAlertsCount}
        onOpenAlerts={() => setCurrentTab('alerts')}
        onToggleSidebar={handleToggleSidebar}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
      />

      {/* Main App Body: fills exact viewport height below header */}
      <div className="flex-1 flex min-h-0 w-full overflow-hidden relative">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          currentUser={currentUser}
          onSwitchRole={handleSwitchRole}
          onLogout={handleLogout}
          unreadAlertsCount={unreadAlertsCount}
          pendingVerificationCount={pendingVerificationCount}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          isOpenMobile={isSidebarMobileOpen}
          onCloseMobile={() => setIsSidebarMobileOpen(false)}
          theme={theme}
          currentLang={currentLang}
        />

        {/* Content Area: scrolls smoothly while sidebar & header remain anchored */}
        <main className="flex-1 h-full min-h-0 overflow-y-auto p-4 md:p-6 max-w-[1750px] mx-auto w-full">
          {currentTab === 'dashboard' && (
            <DashboardView
              incidents={incidents}
              vehicles={vehicles}
              weatherHubs={weatherHubs}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onNavigateTab={handleNavigateTab}
              onSelectIncident={setSelectedIncident}
              theme={theme}
            />
          )}

          {currentTab === 'map' && (
            <IntelligenceMapView
              incidents={incidents}
              vehicles={vehicles}
              currentUser={currentUser}
              onNavigateTab={handleNavigateTab}
              onSelectIncident={(inc) => {
                setSelectedIncident(inc);
                setCurrentTab('incidents');
              }}
              onSelectVehicle={(veh) => {
                setSelectedVehicle(veh);
                setCurrentTab('vehicles');
              }}
              theme={theme}
            />
          )}

          {currentTab === 'verificationQueue' && (
            <IncidentVerificationQueueView
              incidents={incidents}
              onVerifyIncident={handleVerifyIncident}
              onRejectIncident={handleRejectIncident}
              onNavigateTab={handleNavigateTab}
              theme={theme}
            />
          )}

          {currentTab === 'routes' && (
            <RoutePlanningView
              vehicles={vehicles}
              incidents={incidents}
              theme={theme}
            />
          )}

          {currentTab === 'incidents' && (
            <IncidentsView
              incidents={incidents}
              selectedIncident={selectedIncident}
              currentUser={currentUser}
              onSelectIncident={setSelectedIncident}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onNavigateTab={handleNavigateTab}
              theme={theme}
            />
          )}

          {currentTab === 'fieldReporting' && (
            <FieldReportingView
              onSubmitReport={handleReportIncident}
              onNavigateTab={handleNavigateTab}
              theme={theme}
            />
          )}

          {currentTab === 'logistics' && (
            <LogisticsView
              shipments={shipments}
              onNavigateTab={handleNavigateTab}
              theme={theme}
            />
          )}

          {currentTab === 'vehicles' && (
            <VehiclesView
              vehicles={vehicles}
              onNavigateTab={handleNavigateTab}
              onSelectVehicle={setSelectedVehicle}
              theme={theme}
            />
          )}

          {currentTab === 'weather' && (
            <WeatherView
              weatherHubs={weatherHubs}
              onNavigateTab={handleNavigateTab}
              theme={theme}
            />
          )}

          {currentTab === 'alerts' && (
            <AlertsView
              alerts={alerts}
              onMarkAllAsRead={handleMarkAllAlertsRead}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onNavigateTab={handleNavigateTab}
              theme={theme}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              currentUser={currentUser}
              onUpdateProfile={handleUpdateProfile}
              onSwitchRole={handleSwitchRole}
              theme={theme}
            />
          )}
        </main>
      </div>

      {/* Global Report Incident Modal */}
      <ReportIncidentModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportIncident}
        currentUser={currentUser}
        theme={theme}
      />
    </div>
  );
}
