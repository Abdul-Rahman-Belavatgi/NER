import { LanguageCode, TRANSLATIONS } from './translations';

export interface AppTranslations {
  // Navigation & Sidebars
  navPublicSafetyTitle: string;
  navPublicActionsTitle: string;
  navCorridorOversightTitle: string;
  navIncidentCommandTitle: string;
  navOperationsTitle: string;
  navLogisticsDetoursTitle: string;
  navHazardsSafetyTitle: string;
  navFleetOperationsDashboard: string;
  navOperationsDashboard: string;
  navLiveFleetMap: string;
  navLiveHighwayMap: string;
  navWeatherRiskRadar: string;
  navWeatherRainAlerts: string;
  navRoutePlanningDetour: string;
  navCargoShipments: string;
  navFleetTracking: string;
  navActiveHazardsFeed: string;
  navActiveIncidentsFeed: string;
  navIncidentVerificationQueue: string;
  navIncidentManagement: string;
  navOfficialRoadblockLogging: string;
  navReportRoadHazard: string;
  navReportIncidentHazard: string;
  navEmergencyAlerts: string;
  navEmergencyAlertsBroadcasts: string;
  navSettings: string;
  navLogOut: string;

  // Header Fast Nav Tabs
  topFleetDashboard: string;
  topFleetMap: string;
  topRoutePlanning: string;
  topCargoShipments: string;
  topOperationsDashboard: string;
  topLiveHighwayMap: string;
  topVerificationQueue: string;
  topActiveIncidents: string;
  topWeatherAlerts: string;
  operatorRoleLogistics: string;
  operatorRoleAuthority: string;
  operatorRolePublic: string;

  // Corridor Dashboard
  dashBannerTitle: string;
  dashMonsoonAdvisory: string;
  dashCorridorSub: string;
  dashPlanRouteBtn: string;
  dashClearanceTitle: string;
  dashRestrictedMovement: string;
  dashPassable: string;
  dashClearanceNote: string;
  dashActiveBlockages: string;
  dashTotalClosure: string;
  dash2Critical: string;
  dashSingleLaneOpen: string;
  dashViewBlockages: string;
  dashActiveFleet: string;
  dashEnRoute: string;
  dashVehiclesMoving: string;
  dashDispatchedCount: string;
  dashFleetDiversionNote: string;
  dashTrackVehicles: string;
  dashLandslideAlert: string;
  dashHighVulnerability: string;
  dashHighRiskLevel: string;
  dashRainBeltSaturated: string;
  dashWeatherRadar: string;
  dashLiveHighwayMap: string;
  dashAllCorridors: string;
  dashLayers: string;
  dashActiveIncidentsTitle: string;
  dashViewAll: string;
  dashViewOnMap: string;
  dashFindDetour: string;

  // Live Map
  mapFilter: string;
  mapStatusBlocked: string;
  mapStatusRestricted: string;
  mapStatusAll: string;
  mapReset: string;
  mapLegendOpen: string;
  mapLegendPartial: string;
  mapLegendBlocked: string;
  mapCardActiveHazards: string;
  mapCardHazardsSub: string;
  mapCardViewHazards: string;
  mapCardActiveTrucks: string;
  mapCardTrucksSub: string;
  mapCardTrackFleet: string;
  mapCardCalcDetour: string;
  mapCardDetourSub: string;
  mapCardPlanRoute: string;

  // Weather & Risk
  weatherTitle: string;
  weatherSubtitle: string;
  weatherHighRain: string;
  weatherModerateRain: string;
  weatherLowRisk: string;
  weatherHeavyRainMist: string;
  weatherHumidClouds: string;
  weatherMonsoonDownpours: string;
  weatherOvercastMist: string;
  weatherRain: string;
  weatherWind: string;
  weatherSaturationTitle: string;
  weatherLastUpdated: string;
  weatherRiskCritical: string;
  weatherRiskHigh: string;
  weatherRiskLow: string;
  weatherRiskModerate: string;

  // Route Planning
  routeOptTitle: string;
  routeVerifiedBadge: string;
  routeRecalcBtn: string;
  routeOptDesc: string;
  routeSaferBypass: string;
  routeRecommended: string;
  routeDirectHighway: string;
  routeHighRiskBadge: string;
  routeTotalDistance: string;
  routeEstTravelTime: string;
  routeDelayed: string;
  routeCorridor: string;
  routeBypassDesc: string;
  routeAWarning: string;
  routeModAdvisory: string;
  routeWeatherWarning: string;
  routeCorridorStatus: string;
  routeStatusPatrolled: string;
  routeRoadBlockage: string;
  routeBlockageDesc: string;
  routeComparisonTitle: string;
  routeAIndicator: string;
  routeBIndicator: string;

  // Cargo & Logistics
  cargoTitle: string;
  cargoSubtitle: string;
  cargoNewBtn: string;
  cargoActiveLoads: string;
  cargoCriticalCargo: string;
  cargoDelayedRoadblocks: string;
  cargoOnTimeDelivery: string;
  cargoSearchPlaceholder: string;
  cargoAllStatuses: string;
  cargoHighPriority: string;
  cargoNormalPriority: string;
  cargoInTransit: string;
  cargoDelayed: string;
  cargoDelivered: string;
  cargoEtaLabel: string;
  cargoArrivingIn: string;
  cargoTrackOnMap: string;
  cargoRerouteFreight: string;
  cargoTrackRoute: string;
  cargoViewManifest: string;
  cargoDeliveryConfirmation: string;

  // Fleet & Vehicles
  fleetTitle: string;
  fleetSubtitle: string;
  fleetAddBtn: string;
  fleetTotal: string;
  fleetOnRoad: string;
  fleetDelayedHalted: string;
  fleetAtDepot: string;
  fleetSearchPlaceholder: string;
  fleetStatusMoving: string;
  fleetStatusDelayed: string;
  fleetStatusIdle: string;
  fleetFuel: string;
  fleetRoute: string;
  fleetDriver: string;
  fleetTrackOnMap: string;
  fleetCallDriver: string;
  fleetRerouteVehicle: string;

  // Active Incidents Feed
  incidentsTitle: string;
  incidentsSubtitle: string;
  incidentsReportBtn: string;
  incidentsSearchPlaceholder: string;
  incidentsAllSeverities: string;
  incidentsAllTypes: string;
  incidentsCalculateDetour: string;
  incidentsViewAdvisory: string;
  incidentsDetailsTitle: string;
  incidentsCorridorLandmark: string;
  incidentsDistrictState: string;
  incidentsReportingSource: string;
  incidentsGpsCoords: string;
  incidentsEstimatedClearance: string;

  // Field Reporting
  fieldTitle: string;
  fieldSubtitle: string;
  fieldUseLocationBtn: string;
  fieldStateLabel: string;
  fieldDistrictLabel: string;
  fieldCorridorLabel: string;
  fieldCorridorPlaceholder: string;
  fieldHazardCatLabel: string;
  fieldPassageStatusLabel: string;
  fieldEstDelayLabel: string;
  fieldLatLabel: string;
  fieldLngLabel: string;
  fieldObservationsLabel: string;
  fieldObservationsPlaceholder: string;
  fieldPhotoLabel: string;
  fieldSubmitReport: string;
  fieldPublishDeclaration: string;
  fieldSubmitVerification: string;

  // Verification Queue
  queueTitle: string;
  queueSubtitle: string;
  queueTabPending: string;
  queueTabVerified: string;
  queueTabRejected: string;
  queueReviewBtn: string;
  queueVerifyAction: string;
  queueDismissAction: string;

  // Emergency Alerts
  alertsTitle: string;
  alertsSubtitle: string;
  alertsMarkAllRead: string;
  alertsStatusAction: string;
  alertsRerouteConvoys: string;
  alertsMarkHandled: string;
  alertsCheckVanTemp: string;

  // Settings
  settingsTitle: string;
  settingsSubtitle: string;
  settingsAssignedSectors: string;
  settingsSwitchTitle: string;
  settingsSwitchSubtitle: string;
  settingsContactTitle: string;
  settingsFullName: string;
  settingsOfficialEmail: string;
  settingsSectorPost: string;
  settingsRadioChannel: string;
  settingsSaveBtn: string;

  // Common statuses & terms
  statusBlocked: string;
  statusRestricted: string;
  statusPassable: string;
  statusMoving: string;
  statusDelayedTag: string;
  statusIdle: string;

  // Logistics aliases
  logisticsSearchPlaceholder?: string;
  logisticsAllStatuses?: string;
  logisticsInTransit?: string;
  logisticsDelayed?: string;
  logisticsPending?: string;
  logisticsEta?: string;
  logisticsReroute?: string;
  logisticsApprove?: string;
  logisticsTrackMap?: string;

  // Vehicles aliases
  vehiclesTitle?: string;
  vehiclesSubtitle?: string;
  vehiclesAddNew?: string;
  vehiclesTotalFleet?: string;
  vehiclesOnTheRoad?: string;
  vehiclesDelayedHalted?: string;
  vehiclesAtDepot?: string;
  vehiclesSearchPlaceholder?: string;
  vehiclesReroute?: string;
  vehiclesTrackMap?: string;
  vehiclesCallDriver?: string;

  // Route Planning aliases
  routeOptimalTitle?: string;
  routeBVerified?: string;
  routeUpdating?: string;
  routeRecalculate?: string;
  routeHighRisk?: string;
  routeSelectedRoute?: string;
  routeAssignVehicle?: string;
  routeConfirmSend?: string;
  routeAnalysisUpdated?: string;

  // Modal Incident Report
  modalTitle?: string;
  modalAdjust?: string;
  modalAttachPhoto?: string;
  modalClickUpload?: string;
  modalIncidentDetails?: string;
  modalIncidentType?: string;
  modalSeverityLevel?: string;
  modalLow?: string;
  modalMedium?: string;
  modalHighCritical?: string;
  modalCoordinates?: string;
  modalFetchGps?: string;
  modalLandmark?: string;
  modalDistrict?: string;
  modalDescription?: string;
  modalRoadStatus?: string;
  modalPassable?: string;
  modalRestricted?: string;
  modalClosed?: string;
  modalSaveDraft?: string;
  modalSubmit?: string;

  // Settings aliases
  settingsSwitchProfile?: string;
  settingsSwitchDesc?: string;
  settingsPersonalPref?: string;
  settingsEmail?: string;
  settingsPhone?: string;
  settingsRefreshInterval?: string;
  settingsSoundAlerts?: string;
  settingsSaveChanges?: string;

  // Sidebar alias
  navActiveSession?: string;

  // Weather aliases
  weatherStation?: string;
  weatherSlopeTitle?: string;

  // Verification Queue aliases
  verificationQueueSubtitle?: string;
  verificationQueuePending?: string;
  verificationQueueVerified?: string;
  verificationQueueDismissed?: string;
  verificationQueueAuthorityAction?: string;
  verificationQueueOfficialStatus?: string;
  verificationQueueClearanceEta?: string;
  verificationQueueOfficialNote?: string;
  verificationQueueVerifyBroadcast?: string;
  verificationQueueDismiss?: string;
  verificationQueueSelectReport?: string;

  // Incidents aliases
  incidentsReportNew?: string;
  incidentsCritical?: string;
  incidentsHigh?: string;
  incidentsMedium?: string;
  incidentsLow?: string;
  incidentsAllHazards?: string;
  incidentsLandslide?: string;
  incidentsFlashFlood?: string;
  incidentsRockfall?: string;
  incidentsCongestion?: string;
  incidentsBridgeDamage?: string;
  incidentsNoHazards?: string;
  incidentsSource?: string;
  incidentsDelay?: string;
  incidentsViewDetails?: string;
  incidentsGpsCoordinates?: string;
  incidentsEstClearance?: string;
  incidentsViewOnLiveMap?: string;
  incidentsReportUpdate?: string;
  incidentsVerificationQueue?: string;
  incidentsViewOnMap?: string;
  incidentsFindSafeDetour?: string;
  incidentsNoSelectedTitle?: string;
  incidentsNoSelectedSub?: string;
  incidentsFilterAllDistricts?: string;
  incidentsColStatus?: string;

  // Logistics aliases additional
  logisticsTitle?: string;
  logisticsSubtitle?: string;
  logisticsNewFreight?: string;
  logisticsActiveLoads?: string;
  logisticsCriticalCargo?: string;
  logisticsDelayedRoadblocks?: string;
  logisticsOnTimeDelivery?: string;

  // Dashboard aliases
  dashCorridorOps?: string;
  dashCoveringArteries?: string;
  dashPlanRouteDetour?: string;
  dashRoadClearance?: string;
  dashClearanceSub?: string;
  dashCritical?: string;
  dashBlockagesSub?: string;
  dashVehiclesDispatched?: string;
  dashFleetSub?: string;
  dashRainSub?: string;
  dashShillongNH40?: string;
  dashNongpohNH6?: string;
  dashJowaiSilchar?: string;
  dashBlockedLabel?: string;
  dashRestrictedLabel?: string;
  dashMovingLabel?: string;
  dashViewFullscreenMap?: string;
  dashAlternativeRoute?: string;
  dashReviewBypass?: string;
  dashStateHighwayStatus?: string;
  dashLiveClearanceScore?: string;
  dashClearanceScoreHeader?: string;
  dashOperationalState?: string;
  dashRestrictedState?: string;
  dashRegionalTransportMonitoring?: string;
  dashRealtimeSync?: string;
  dashRegionalWeatherAlerts?: string;
  dashDetailedForecast?: string;
  dashLandslideWarningFooter?: string;
  dashActivePill?: string;

  // Field Reporting aliases
  fieldReportingTitle?: string;
  fieldReportingSubtitle?: string;
  fieldReportingUseLocation?: string;
  fieldReportingTransmitted?: string;
  fieldReportingState?: string;
  fieldReportingDistrict?: string;
  fieldReportingLandmark?: string;
  fieldReportingHazardCategory?: string;
  fieldReportingRoadPassage?: string;
  fieldReportingDelay?: string;
  fieldReportingObservations?: string;
  fieldReportingImageProof?: string;
  fieldReportingSubmit?: string;

  // Header & verification aliases
  headerLiveServerConnected?: string;
  headerServerOffline?: string;
  headerReportIncident?: string;
  verificationQueueTitle?: string;

  // Roles
  rolePublicTitle?: string;
  roleAuthorityTitle?: string;
  roleLogisticsTitle?: string;

  // Map Quick Action Cards
  publicCardVerifiedHazards?: string;
  publicCardHazardsSub?: string;
  publicCardViewBulletins?: string;
  publicCardWeatherWarnings?: string;
  publicCardWeatherSub?: string;
  publicCardCheckRadar?: string;
  publicCardReportObstruction?: string;
  publicCardReportSub?: string;
  publicCardReportHazard?: string;

  authorityCardQueueTitle?: string;
  authorityCardQueueSub?: string;
  authorityCardOpenQueue?: string;
  authorityCardCorridorHealth?: string;
  authorityCardCorridorSub?: string;
  authorityCardDashboard?: string;
  authorityCardRainfallRadar?: string;
  authorityCardRadarSub?: string;
  authorityCardViewRadar?: string;

  // Districts
  districtEastKhasi?: string;
  districtEastJaintia?: string;
  districtRiBhoi?: string;
  districtKamrupMetro?: string;
  districtCachar?: string;

  // Misc
  dashCorridorStripTitle?: string;
  weatherRainUnit?: string;
}

export const APP_TRANSLATIONS: Record<LanguageCode, AppTranslations> = {
  // 1. ENGLISH
  en: {
    navPublicSafetyTitle: 'Public Safety & Conditions',
    navPublicActionsTitle: 'Public Actions & Alerts',
    navCorridorOversightTitle: 'Corridor Oversight',
    navIncidentCommandTitle: 'Incident Command & Verification',
    navOperationsTitle: 'Operations',
    navLogisticsDetoursTitle: 'Logistics & Detours',
    navHazardsSafetyTitle: 'Hazards & Safety',
    navFleetOperationsDashboard: 'Fleet Operations Dashboard',
    navOperationsDashboard: 'Operations Dashboard',
    navLiveFleetMap: 'Live Fleet Map',
    navLiveHighwayMap: 'Live Highway Map',
    navWeatherRiskRadar: 'Weather & Risk Radar',
    navWeatherRainAlerts: 'Weather & Rain Alerts',
    navRoutePlanningDetour: 'Route Planning / Detour',
    navCargoShipments: 'Cargo & Shipments',
    navFleetTracking: 'Fleet Tracking',
    navActiveHazardsFeed: 'Active Hazards Feed',
    navActiveIncidentsFeed: 'Active Incidents Feed',
    navIncidentVerificationQueue: 'Incident Verification Queue',
    navIncidentManagement: 'Incident Management',
    navOfficialRoadblockLogging: 'Official Roadblock Logging',
    navReportRoadHazard: 'Report Road Hazard',
    navReportIncidentHazard: 'Report Incident / Hazard',
    navEmergencyAlerts: 'Emergency Alerts',
    navEmergencyAlertsBroadcasts: 'Emergency Alerts & Broadcasts',
    navSettings: 'Settings',
    navLogOut: 'Log Out',

    topFleetDashboard: 'Fleet Dashboard',
    topFleetMap: 'Fleet Map',
    topRoutePlanning: 'Route Planning',
    topCargoShipments: 'Cargo & Shipments',
    topOperationsDashboard: 'Operations Dashboard',
    topLiveHighwayMap: 'Live Highway Map',
    topVerificationQueue: 'Verification Queue',
    topActiveIncidents: 'Active Incidents',
    topWeatherAlerts: 'Weather Alerts',
    operatorRoleLogistics: 'Logistics & Fleet Operator',
    operatorRoleAuthority: 'Govt Authority',
    operatorRolePublic: 'Public Traveler',

    dashBannerTitle: 'Regional Corridor Operations',
    dashMonsoonAdvisory: 'Monsoon Advisory Active',
    dashCorridorSub: 'Covering Key Arteries: NH-6, NH-40 & NH-27 (Assam – Meghalaya Corridor)',
    dashPlanRouteBtn: 'Plan Route / Detour',
    dashClearanceTitle: 'Road Network Clearance',
    dashRestrictedMovement: 'Restricted Movement',
    dashPassable: 'Passable',
    dashClearanceNote: 'Down 4% due to continuous rain in East Jaintia Hills',
    dashActiveBlockages: 'Active Blockages',
    dashTotalClosure: 'Total Closure',
    dash2Critical: '2 Critical',
    dashSingleLaneOpen: 'Single-lane open at 3 spots',
    dashViewBlockages: 'View Blockages →',
    dashActiveFleet: 'Active Fleet on Route',
    dashEnRoute: 'En Route',
    dashVehiclesMoving: 'Vehicles Moving',
    dashDispatchedCount: '(Out of 6 dispatched)',
    dashFleetDiversionNote: '1 vehicle advised to take diversion near Shillong bypass',
    dashTrackVehicles: 'Track Vehicles →',
    dashLandslideAlert: 'Landslide Hazard Alert',
    dashHighVulnerability: 'High Vulnerability',
    dashHighRiskLevel: 'High Risk (Level 3)',
    dashRainBeltSaturated: '184mm rain in last 24 hrs • Mawsynram-Cherrapunji belt saturated',
    dashWeatherRadar: 'Weather Radar →',
    dashLiveHighwayMap: 'Live Regional Highway Map',
    dashAllCorridors: 'All Corridors',
    dashLayers: 'Layers',
    dashActiveIncidentsTitle: 'Active Road Incidents & Hazards',
    dashViewAll: 'View All',
    dashViewOnMap: 'View on Map',
    dashFindDetour: 'Find Detour',

    mapFilter: 'Filter:',
    mapStatusBlocked: 'Status: Blocked',
    mapStatusRestricted: 'Status: Restricted',
    mapStatusAll: 'All Statuses',
    mapReset: 'Reset',
    mapLegendOpen: 'Open / Clear',
    mapLegendPartial: 'Partial Disruption',
    mapLegendBlocked: 'Blocked',
    mapCardActiveHazards: '7 Active Road Hazards',
    mapCardHazardsSub: 'Sonapur landslide & lowland flood',
    mapCardViewHazards: 'View Hazards →',
    mapCardActiveTrucks: '5 Active Supply Trucks',
    mapCardTrucksSub: 'All units connected via GPS',
    mapCardTrackFleet: 'Track Fleet →',
    mapCardCalcDetour: 'Calculate Safe Detour',
    mapCardDetourSub: 'Bypass active blockages & flood zones',
    mapCardPlanRoute: 'Plan Route →',

    weatherTitle: 'Regional Weather Forecast & Landslide Risk Monitoring',
    weatherSubtitle: 'Real-time radar imagery and IMD rainfall observations across Meghalaya and Assam',
    weatherHighRain: 'High Rain',
    weatherModerateRain: 'Moderate Rain',
    weatherLowRisk: 'Low Risk',
    weatherHeavyRainMist: 'Heavy Rain & Mountain Mist',
    weatherHumidClouds: 'Humid & Passing Clouds',
    weatherMonsoonDownpours: 'Monsoon Downpours',
    weatherOvercastMist: 'Overcast & Mountain Mist',
    weatherRain: 'Rain',
    weatherWind: 'wind',
    weatherSaturationTitle: 'Slope Saturation & Landslide Susceptibility',
    weatherLastUpdated: 'Last updated: 5m ago (IMD Radar Sync)',
    weatherRiskCritical: 'CRITICAL',
    weatherRiskHigh: 'HIGH',
    weatherRiskLow: 'LOW',
    weatherRiskModerate: 'MODERATE',

    routeOptTitle: 'Optimal Route Recommendation',
    routeVerifiedBadge: 'Route B Verified',
    routeRecalcBtn: 'Recalculate Routes',
    routeOptDesc: 'Route B is recommended to avoid active rockfalls and flash flood zones on NH-6 Sonapur Tunnel.',
    routeSaferBypass: 'Safer Bypass (Route B)',
    routeRecommended: 'Recommended',
    routeDirectHighway: 'Direct Highway (Route A)',
    routeHighRiskBadge: 'High Risk – 2 Active Incidents Reported',
    routeTotalDistance: 'TOTAL DISTANCE',
    routeEstTravelTime: 'ESTIMATED TRAVEL TIME',
    routeDelayed: '(Delayed)',
    routeCorridor: 'Corridor:',
    routeBypassDesc: 'Bypasses active Sonapur mudslide and tunnel closures safely.',
    routeAWarning: 'Severe delays and active rockfall warnings near Sonapur Tunnel.',
    routeModAdvisory: 'Moderate Advisory',
    routeWeatherWarning: 'Weather Warning',
    routeCorridorStatus: 'Corridor Status',
    routeStatusPatrolled: 'Open and patrolled by state highway teams',
    routeRoadBlockage: 'Road Blockage',
    routeBlockageDesc: 'Total closure at Sonapur Tunnel landslide zone',
    routeComparisonTitle: 'Regional Highway Route Comparison',
    routeAIndicator: 'Route A (Blocked)',
    routeBIndicator: 'Route B (Recommended)',

    cargoTitle: 'Freight & Cargo Tracking',
    cargoSubtitle: 'Live tracking of essential commodities, medical supplies, and relief loads.',
    cargoNewBtn: 'New Freight Consignment',
    cargoActiveLoads: 'ACTIVE LOADS',
    cargoCriticalCargo: 'CRITICAL CARGO',
    cargoDelayedRoadblocks: 'DELAYED BY ROADBLOCKS',
    cargoOnTimeDelivery: 'ON-TIME DELIVERY',
    cargoSearchPlaceholder: 'Search by manifest #, commodity, driver...',
    cargoAllStatuses: 'All Freight Statuses',
    cargoHighPriority: 'HIGH PRIORITY',
    cargoNormalPriority: 'NORMAL PRIORITY',
    cargoInTransit: 'IN TRANSIT',
    cargoDelayed: 'DELAYED',
    cargoDelivered: 'DELIVERED',
    cargoEtaLabel: 'ESTIMATED TIME OF ARRIVAL',
    cargoArrivingIn: 'Arriving in',
    cargoTrackOnMap: 'Track on Map',
    cargoRerouteFreight: 'Reroute Freight',
    cargoTrackRoute: 'Track Route',
    cargoViewManifest: 'View Manifest',
    cargoDeliveryConfirmation: 'Delivery Confirmation',

    fleetTitle: 'Fleet & Vehicle Tracking',
    fleetSubtitle: 'Live fleet tracking across NH-6, NH-27, and NH-44 corridors.',
    fleetAddBtn: 'Add New Vehicle',
    fleetTotal: 'TOTAL FLEET',
    fleetOnRoad: 'ON THE ROAD',
    fleetDelayedHalted: 'DELAYED / HALTED',
    fleetAtDepot: 'AT DEPOT / IDLE',
    fleetSearchPlaceholder: 'Search by license plate, driver name, vehicle model, or location...',
    fleetStatusMoving: 'MOVING',
    fleetStatusDelayed: 'DELAYED',
    fleetStatusIdle: 'IDLE',
    fleetFuel: 'Fuel',
    fleetRoute: 'Route:',
    fleetDriver: 'Driver:',
    fleetTrackOnMap: 'Track on Map',
    fleetCallDriver: 'Call Driver',
    fleetRerouteVehicle: 'Reroute Vehicle',

    incidentsTitle: 'Active Road Disruptions & Hazard Feed',
    incidentsSubtitle: 'Verified hazard reports from BRO field units, state disaster authorities, and local police control rooms.',
    incidentsReportBtn: 'Report New Incident',
    incidentsSearchPlaceholder: 'Filter by corridor, landmark, or district...',
    incidentsAllSeverities: 'All Severities',
    incidentsAllTypes: 'All Hazard Types',
    incidentsCalculateDetour: 'Calculate Detour',
    incidentsViewAdvisory: 'View Advisory',
    incidentsDetailsTitle: 'Incident Details:',
    incidentsCorridorLandmark: 'Corridor / Landmark:',
    incidentsDistrictState: 'District / State:',
    incidentsReportingSource: 'Reporting Source:',
    incidentsGpsCoords: 'GPS Coordinates:',
    incidentsEstimatedClearance: 'Estimated Clearance:',

    fieldTitle: 'Field Reporting & Road Disruption Logging',
    fieldSubtitle: 'Mobile field responders and traffic outposts can log verified hazards, capture GPS coordinates, and submit photo telemetry.',
    fieldUseLocationBtn: 'Use Current Location',
    fieldStateLabel: 'State / Territory',
    fieldDistrictLabel: 'District Sector',
    fieldCorridorLabel: 'Corridor / Landmark Name',
    fieldCorridorPlaceholder: 'e.g. NH-6 KM 48 near Sonapur Pass',
    fieldHazardCatLabel: 'Hazard Category',
    fieldPassageStatusLabel: 'Road Passage Status',
    fieldEstDelayLabel: 'Estimated Disruption Delay',
    fieldLatLabel: 'Latitude (°N)',
    fieldLngLabel: 'Longitude (°E)',
    fieldObservationsLabel: 'Field Observations & Damage Telemetry',
    fieldObservationsPlaceholder: 'Describe road condition, width of debris flow, vehicles backed up, and emergency services active on site...',
    fieldPhotoLabel: 'Photographic Telemetry / Image Proof',
    fieldSubmitReport: 'Submit Incident Report',
    fieldPublishDeclaration: 'Publish Official Declaration',
    fieldSubmitVerification: 'Submit for Verification',

    queueTitle: 'Incident Verification Queue',
    queueSubtitle: 'Citizen & Field Submissions Pending Official Authorization',
    queueTabPending: 'Pending Verification',
    queueTabVerified: 'Verified & Broadcast',
    queueTabRejected: 'Dismissed / Inactive',
    queueReviewBtn: 'Review & Authorize',
    queueVerifyAction: 'Verify & Broadcast Road Status',
    queueDismissAction: 'Dismiss Report',

    alertsTitle: 'Operational Alerts & Broadcasts',
    alertsSubtitle: 'Real-time warnings, emergency notifications, and road blockage dispatches.',
    alertsMarkAllRead: 'Mark all as read',
    alertsStatusAction: 'Status: Action Required',
    alertsRerouteConvoys: 'Reroute Convoys',
    alertsMarkHandled: 'Mark Handled',
    alertsCheckVanTemp: 'Check Van Temp',

    settingsTitle: 'Account Settings & Profile',
    settingsSubtitle: 'Manage operational role, contact details, and notification thresholds.',
    settingsAssignedSectors: 'Assigned Regional Sectors:',
    settingsSwitchTitle: 'SWITCH OPERATIONAL PROFILE / ROLE',
    settingsSwitchSubtitle: 'Switch profile to test role-based permissions, incident management, and dispatch views.',
    settingsContactTitle: 'PERSONAL CONTACT & PREFERENCES',
    settingsFullName: 'Full Official Name',
    settingsOfficialEmail: 'Official Email Address',
    settingsSectorPost: 'Operational Sector / Post',
    settingsRadioChannel: 'Emergency Radio Channel',
    settingsSaveBtn: 'Save Profile Changes',

    statusBlocked: 'BLOCKED',
    statusRestricted: 'RESTRICTED',
    statusPassable: 'PASSABLE',
    statusMoving: 'MOVING',
    statusDelayedTag: 'DELAYED',
    statusIdle: 'IDLE',
  },

  // 2. ASSAMESE (অসমীয়া)
  as: {
    navPublicSafetyTitle: 'ৰাজহুৱা সুৰক্ষা আৰু পথৰ অৱস্থা',
    navPublicActionsTitle: 'ৰাজহুৱা পদক্ষেপ আৰু সতৰ্কবাৰ্তা',
    navCorridorOversightTitle: 'কৰিডৰ নিৰীক্ষণ',
    navIncidentCommandTitle: 'দুৰ্ঘটনা নিয়ন্ত্ৰণ আৰু পৰীক্ষণ',
    navOperationsTitle: 'কাৰ্যপ্ৰণালী',
    navLogisticsDetoursTitle: 'পৰিবহণ আৰু বিকল্প পথ',
    navHazardsSafetyTitle: 'বিপদ আৰু নিৰাপত্তা',
    navFleetOperationsDashboard: 'ফ্লিট অপাৰেচন ডেশ্ববৰ্ড',
    navOperationsDashboard: 'কাৰ্যকৰী ডেশ্ববৰ্ড',
    navLiveFleetMap: 'লাইভ ফ্লিট মানচিত্ৰ',
    navLiveHighwayMap: 'লাইভ ঘাইপথ মানচিত্ৰ',
    navWeatherRiskRadar: 'বতৰ আৰু বিপদ ৰাডাৰ',
    navWeatherRainAlerts: 'বতৰ আৰু বৰষুণৰ সতৰ্কবাৰ্তা',
    navRoutePlanningDetour: 'পথ পৰিকল্পনা / বিকল্প পথ',
    navCargoShipments: 'কাৰ্গো আৰু সামগ্ৰী',
    navFleetTracking: 'ফ্লিট নিৰীক্ষণ',
    navActiveHazardsFeed: 'সক্ৰিয় বিপদৰ তালিকা',
    navActiveIncidentsFeed: 'সক্ৰিয় ঘটনাৰ তালিকা',
    navIncidentVerificationQueue: 'দুৰ্ঘটনা পৰীক্ষণ তালিকা',
    navIncidentManagement: 'দুৰ্ঘটনা ব্যৱস্থাপনা',
    navOfficialRoadblockLogging: 'চৰকাৰী পথ বন্ধ পঞ্জীয়ন',
    navReportRoadHazard: 'পথৰ বিপদৰ প্ৰতিবেদন দিয়ক',
    navReportIncidentHazard: 'দুৰ্ঘটনা / বিপদৰ প্ৰতিবেদন',
    navEmergencyAlerts: 'জৰুৰী সতৰ্কবাৰ্তা',
    navEmergencyAlertsBroadcasts: 'জৰুৰী সতৰ্কবাৰ্তা আৰু সম্প্ৰচাৰ',
    navSettings: 'ছেটিংছ',
    navLogOut: 'লগ আউট',

    topFleetDashboard: 'ফ্লিট ডেশ্ববৰ্ড',
    topFleetMap: 'ফ্লিট মানচিত্ৰ',
    topRoutePlanning: 'পথ পৰিকল্পনা',
    topCargoShipments: 'কাৰ্গো আৰু সামগ্ৰী',
    topOperationsDashboard: 'অপাৰেচন ডেশ্ববৰ্ড',
    topLiveHighwayMap: 'লাইভ ঘাইপথ মানচিত্ৰ',
    topVerificationQueue: 'পৰীক্ষণ তালিকা',
    topActiveIncidents: 'সক্ৰিয় ঘটনা',
    topWeatherAlerts: 'বতৰৰ সতৰ্কবাৰ্তা',
    operatorRoleLogistics: 'লজিষ্টিকছ আৰু ফ্লিট অপাৰেটৰ',
    operatorRoleAuthority: 'চৰকাৰী কৰ্তৃপক্ষ',
    operatorRolePublic: 'নাগৰিক যাত্ৰী',

    dashBannerTitle: 'আঞ্চলিক কৰিডৰ অপাৰেচন',
    dashMonsoonAdvisory: 'মৌচুমী সতৰ্কবাৰ্তা সক্ৰিয়',
    dashCorridorSub: 'প্ৰধান পথসমূহ: এনএইচ-৬, এনএইচ-৪০ আৰু এনএইচ-২৭ (অসম – মেঘালয় কৰিডৰ)',
    dashPlanRouteBtn: 'পথ পৰিকল্পনা / বিকল্প পথ',
    dashClearanceTitle: 'পথ নেটৱৰ্ক মুকলি',
    dashRestrictedMovement: 'সীমাবদ্ধ চলাচল',
    dashPassable: 'চলাচলযোগ্য',
    dashClearanceNote: 'পূব জয়ন্তীয়া পাহাৰত অবিৰাম বৰষুণৰ বাবে ৪% হ্ৰাস',
    dashActiveBlockages: 'সক্ৰিয় পথ অৱৰোধ',
    dashTotalClosure: 'সম্পূৰ্ণ বন্ধ',
    dash2Critical: '২টা গুৰুতৰ',
    dashSingleLaneOpen: '৩টা স্থানত এটা লেন খোলা',
    dashViewBlockages: 'অৱৰোধসমূহ চাওক →',
    dashActiveFleet: 'পথত থকা সক্ৰিয় বাহন',
    dashEnRoute: 'পথত থকা',
    dashVehiclesMoving: 'বাহন চলাচল কৰিছে',
    dashDispatchedCount: '(৬খন প্ৰেৰিত বাহনৰ ভিতৰত)',
    dashFleetDiversionNote: 'শ্বিলং বাইপাছৰ ওচৰত ১খন বাহনক বিকল্প পথ ল’বলৈ পৰামৰ্শ দিয়া হৈছে',
    dashTrackVehicles: 'বাহনসমূহ নিৰীক্ষণ কৰক →',
    dashLandslideAlert: 'ভূমিস্খলনৰ বিপদ সতৰ্কবাৰ্তা',
    dashHighVulnerability: 'অতি সংবেদনশীল',
    dashHighRiskLevel: 'উচ্চ আশংকা (স্তৰ ৩)',
    dashRainBeltSaturated: 'বিগত ২৪ ঘণ্টাত ১৮৪ মিমি বৰষুণ • মৌচিনৰাম-চেৰাপুঞ্জী বলয় সম্পূৰ্ণ সম্পৃক্ত',
    dashWeatherRadar: 'বতৰ ৰাডাৰ →',
    dashLiveHighwayMap: 'লাইভ আঞ্চলিক ঘাইপথ মানচিত্ৰ',
    dashAllCorridors: 'সকলো কৰিডৰ',
    dashLayers: 'স্তৰসমূহ',
    dashActiveIncidentsTitle: 'সক্ৰিয় পথৰ দুৰ্ঘটনা আৰু বিপদসমূহ',
    dashViewAll: 'সকলো চাওক',
    dashViewOnMap: 'মানচিত্ৰত চাওক',
    dashFindDetour: 'বিকল্প পথ সন্ধান কৰক',

    mapFilter: 'ফিল্টাৰ:',
    mapStatusBlocked: 'স্থিতি: বন্ধ',
    mapStatusRestricted: 'স্থিতি: সীমিত',
    mapStatusAll: 'সকলো স্থিতি',
    mapReset: 'পূৰ্বৰ অৱস্থালৈ আনক',
    mapLegendOpen: 'মুকলি / সুগম',
    mapLegendPartial: 'আংশিক বিঘ্নিত',
    mapLegendBlocked: 'অৱৰুদ্ধ',
    mapCardActiveHazards: '৭টা সক্ৰিয় পথৰ বিপদ',
    mapCardHazardsSub: 'সোনাপুৰ ভূমিস্খলন আৰু নিম্নভূমিৰ বান',
    mapCardViewHazards: 'বিপদসমূহ চাওক →',
    mapCardActiveTrucks: '৫খন সক্ৰিয় যোগান ট্ৰাক',
    mapCardTrucksSub: 'সকলো বাহন জিপিএছৰে সংযোজিত',
    mapCardTrackFleet: 'ফ্লিট ট্ৰেক কৰক →',
    mapCardCalcDetour: 'সুৰক্ষিত বিকল্প পথ গণনা কৰক',
    mapCardDetourSub: 'সক্ৰিয় অৱৰোধ আৰু বান অঞ্চল এৰাই চলক',
    mapCardPlanRoute: 'পথ পৰিকল্পনা কৰক →',

    weatherTitle: 'আঞ্চলিক বতৰৰ পূৰ্বাভাস আৰু ভূমিস্খলনৰ আশংকা নিৰীক্ষণ',
    weatherSubtitle: 'মেঘালয় আৰু অসমৰ বাস্তৱ সময়ৰ ৰাডাৰ চিত্ৰ আৰু আইএমডি বৰষুণৰ নিৰীক্ষণ',
    weatherHighRain: 'প্ৰচুৰ বৰষুণ',
    weatherModerateRain: 'মধ্যমীয়া বৰষুণ',
    weatherLowRisk: 'কম আশংকা',
    weatherHeavyRainMist: 'প্ৰৱল বৰষুণ আৰু পাহাৰীয়া কুঁৱলী',
    weatherHumidClouds: 'আৰ্দ্ৰ আৰু মেঘাচ্ছন্ন',
    weatherMonsoonDownpours: 'মৌচুমী বৰষুণ',
    weatherOvercastMist: 'মেঘাচ্ছন্ন আৰু পাহাৰীয়া কুঁৱলী',
    weatherRain: 'বৰষুণ',
    weatherWind: 'বতাহ',
    weatherSaturationTitle: 'পাহাৰীয়া মাটিৰ তিতি থকা অৱস্থা আৰু ভূমিস্খলনৰ সম্ভাৱনা',
    weatherLastUpdated: 'শেহতীয়া আপডেট: ৫ মিনিট পূৰ্বে (আইএমডি ৰাডাৰ চিন্ক)',
    weatherRiskCritical: 'সংকটজনক',
    weatherRiskHigh: 'উচ্চ',
    weatherRiskLow: 'কম',
    weatherRiskModerate: 'মধ্যমীয়া',

    routeOptTitle: 'সৰ্বোত্তম পথৰ পৰামৰ্শ',
    routeVerifiedBadge: 'ৰুট খ সত্যায়িত',
    routeRecalcBtn: 'পথসমূহ পুনৰ গণনা কৰক',
    routeOptDesc: 'এনএইচ-৬ সোনাপুৰ সুৰংগৰ সক্ৰিয় শিল খহি পৰা আৰু আকস্মিক বান অঞ্চল এৰাই চলিবলৈ ৰুট খ পৰামৰ্শ দিয়া হৈছে।',
    routeSaferBypass: 'নিৰাপদ বাইপাছ (ৰুট খ)',
    routeRecommended: 'পৰামৰ্শযোগ্য',
    routeDirectHighway: 'পোনপটীয়া ঘাইপথ (ৰুট ক)',
    routeHighRiskBadge: 'উচ্চ আশংকা – ২টি সক্ৰিয় ঘটনাৰ প্ৰতিবেদন',
    routeTotalDistance: 'মুঠ দূৰত্ব',
    routeEstTravelTime: 'আনুমানিক ভ্ৰমণ সময়',
    routeDelayed: '(বিলম্বিত)',
    routeCorridor: 'কৰিডৰ:',
    routeBypassDesc: 'সক্ৰিয় সোনাপুৰ বোকা খহনীয়া আৰু সুৰংগ বন্ধ নিৰাপদে এৰাই চলে।',
    routeAWarning: 'সোনাপুৰ সুৰংগৰ ওচৰত গুৰুতৰ পলম আৰু সক্ৰিয় শিল খহি পৰাৰ সতৰ্কবাৰ্তা।',
    routeModAdvisory: 'মধ্যমীয়া পৰামৰ্শ',
    routeWeatherWarning: 'বতৰৰ সতৰ্কবাৰ্তা',
    routeCorridorStatus: 'কৰিডৰৰ অৱস্থা',
    routeStatusPatrolled: 'মুকলি আৰু ৰাজ্যিক ঘাইপথ দলৰ দ্বাৰা নিৰীক্ষিত',
    routeRoadBlockage: 'পথ অৱৰোধ',
    routeBlockageDesc: 'সোনাপুৰ সুৰংগ ভূমিস্খলন অঞ্চলত সম্পূৰ্ণ বন্ধ',
    routeComparisonTitle: 'আঞ্চলিক ঘাইপথৰ তুলনা',
    routeAIndicator: 'ৰুট ক (অৱৰুদ্ধ)',
    routeBIndicator: 'ৰুট খ (পৰামৰ্শযোগ্য)',

    cargoTitle: 'মালবাহী আৰু কাৰ্গো নিৰীক্ষণ',
    cargoSubtitle: 'জৰুৰী সামগ্ৰী, চিকিৎসা সঁজুলি আৰু সাহায্য যোগানৰ বাস্তৱ সময়ৰ নিৰীক্ষণ।',
    cargoNewBtn: 'নতুন মালবাহী চালান',
    cargoActiveLoads: 'সক্ৰিয় চালান',
    cargoCriticalCargo: 'গুৰুত্বপূৰ্ণ কাৰ্গো',
    cargoDelayedRoadblocks: 'পথ অৱৰোধৰ বাবে পলম',
    cargoOnTimeDelivery: 'সময়মতে বিতৰণ',
    cargoSearchPlaceholder: 'মেনিফেষ্ট নম্বৰ, সামগ্ৰী, চালকৰ নাম বিচাৰক...',
    cargoAllStatuses: 'সকলো মালবাহী স্থিতি',
    cargoHighPriority: 'উচ্চ অগ্ৰাধিকাৰ',
    cargoNormalPriority: 'সাধাৰণ অগ্ৰাধিকাৰ',
    cargoInTransit: 'পথত থকা',
    cargoDelayed: 'বিলম্বিত',
    cargoDelivered: 'বিতৰিত',
    cargoEtaLabel: 'আনুমানিক আগমনৰ সময়',
    cargoArrivingIn: 'আগমনৰ সময়',
    cargoTrackOnMap: 'মানচিত্ৰত চাওক',
    cargoRerouteFreight: 'বিকল্প পথত পঠিয়াওক',
    cargoTrackRoute: 'পথ নিৰীক্ষণ কৰক',
    cargoViewManifest: 'মেনিফেষ্ট চাওক',
    cargoDeliveryConfirmation: 'বিতৰণ নিশ্চিতকৰণ',

    fleetTitle: 'ফ্লিট আৰু বাহন নিৰীক্ষণ',
    fleetSubtitle: 'এনএইচ-৬, এনএইচ-২৭ আৰু এনএইচ-৪৪ কৰিডৰত বাস্তৱ সময়ৰ ফ্লিট নিৰীক্ষণ।',
    fleetAddBtn: 'নতুন বাহন যোগ কৰক',
    fleetTotal: 'মুঠ বাহন',
    fleetOnRoad: 'পথত থকা বাহন',
    fleetDelayedHalted: 'পলম / আবদ্ধ',
    fleetAtDepot: 'ডিপোত / স্থিৰ',
    fleetSearchPlaceholder: 'নম্বৰ প্লেট, চালকৰ নাম, বাহনৰ মডেল বা স্থান বিচাৰক...',
    fleetStatusMoving: 'সচল',
    fleetStatusDelayed: 'বিলম্বিত',
    fleetStatusIdle: 'স্থিৰ',
    fleetFuel: 'ইন্ধন',
    fleetRoute: 'পথ:',
    fleetDriver: 'চালক:',
    fleetTrackOnMap: 'মানচিত্ৰত চাওক',
    fleetCallDriver: 'চালকক কল কৰক',
    fleetRerouteVehicle: 'বাহন পুনৰ দিশনিৰ্দেশ কৰক',

    incidentsTitle: 'সক্ৰিয় পথ বিঘিনি আৰু বিপদসমূহ',
    incidentsSubtitle: 'বিআৰঅ’ ফিল্ড ইউনিট, ৰাজ্যিক দুৰ্যোগ কৰ্তৃপক্ষ আৰু আৰক্ষী নিয়ন্ত্ৰণ কক্ষৰ সত্যায়িত বিপদৰ প্ৰতিবেদন।',
    incidentsReportBtn: 'নতুন ঘটনাৰ প্ৰতিবেদন দিয়ক',
    incidentsSearchPlaceholder: 'কৰিডৰ, স্থান বা জিলা অনুসৰি ফিল্টাৰ কৰক...',
    incidentsAllSeverities: 'সকলো গুৰুত্ব',
    incidentsAllTypes: 'সকলো বিপদৰ প্ৰকাৰ',
    incidentsCalculateDetour: 'বিকল্প পথ নিৰ্ধাৰণ কৰক',
    incidentsViewAdvisory: 'পৰামৰ্শ চাওক',
    incidentsDetailsTitle: 'ঘটনাৰ সবিশেষ:',
    incidentsCorridorLandmark: 'কৰিডৰ / স্থান:',
    incidentsDistrictState: 'জিলা / ৰাজ্য:',
    incidentsReportingSource: 'প্ৰতিবেদনৰ উৎস:',
    incidentsGpsCoords: 'জিপিএছ স্থানাংক:',
    incidentsEstimatedClearance: 'আনুমানিক মুকলিৰ সময়:',

    fieldTitle: 'ফিল্ড প্ৰতিবেদন আৰু পথ অৱৰোধ পঞ্জীয়ন',
    fieldSubtitle: 'ফিল্ড কৰ্মী আৰু ট্ৰেফিক আউটপোষ্টে সত্যায়িত বিপদ পঞ্জীয়ন, জিপিএছ সংগ্ৰহ আৰু ফটো দাখিল কৰিব পাৰে।',
    fieldUseLocationBtn: 'বৰ্তমান স্থান ব্যৱহাৰ কৰক',
    fieldStateLabel: 'ৰাজ্য / কেন্দ্ৰীয় শাসিত অঞ্চল',
    fieldDistrictLabel: 'জিলা খণ্ড',
    fieldCorridorLabel: 'কৰিডৰ / স্থানৰ নাম',
    fieldCorridorPlaceholder: 'উদাহৰণ: এনএইচ-৬ সোনাপুৰ সুৰংগৰ ওচৰত',
    fieldHazardCatLabel: 'বিপদৰ শ্ৰেণী',
    fieldPassageStatusLabel: 'পথ চলাচলৰ অৱস্থা',
    fieldEstDelayLabel: 'আনুমানিক বিলম্ব',
    fieldLatLabel: 'অক্ষংশ (°N)',
    fieldLngLabel: 'দ্ৰাঘিমাংশ (°E)',
    fieldObservationsLabel: 'ক্ষেত্ৰ পৰ্যবেক্ষণ আৰু ক্ষতিৰ বিৱৰণ',
    fieldObservationsPlaceholder: 'পথৰ অৱস্থা, ধ্বংসাৱশেষৰ বিস্তাৰ, বাহনৰ ভিৰ আৰু সক্ৰিয় সাহায্য সেৱাৰ বিৱৰণ দিয়ক...',
    fieldPhotoLabel: 'ফটোগ্ৰাফিক প্ৰমাণ / ছবি',
    fieldSubmitReport: 'ঘটনাৰ প্ৰতিবেদন দাখিল কৰক',
    fieldPublishDeclaration: 'আনুষ্ঠানিক ঘোষণা প্ৰকাশ কৰক',
    fieldSubmitVerification: 'পৰীক্ষণৰ বাবে জমা দিয়ক',

    queueTitle: 'দুৰ্ঘটনা পৰীক্ষণ তালিকা',
    queueSubtitle: 'আনুষ্ঠানিক অনুমোদনৰ অপেক্ষাত থকা নাগৰিক আৰু ফিল্ড দাখিল',
    queueTabPending: 'পৰীক্ষণৰ অপেক্ষাত',
    queueTabVerified: 'সত্যায়িত আৰু সম্প্ৰচাৰিত',
    queueTabRejected: 'প্ৰত্যাখ্যাত / নিষ্ক্ৰিয়',
    queueReviewBtn: 'পৰ্যালোচনা আৰু সত্যায়িত কৰক',
    queueVerifyAction: 'সত্যায়িত কৰক আৰু পথৰ স্থিতি সম্প্ৰচাৰ কৰক',
    queueDismissAction: 'প্ৰতিবেদন নাকচ কৰক',

    alertsTitle: 'কাৰ্যকৰী সতৰ্কবাৰ্তা আৰু সম্প্ৰচাৰ',
    alertsSubtitle: 'বাস্তৱ সময়ৰ সতৰ্কবাৰ্তা, জৰুৰীকালীন জাননী আৰু পথ অৱৰোধৰ তথ্য।',
    alertsMarkAllRead: 'সকলো পঢ়া বুলি চিহ্নিত কৰক',
    alertsStatusAction: 'স্থিতি: পদক্ষেপ প্ৰয়োজনীয়',
    alertsRerouteConvoys: 'কনভয়ৰ দিশ সলনি কৰক',
    alertsMarkHandled: 'নিষ্পত্তি বুলি চিহ্নিত কৰক',
    alertsCheckVanTemp: 'ভানৰ উষ্ণতা পৰীক্ষা কৰক',

    settingsTitle: 'একাউণ্ট ছেটিংছ আৰু প্ৰফাইল',
    settingsSubtitle: 'কাৰ্যকৰী ভূমিকা, যোগাযোগৰ বিৱৰণ আৰু জাননীৰ সীমা ব্যৱস্থাপনা কৰক।',
    settingsAssignedSectors: 'নিৰ্ধাৰিত আঞ্চলিক খণ্ডসমূহ:',
    settingsSwitchTitle: 'কাৰ্যকৰী প্ৰফাইল / ভূমিকা সলনি কৰক',
    settingsSwitchSubtitle: 'ভূমিকা-ভিত্তিক অনুমতি, ঘটনা ব্যৱস্থাপনা আৰু প্ৰেৰণ পৰীক্ষা কৰিবলৈ প্ৰফাইল সলনি কৰক।',
    settingsContactTitle: 'ব্যক্তিগত যোগাযোগ আৰু পছন্দ',
    settingsFullName: 'সম্পূৰ্ণ চৰকাৰী নাম',
    settingsOfficialEmail: 'চৰকাৰী ইমেইল ঠিকনা',
    settingsSectorPost: 'কাৰ্যকৰী খণ্ড / পদবী',
    settingsRadioChannel: 'জৰুৰীকালীন ৰেডিঅ’ চেনেল',
    settingsSaveBtn: 'প্ৰফাইল পৰিৱৰ্তন সংৰক্ষণ কৰক',

    statusBlocked: 'বন্ধ',
    statusRestricted: 'সীমিত',
    statusPassable: 'চলাচলযোগ্য',
    statusMoving: 'সচল',
    statusDelayedTag: 'বিলম্বিত',
    statusIdle: 'স্থিৰ',
  },

  // 3. BENGALI (বাংলা)
  bn: {
    navPublicSafetyTitle: 'জননিরাপত্তা ও রাস্তার অবস্থা',
    navPublicActionsTitle: 'জনসাধারণের পদক্ষেপ ও সতর্কতা',
    navCorridorOversightTitle: 'করিডোর পর্যবেক্ষণ',
    navIncidentCommandTitle: 'ঘটনা নিয়ন্ত্রণ ও যাচাইকরণ',
    navOperationsTitle: 'কার্যক্রম',
    navLogisticsDetoursTitle: 'লজিস্টিকস ও বিকল্প রুট',
    navHazardsSafetyTitle: 'বিপদ ও নিরাপত্তা',
    navFleetOperationsDashboard: 'ফ্লিট অপারেশনস ড্যাশবোর্ড',
    navOperationsDashboard: 'অপারেশনস ড্যাশবোর্ড',
    navLiveFleetMap: 'লাইভ ফ্লিট মানচিত্র',
    navLiveHighwayMap: 'লাইভ হাইওয়ে মানচিত্র',
    navWeatherRiskRadar: 'আবহাওয়া ও ঝুঁকি রাডার',
    navWeatherRainAlerts: 'আবহাওয়া ও বৃষ্টির সতর্কতা',
    navRoutePlanningDetour: 'রুট পরিকল্পনা / বিকল্প',
    navCargoShipments: 'কার্গো ও চালান',
    navFleetTracking: 'ফ্লিট ট্র্যাকিং',
    navActiveHazardsFeed: 'সক্রিয় বিপদের ফিড',
    navActiveIncidentsFeed: 'সক্রিয় ঘটনার ফিড',
    navIncidentVerificationQueue: 'ঘটনা যাচাই সারি',
    navIncidentManagement: 'ঘটনা ব্যবস্থাপনা',
    navOfficialRoadblockLogging: 'অফিসিয়াল রাস্তা বন্ধ লগিং',
    navReportRoadHazard: 'রাস্তার বিপদের রিপোর্ট করুন',
    navReportIncidentHazard: 'ঘটনা / বিপদের রিপোর্ট',
    navEmergencyAlerts: 'জরুরি সতর্কতা',
    navEmergencyAlertsBroadcasts: 'জরুরি সতর্কতা ও সম্প্রচার',
    navSettings: 'সেটিংস',
    navLogOut: 'লগ আউট',

    topFleetDashboard: 'ফ্লিট ড্যাশবোর্ড',
    topFleetMap: 'ফ্লিট মানচিত্র',
    topRoutePlanning: 'রুট পরিকল্পনা',
    topCargoShipments: 'কার্গো ও চালান',
    topOperationsDashboard: 'অপারেশনস ড্যাশবোর্ড',
    topLiveHighwayMap: 'লাইভ হাইওয়ে মানচিত্র',
    topVerificationQueue: 'যাচাই সারি',
    topActiveIncidents: 'সক্রিয় ঘটনা',
    topWeatherAlerts: 'আবহাওয়া সতর্কতা',
    operatorRoleLogistics: 'লজিস্টিকস ও ফ্লিট অপারেটর',
    operatorRoleAuthority: 'সরকারি কর্তৃপক্ষ',
    operatorRolePublic: 'সাধারণ যাত্রী',

    dashBannerTitle: 'আঞ্চলিক করিডোর অপারেশনস',
    dashMonsoonAdvisory: 'বর্ষা সতর্কতা সক্রিয়',
    dashCorridorSub: 'প্রধান রুটসমূহ: এনএইচ-৬, এনএইচ-৪০ ও এনএইচ-২৭ (আসাম – মেঘালয় করিডোর)',
    dashPlanRouteBtn: 'রুট পরিকল্পনা / বিকল্প',
    dashClearanceTitle: 'সড়ক নেটওয়ার্ক ছাড়পত্র',
    dashRestrictedMovement: 'সীমিত চলাচল',
    dashPassable: 'চলাচলযোগ্য',
    dashClearanceNote: 'পূর্ব জয়ন্তিয়া পাহাড়ে অবিরাম বৃষ্টির কারণে ৪% হ্রাস',
    dashActiveBlockages: 'সক্রিয় অবরোধ',
    dashTotalClosure: 'সম্পূর্ণ বন্ধ',
    dash2Critical: '২টি সংকটজনক',
    dashSingleLaneOpen: '৩টি স্থানে একটি লেন খোলা',
    dashViewBlockages: 'অবরোধ দেখুন →',
    dashActiveFleet: 'রুটে সক্রিয় ফ্লিট',
    dashEnRoute: 'পথিমধ্যে',
    dashVehiclesMoving: 'যানবাহন সচল',
    dashDispatchedCount: '(৬টি প্রেরিত বাহনের মধ্যে)',
    dashFleetDiversionNote: 'শিলং বাইপাসের কাছে ১টি গাড়িকে ঘুরিয়ে চলার পরামর্শ দেওয়া হয়েছে',
    dashTrackVehicles: 'যানবাহন ট্র্যাক করুন →',
    dashLandslideAlert: 'ভূমিধস ঝুঁকি সতর্কতা',
    dashHighVulnerability: 'উচ্চ ঝুঁকিপ্রবণ',
    dashHighRiskLevel: 'উচ্চ ঝুঁকি (লেভেল ৩)',
    dashRainBeltSaturated: 'বিগত ২৪ ঘণ্টায় ১৮৪ মিমি বৃষ্টি • মৌসিনরাম-চেরাপুঞ্জি বলয় সম্পূর্ণ সম্পৃক্ত',
    dashWeatherRadar: 'আবহাওয়া রাডার →',
    dashLiveHighwayMap: 'লাইভ আঞ্চলিক মহাসড়ক মানচিত্র',
    dashAllCorridors: 'সকল করিডোর',
    dashLayers: 'লেয়ার',
    dashActiveIncidentsTitle: 'সক্রিয় সড়ক ঘটনা ও বিপদসমূহ',
    dashViewAll: 'সব দেখুন',
    dashViewOnMap: 'মানচিত্রে দেখুন',
    dashFindDetour: 'বিকল্প রুট খুঁজুন',

    mapFilter: 'ফিল্টার:',
    mapStatusBlocked: 'স্থিতি: বন্ধ',
    mapStatusRestricted: 'স্থিতি: সীমিত',
    mapStatusAll: 'সকল স্থিতি',
    mapReset: 'রিসেট',
    mapLegendOpen: 'উন্মুক্ত / পরিষ্কার',
    mapLegendPartial: 'আংশিক বিঘ্নিত',
    mapLegendBlocked: 'অবরুদ্ধ',
    mapCardActiveHazards: '৭টি সক্রিয় সড়ক বিপদ',
    mapCardHazardsSub: 'সোনাপুর ভূমিধস ও নিচু এলাকার বন্যা',
    mapCardViewHazards: 'বিপদ দেখুন →',
    mapCardActiveTrucks: '৫টি সক্রিয় সরবরাহ ট্রাক',
    mapCardTrucksSub: 'সকল যান জিপিএস সংযুক্ত',
    mapCardTrackFleet: 'ফ্লিট ট্র্যাক করুন →',
    mapCardCalcDetour: 'নিরাপদ বিকল্প রুট হিসাব করুন',
    mapCardDetourSub: 'সক্রিয় অবরোধ ও বন্যা এলাকা এড়ান',
    mapCardPlanRoute: 'রুট পরিকল্পনা →',

    weatherTitle: 'আঞ্চলিক আবহাওয়ার পূর্বাভাস ও ভূমিধস ঝুঁকি পর্যবেক্ষণ',
    weatherSubtitle: 'মেঘালয় ও আসাম জুড়ে রিয়েল-টাইম রাডার চিত্র ও আইএমডি বৃষ্টিপাত পর্যবেক্ষণ',
    weatherHighRain: 'ভারী বৃষ্টি',
    weatherModerateRain: 'মাঝারি বৃষ্টি',
    weatherLowRisk: 'কম ঝুঁকি',
    weatherHeavyRainMist: 'ভারী বৃষ্টি ও পাহাড়ি কুয়াশা',
    weatherHumidClouds: 'আর্দ্র ও মেঘলা',
    weatherMonsoonDownpours: 'মৌসুমি বর্ষণ',
    weatherOvercastMist: 'মেঘলা আকাশ ও কুয়াশা',
    weatherRain: 'বৃষ্টি',
    weatherWind: 'বাতাস',
    weatherSaturationTitle: 'মাটির সম্পৃক্ততা ও ভূমিধস প্রবণতা',
    weatherLastUpdated: 'সর্বশেষ আপডেট: ৫ মিনিট আগে (আইএমডি রাডার সিঙ্ক)',
    weatherRiskCritical: 'সংকটজনক',
    weatherRiskHigh: 'উচ্চ',
    weatherRiskLow: 'কম',
    weatherRiskModerate: 'মাঝারি',

    routeOptTitle: 'সর্বোত্তম রুট সুপারিশ',
    routeVerifiedBadge: 'রুট বি যাচাইকৃত',
    routeRecalcBtn: 'রুট পুনঃগণনা করুন',
    routeOptDesc: 'এনএইচ-৬ সোনাপুর টানেলের সক্রিয় শিলাপতন ও বন্যা এড়াতে রুট বি সুপারিশ করা হয়েছে।',
    routeSaferBypass: 'নিরাপদ বাইপাস (রুট বি)',
    routeRecommended: 'সুপারিশকৃত',
    routeDirectHighway: 'সরাসরি হাইওয়ে (রুট এ)',
    routeHighRiskBadge: 'উচ্চ ঝুঁকি – ২টি সক্রিয় ঘটনার রিপোর্ট',
    routeTotalDistance: 'মোট দূরত্ব',
    routeEstTravelTime: 'আনুমানিক ভ্রমণ সময়',
    routeDelayed: '(বিলম্বিত)',
    routeCorridor: 'করিডোর:',
    routeBypassDesc: 'সোনাপুর কাদা ধস ও টানেল বন্ধ নিরাপদে এড়িয়ে যায়।',
    routeAWarning: 'সোনাপুর টানেলের কাছে তীব্র বিলম্ব ও সক্রিয় শিলাপতনের সতর্কতা।',
    routeModAdvisory: 'মাঝারি পরামর্শ',
    routeWeatherWarning: 'আবহাওয়া সতর্কতা',
    routeCorridorStatus: 'করিডোর স্থিতি',
    routeStatusPatrolled: 'উন্মুক্ত এবং হাইওয়ে টহল দল দ্বারা সুরক্ষিত',
    routeRoadBlockage: 'রাস্তা অবরোধ',
    routeBlockageDesc: 'সোনাপুর টানেল ভূমিধস অঞ্চলে সম্পূর্ণ বন্ধ',
    routeComparisonTitle: 'আঞ্চলিক হাইওয়ে রুট তুলনা',
    routeAIndicator: 'রুট এ (অবরুদ্ধ)',
    routeBIndicator: 'রুট বি (সুপারিশকৃত)',

    cargoTitle: 'মালবাহী ও কার্গো ট্র্যাকিং',
    cargoSubtitle: 'জরুরি পণ্য, চিকিৎসা সামগ্রী ও ত্রাণ সরবরাহের লাইভ ট্র্যাকিং।',
    cargoNewBtn: 'নতুন কার্গো চালান',
    cargoActiveLoads: 'সক্রিয় চালান',
    cargoCriticalCargo: 'গুরুত্বপূর্ণ কার্গো',
    cargoDelayedRoadblocks: 'রাস্তা অবরোধে বিলম্ব',
    cargoOnTimeDelivery: 'সময়মতো বিতরণ',
    cargoSearchPlaceholder: 'ম্যানিফেস্ট #, পণ্য, চালকের নাম দিয়ে খুঁজুন...',
    cargoAllStatuses: 'সকল চালান স্থিতি',
    cargoHighPriority: 'উচ্চ অগ্রাধিকার',
    cargoNormalPriority: 'সাধারণ অগ্রাধিকার',
    cargoInTransit: 'পথিমধ্যে',
    cargoDelayed: 'বিলম্বিত',
    cargoDelivered: 'বিতরণ সম্পন্ন',
    cargoEtaLabel: 'আনুমানিক পৌঁছানোর সময়',
    cargoArrivingIn: 'পৌঁছানোর সময়',
    cargoTrackOnMap: 'মানচিত্রে দেখুন',
    cargoRerouteFreight: 'বিকল্প রুটে পাঠান',
    cargoTrackRoute: 'রুট ট্র্যাক করুন',
    cargoViewManifest: 'ম্যানিফেস্ট দেখুন',
    cargoDeliveryConfirmation: 'বিতরণ নিশ্চিতকরণ',

    fleetTitle: 'ফ্লিট ও যানবাহন ট্র্যাকিং',
    fleetSubtitle: 'এনএইচ-৬, এনএইচ-২৭ ও এনএইচ-৪৪ করিডোরে লাইভ ফ্লিট ট্র্যাকিং।',
    fleetAddBtn: 'নতুন যানবাহন যোগ করুন',
    fleetTotal: 'মোট ফ্লিট',
    fleetOnRoad: 'রাস্তায় সচল',
    fleetDelayedHalted: 'বিলম্বিত / অবরুদ্ধ',
    fleetAtDepot: 'ডিপোতে / স্থির',
    fleetSearchPlaceholder: 'লাইসেন্স প্লেট, চালকের নাম বা অবস্থান দিয়ে খুঁজুন...',
    fleetStatusMoving: 'চলমান',
    fleetStatusDelayed: 'বিলম্বিত',
    fleetStatusIdle: 'স্থির',
    fleetFuel: 'জ্বালানি',
    fleetRoute: 'রুট:',
    fleetDriver: 'চালক:',
    fleetTrackOnMap: 'মানচিত্রে দেখুন',
    fleetCallDriver: 'চালককে কল করুন',
    fleetRerouteVehicle: 'যানবাহন ঘুরিয়ে দিন',

    incidentsTitle: 'সক্রিয় সড়ক বিঘ্ন ও বিপদের ফিড',
    incidentsSubtitle: 'বিআরও মাঠ ইউনিট, রাজ্য দুর্যোগ কর্তৃপক্ষ ও পুলিশের যাচাইকৃত রিপোর্ট।',
    incidentsReportBtn: 'নতুন ঘটনার রিপোর্ট করুন',
    incidentsSearchPlaceholder: 'করিডোর, ল্যান্ডমার্ক বা জেলা দিয়ে ফিল্টার করুন...',
    incidentsAllSeverities: 'সকল তীব্রতা',
    incidentsAllTypes: 'সকল ধরনের বিপদ',
    incidentsCalculateDetour: 'বিকল্প রুট নির্ধারণ করুন',
    incidentsViewAdvisory: 'পরামর্শ দেখুন',
    incidentsDetailsTitle: 'ঘটনার বিবরণ:',
    incidentsCorridorLandmark: 'করিডোর / ল্যান্ডমার্ক:',
    incidentsDistrictState: 'জেলা / রাজ্য:',
    incidentsReportingSource: 'রিপোর্টের উৎস:',
    incidentsGpsCoords: 'জিপিএস স্থানাঙ্ক:',
    incidentsEstimatedClearance: 'আনুমানিক পরিষ্কার সময়:',

    fieldTitle: 'ফিল্ড রিপোর্টিং ও রাস্তা অবরোধ লগিং',
    fieldSubtitle: 'মাঠ পর্যায়ের কর্মী ও ট্রাফিক ফাঁড়ি যাচাইকৃত বিপদ নথিভুক্ত ও ছবি পাঠাতে পারে।',
    fieldUseLocationBtn: 'বর্তমান অবস্থান ব্যবহার করুন',
    fieldStateLabel: 'রাজ্য / কেন্দ্রশাসিত অঞ্চল',
    fieldDistrictLabel: 'জেলা সেক্টর',
    fieldCorridorLabel: 'করিডোর / ল্যান্ডমার্কের নাম',
    fieldCorridorPlaceholder: 'যেমন: এনএইচ-৬ সোনাপুর টানেলের কাছে',
    fieldHazardCatLabel: 'বিপদের ধরন',
    fieldPassageStatusLabel: 'রাস্তা চলাচলের স্থিতি',
    fieldEstDelayLabel: 'আনুমানিক বিলম্ব',
    fieldLatLabel: 'অক্ষাংশ (°N)',
    fieldLngLabel: 'দ্রাঘিমাংশ (°E)',
    fieldObservationsLabel: 'মাঠ পর্যায়ের পর্যবেক্ষণ ও ক্ষতির বিবরণ',
    fieldObservationsPlaceholder: 'রাস্তার অবস্থা, ধ্বংসাবশেষের বিস্তার ও সক্রিয় উদ্ধারকাজের বিবরণ লিখুন...',
    fieldPhotoLabel: 'ফটোগ্রাফিক প্রমাণ / ছবি',
    fieldSubmitReport: 'ঘটনার রিপোর্ট জমা দিন',
    fieldPublishDeclaration: 'অফিসিয়াল ঘোষণা প্রকাশ করুন',
    fieldSubmitVerification: 'যাচাইয়ের জন্য জমা দিন',

    queueTitle: 'ঘটনা যাচাই সারি',
    queueSubtitle: 'অফিসিয়াল অনুমোদনের অপেক্ষায় থাকা নাগরিক ও ফিল্ড রিপোর্ট',
    queueTabPending: 'যাচাইয়ের অপেক্ষায়',
    queueTabVerified: 'যাচাইকৃত ও সম্প্রচারিত',
    queueTabRejected: 'বাতিলকৃত / নিষ্ক্রিয়',
    queueReviewBtn: 'পর্যালোচনা ও অনুমোদন করুন',
    queueVerifyAction: 'যাচাই করুন ও স্থিতি সম্প্রচার করুন',
    queueDismissAction: 'রিপোর্ট বাতিল করুন',

    alertsTitle: 'অপারেশনাল সতর্কতা ও সম্প্রচার',
    alertsSubtitle: 'রিয়েল-টাইম সতর্কতা, জরুরি বিজ্ঞপ্তি ও সড়ক অবরোধের তথ্য।',
    alertsMarkAllRead: 'সব পড়া হয়েছে চিহ্নিত করুন',
    alertsStatusAction: 'স্থিতি: পদক্ষেপ প্রয়োজন',
    alertsRerouteConvoys: 'কনভয় ঘুরিয়ে দিন',
    alertsMarkHandled: 'সমাধান হয়েছে চিহ্নিত করুন',
    alertsCheckVanTemp: 'ভ্যানের তাপমাত্রা পরীক্ষা করুন',

    settingsTitle: 'অ্যাকাউন্ট সেটিংস ও প্রোফাইল',
    settingsSubtitle: 'অপারেশনাল ভূমিকা, যোগাযোগের বিবরণ ও নোটিফিকেশন থ্রেশহোল্ড পরিচালনা করুন।',
    settingsAssignedSectors: 'নির্ধারিত আঞ্চলিক সেক্টর:',
    settingsSwitchTitle: 'অপারেশনাল প্রোফাইল / ভূমিকা পরিবর্তন করুন',
    settingsSwitchSubtitle: 'ভূমিকাভিত্তিক অনুমতি, ঘটনা ব্যবস্থাপনা ও ডিসপ্যাচ ভিউ পরীক্ষা করতে প্রোফাইল পরিবর্তন করুন।',
    settingsContactTitle: 'ব্যক্তিগত যোগাযোগ ও পছন্দ',
    settingsFullName: 'সম্পূর্ণ অফিশিয়াল নাম',
    settingsOfficialEmail: 'অফিশিয়াল ইমেল ঠিকানা',
    settingsSectorPost: 'অপারেশনাল সেক্টর / পদবি',
    settingsRadioChannel: 'জরুরি রেডিও চ্যানেল',
    settingsSaveBtn: 'প্রোফাইল পরিবর্তন সংরক্ষণ করুন',

    statusBlocked: 'বন্ধ',
    statusRestricted: 'সীমিত',
    statusPassable: 'চলাচলযোগ্য',
    statusMoving: 'চলমান',
    statusDelayedTag: 'বিলম্বিত',
    statusIdle: 'স্থির',
  },

  // 4. HINDI (हिन्दी)
  hi: {
    navPublicSafetyTitle: 'सार्वजनिक सुरक्षा और सड़क स्थिति',
    navPublicActionsTitle: 'सार्वजनिक कार्य और अलर्ट',
    navCorridorOversightTitle: 'गलियारा निरीक्षण',
    navIncidentCommandTitle: 'घटना कमान और सत्यापन',
    navOperationsTitle: 'संचालन',
    navLogisticsDetoursTitle: 'लॉजिस्टिक्स और डायवर्जन',
    navHazardsSafetyTitle: 'खतरे और सुरक्षा',
    navFleetOperationsDashboard: 'फ्लीट संचालन डैशबोर्ड',
    navOperationsDashboard: 'संचालन डैशबोर्ड',
    navLiveFleetMap: 'लाइव फ्लीट मैप',
    navLiveHighwayMap: 'लाइव राजमार्ग मानचित्र',
    navWeatherRiskRadar: 'मौसम एवं जोखिम रडार',
    navWeatherRainAlerts: 'मौसम एवं वर्षा अलर्ट',
    navRoutePlanningDetour: 'मार्ग नियोजन / डायवर्जन',
    navCargoShipments: 'कार्गो एवं खेप',
    navFleetTracking: 'फ्लीट ट्रैकिंग',
    navActiveHazardsFeed: 'सक्रिय खतरों का फीड',
    navActiveIncidentsFeed: 'सक्रिय घटनाओं का फीड',
    navIncidentVerificationQueue: 'घटना सत्यापन कतार',
    navIncidentManagement: 'घटना प्रबंधन',
    navOfficialRoadblockLogging: 'आधिकारिक सड़क अवरोध प्रविष्टि',
    navReportRoadHazard: 'सड़क खतरे की रिपोर्ट करें',
    navReportIncidentHazard: 'घटना / खतरे की रिपोर्ट',
    navEmergencyAlerts: 'आपातकालीन अलर्ट',
    navEmergencyAlertsBroadcasts: 'आपातकालीन अलर्ट व प्रसारण',
    navSettings: 'सेटिंग्स',
    navLogOut: 'लॉग आउट',

    topFleetDashboard: 'फ्लीट डैशबोर्ड',
    topFleetMap: 'फ्लीट मैप',
    topRoutePlanning: 'मार्ग नियोजन',
    topCargoShipments: 'कार्गो एवं खेप',
    topOperationsDashboard: 'संचालन डैशबोर्ड',
    topLiveHighwayMap: 'लाइव राजमार्ग मैप',
    topVerificationQueue: 'सत्यापन कतार',
    topActiveIncidents: 'सक्रिय घटनाएं',
    topWeatherAlerts: 'मौसम अलर्ट',
    operatorRoleLogistics: 'लॉजिस्टिक्स एवं फ्लीट ऑपरेटर',
    operatorRoleAuthority: 'सरकारी प्राधिकरण',
    operatorRolePublic: 'सार्वजनिक यात्री',

    dashBannerTitle: 'क्षेत्रीय गलियारा संचालन',
    dashMonsoonAdvisory: 'मानसून चेतावनी सक्रिय',
    dashCorridorSub: 'प्रमुख मार्ग: एनएच-6, एनएच-40 और एनएच-27 (असम – मेघालय गलियारा)',
    dashPlanRouteBtn: 'मार्ग नियोजन / डायवर्जन',
    dashClearanceTitle: 'सड़क नेटवर्क निकासी',
    dashRestrictedMovement: 'प्रतिबंधित आवागमन',
    dashPassable: 'पारगम्य',
    dashClearanceNote: 'पूर्वी जयंतिया हिल्स में निरंतर बारिश के कारण 4% गिरावट',
    dashActiveBlockages: 'सक्रिय रुकावटें',
    dashTotalClosure: 'पूर्ण बंदी',
    dash2Critical: '2 गंभीर',
    dashSingleLaneOpen: '3 स्थानों पर एकल लेन खुली',
    dashViewBlockages: 'रुकावटें देखें →',
    dashActiveFleet: 'मार्ग पर सक्रिय फ्लीट',
    dashEnRoute: 'मार्गस्थ',
    dashVehiclesMoving: 'वाहन गतिमान',
    dashDispatchedCount: '(6 प्रेषित वाहनों में से)',
    dashFleetDiversionNote: 'शिलांग बाईपास के पास 1 वाहन को डायवर्जन लेने की सलाह दी गई',
    dashTrackVehicles: 'वाहन ट्रैक करें →',
    dashLandslideAlert: 'भूस्खलन खतरा चेतावनी',
    dashHighVulnerability: 'अत्यधिक संवेदनशील',
    dashHighRiskLevel: 'उच्च जोखिम (स्तर 3)',
    dashRainBeltSaturated: 'पिछले 24 घंटों में 184 मिमी बारिश • मौसिनराम-चेरापूंजी बेल्ट संतृप्त',
    dashWeatherRadar: 'मौसम रडार →',
    dashLiveHighwayMap: 'लाइव क्षेत्रीय राजमार्ग मानचित्र',
    dashAllCorridors: 'सभी गलियारे',
    dashLayers: 'परतें (Layers)',
    dashActiveIncidentsTitle: 'सक्रिय सड़क घटनाएं एवं खतरे',
    dashViewAll: 'सभी देखें',
    dashViewOnMap: 'मानचित्र पर देखें',
    dashFindDetour: 'डायवर्जन खोजें',

    mapFilter: 'फ़िल्टर:',
    mapStatusBlocked: 'स्थिति: बंद',
    mapStatusRestricted: 'स्थिति: सीमित',
    mapStatusAll: 'सभी स्थितियां',
    mapReset: 'रीसेट',
    mapLegendOpen: 'खुला / स्पष्ट',
    mapLegendPartial: 'आंशिक व्यवधान',
    mapLegendBlocked: 'अवरुद्ध',
    mapCardActiveHazards: '7 सक्रिय सड़क खतरे',
    mapCardHazardsSub: 'सोनापुर भूस्खलन और निचले इलाकों में बाढ़',
    mapCardViewHazards: 'खतरे देखें →',
    mapCardActiveTrucks: '5 सक्रिय आपूर्ति ट्रक',
    mapCardTrucksSub: 'सभी इकाइयां जीपीएस से जुड़ी हैं',
    mapCardTrackFleet: 'फ्लीट ट्रैक करें →',
    mapCardCalcDetour: 'सुरक्षित डायवर्जन की गणना करें',
    mapCardDetourSub: 'सक्रिय रुकावटों और बाढ़ क्षेत्रों से बचें',
    mapCardPlanRoute: 'मार्ग योजना →',

    weatherTitle: 'क्षेत्रीय मौसम पूर्वानुमान एवं भूस्खलन जोखिम निगरानी',
    weatherSubtitle: 'मेघालय और असम में रियल-टाइम रडार इमेजरी और आईएमडी वर्षा अवलोकन',
    weatherHighRain: 'भारी वर्षा',
    weatherModerateRain: 'मध्यम वर्षा',
    weatherLowRisk: 'कम जोखिम',
    weatherHeavyRainMist: 'भारी बारिश और पहाड़ी धुंध',
    weatherHumidClouds: 'आर्द्र और बादलों की आवाजाही',
    weatherMonsoonDownpours: 'मानसूनी मूसलाधार बारिश',
    weatherOvercastMist: 'घने बादल और धुंध',
    weatherRain: 'बारिश',
    weatherWind: 'हवा',
    weatherSaturationTitle: 'मिट्टी की संतृप्ति एवं भूस्खलन संवेदनशीलता',
    weatherLastUpdated: 'अंतिम अपडेट: 5 मिनट पहले (आईएमडी रडार सिंक)',
    weatherRiskCritical: 'गंभीर',
    weatherRiskHigh: 'उच्च',
    weatherRiskLow: 'कम',
    weatherRiskModerate: 'मध्यम',

    routeOptTitle: 'इष्टतम मार्ग अनुशंसा',
    routeVerifiedBadge: 'रूट बी सत्यापित',
    routeRecalcBtn: 'मार्गों की पुनर्गणना करें',
    routeOptDesc: 'एनएच-6 सोनापुर टनल पर सक्रिय चट्टान गिरने और बाढ़ से बचने हेतु रूट बी की सिफारिश की जाती है।',
    routeSaferBypass: 'सुरक्षित बाईपास (रूट बी)',
    routeRecommended: 'अनुशंसित',
    routeDirectHighway: 'प्रत्यक्ष राजमार्ग (रूट ए)',
    routeHighRiskBadge: 'उच्च जोखिम – 2 सक्रिय घटनाओं की सूचना',
    routeTotalDistance: 'कुल दूरी',
    routeEstTravelTime: 'अनुमानित यात्रा समय',
    routeDelayed: '(विलंबित)',
    routeCorridor: 'गलियारा:',
    routeBypassDesc: 'सोनापुर कीचड़ धंसने और सुरंग बंद होने से सुरक्षित रूप से बचाता है।',
    routeAWarning: 'सोनापुर सुरंग के पास भारी देरी और चट्टान खिसकने की सक्रिय चेतावनी।',
    routeModAdvisory: 'मध्यम सलाह',
    routeWeatherWarning: 'मौसम चेतावनी',
    routeCorridorStatus: 'गलियारे की स्थिति',
    routeStatusPatrolled: 'खुला और राज्य राजमार्ग टीमों द्वारा गश्त किया जा रहा है',
    routeRoadBlockage: 'सड़क रुकावट',
    routeBlockageDesc: 'सोनापुर टनल भूस्खलन क्षेत्र में पूर्ण बंदी',
    routeComparisonTitle: 'क्षेत्रीय राजमार्ग मार्ग तुलना',
    routeAIndicator: 'रूट ए (अवरुद्ध)',
    routeBIndicator: 'रूट बी (अनुशंसित)',

    cargoTitle: 'माल और कार्गो ट्रैकिंग',
    cargoSubtitle: 'आवश्यक वस्तुओं, चिकित्सा आपूर्ति और राहत सामग्री की लाइव ट्रैकिंग।',
    cargoNewBtn: 'नई कार्गो खेप',
    cargoActiveLoads: 'सक्रिय खेप',
    cargoCriticalCargo: 'महत्वपूर्ण कार्गो',
    cargoDelayedRoadblocks: 'सड़क अवरोधों से विलंबित',
    cargoOnTimeDelivery: 'समय पर डिलीवरी',
    cargoSearchPlaceholder: 'मैनिफ़ेस्ट #, वस्तु, चालक के नाम से खोजें...',
    cargoAllStatuses: 'सभी खेप स्थितियां',
    cargoHighPriority: 'उच्च प्राथमिकता',
    cargoNormalPriority: 'सामान्य प्राथमिकता',
    cargoInTransit: 'मार्गस्थ',
    cargoDelayed: 'विलंबित',
    cargoDelivered: 'वितरित',
    cargoEtaLabel: 'आगमन का अनुमानित समय',
    cargoArrivingIn: 'पहुंचने में समय',
    cargoTrackOnMap: 'मानचित्र पर देखें',
    cargoRerouteFreight: 'माल का मार्ग बदलें',
    cargoTrackRoute: 'मार्ग ट्रैक करें',
    cargoViewManifest: 'मैनिफ़ेस्ट देखें',
    cargoDeliveryConfirmation: 'डिलीवरी पुष्टि',

    fleetTitle: 'फ्लीट और वाहन ट्रैकिंग',
    fleetSubtitle: 'एनएच-6, एनएच-27 और एनएच-44 गलियारों में लाइव फ्लीट ट्रैकिंग।',
    fleetAddBtn: 'नया वाहन जोड़ें',
    fleetTotal: 'कुल फ्लीट',
    fleetOnRoad: 'सड़क पर गतिशील',
    fleetDelayedHalted: 'विलंबित / रुका हुआ',
    fleetAtDepot: 'डिपो पर / स्थिर',
    fleetSearchPlaceholder: 'लाइसेंस प्लेट, चालक का नाम, वाहन मॉडल या स्थान से खोजें...',
    fleetStatusMoving: 'गतिमान',
    fleetStatusDelayed: 'विलंबित',
    fleetStatusIdle: 'स्थिर',
    fleetFuel: 'ईंधन',
    fleetRoute: 'मार्ग:',
    fleetDriver: 'चालक:',
    fleetTrackOnMap: 'मानचित्र पर देखें',
    fleetCallDriver: 'चालक को कॉल करें',
    fleetRerouteVehicle: 'वाहन को नया मार्ग दें',

    incidentsTitle: 'सक्रिय सड़क व्यवधान एवं खतरे का फीड',
    incidentsSubtitle: 'बीआरओ फील्ड इकाइयों, आपदा प्राधिकरणों और पुलिस नियंत्रण कक्षों से सत्यापित रिपोर्ट।',
    incidentsReportBtn: 'नई घटना की रिपोर्ट करें',
    incidentsSearchPlaceholder: 'गलियारे, स्थल या जिले से फ़िल्टर करें...',
    incidentsAllSeverities: 'सभी गंभीरता स्तर',
    incidentsAllTypes: 'सभी खतरे के प्रकार',
    incidentsCalculateDetour: 'डायवर्जन की गणना करें',
    incidentsViewAdvisory: 'सलाह देखें',
    incidentsDetailsTitle: 'घटना का विवरण:',
    incidentsCorridorLandmark: 'गलियारा / स्थल:',
    incidentsDistrictState: 'जिला / राज्य:',
    incidentsReportingSource: 'रिपोर्टिंग स्रोत:',
    incidentsGpsCoords: 'जीपीएस निर्देशांक:',
    incidentsEstimatedClearance: 'अनुमानित निकासी समय:',

    fieldTitle: 'फील्ड रिपोर्टिंग एवं सड़क व्यवधान प्रविष्टि',
    fieldSubtitle: 'मोबाइल फील्ड कार्यकर्ता सत्यापित खतरों को दर्ज कर जीपीएस और फोटो जमा कर सकते हैं।',
    fieldUseLocationBtn: 'वर्तमान स्थान का उपयोग करें',
    fieldStateLabel: 'राज्य / केंद्र शासित प्रदेश',
    fieldDistrictLabel: 'जिला सेक्टर',
    fieldCorridorLabel: 'गलियारा / स्थल का नाम',
    fieldCorridorPlaceholder: 'उदा. एनएच-6 सोनापुर टनल के पास',
    fieldHazardCatLabel: 'खतरे की श्रेणी',
    fieldPassageStatusLabel: 'सड़क पारगमन स्थिति',
    fieldEstDelayLabel: 'अनुमानित व्यवधान देरी',
    fieldLatLabel: 'अक्षांश (°N)',
    fieldLngLabel: 'देशांतर (°E)',
    fieldObservationsLabel: 'फील्ड अवलोकन एवं क्षति विवरण',
    fieldObservationsPlaceholder: 'सड़क की स्थिति, मलबे का फैलाव और सक्रिय आपातकालीन सेवाओं का विवरण लिखें...',
    fieldPhotoLabel: 'फोटोग्राफिक प्रमाण / तस्वीर',
    fieldSubmitReport: 'घटना रिपोर्ट जमा करें',
    fieldPublishDeclaration: 'आधिकारिक घोषणा प्रकाशित करें',
    fieldSubmitVerification: 'सत्यापन हेतु जमा करें',

    queueTitle: 'घटना सत्यापन कतार',
    queueSubtitle: 'आधिकारिक अनुमोदन हेतु लंबित नागरिक और फील्ड सबमिशन',
    queueTabPending: 'सत्यापन लंबित',
    queueTabVerified: 'सत्यापित एवं प्रसारित',
    queueTabRejected: 'खारिज / निष्क्रिय',
    queueReviewBtn: 'समीक्षा एवं अनुमोदन करें',
    queueVerifyAction: 'सत्यापित करें और स्थिति प्रसारित करें',
    queueDismissAction: 'रिपोर्ट खारिज करें',

    alertsTitle: 'परिचालन अलर्ट एवं प्रसारण',
    alertsSubtitle: 'वास्तविक समय की चेतावनियां, आपातकालीन सूचनाएं और सड़क अवरोध प्रेषण।',
    alertsMarkAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
    alertsStatusAction: 'स्थिति: कार्रवाई आवश्यक',
    alertsRerouteConvoys: 'काफिले का मार्ग बदलें',
    alertsMarkHandled: 'निपटारा चिह्नित करें',
    alertsCheckVanTemp: 'वैन का तापमान जांचें',

    settingsTitle: 'खाता सेटिंग्स और प्रोफ़ाइल',
    settingsSubtitle: 'परिचालन भूमिका, संपर्क विवरण और अधिसूचना सीमा प्रबंधित करें।',
    settingsAssignedSectors: 'सौंपे गए क्षेत्रीय क्षेत्र:',
    settingsSwitchTitle: 'परिचालन प्रोफ़ाइल / भूमिका बदलें',
    settingsSwitchSubtitle: 'भूमिका-आधारित अनुमतियों, घटना प्रबंधन और प्रेषण विचारों का परीक्षण करने हेतु प्रोफ़ाइल बदलें।',
    settingsContactTitle: 'व्यक्तिगत संपर्क एवं प्राथमिकताएं',
    settingsFullName: 'पूरा आधिकारिक नाम',
    settingsOfficialEmail: 'आधिकारिक ईमेल पता',
    settingsSectorPost: 'परिचालन क्षेत्र / पद',
    settingsRadioChannel: 'आपातकालीन रेडियो चैनल',
    settingsSaveBtn: 'प्रोफ़ाइल परिवर्तन सहेजें',

    statusBlocked: 'बंद',
    statusRestricted: 'सीमित',
    statusPassable: 'पारगम्य',
    statusMoving: 'गतिमान',
    statusDelayedTag: 'विलंबित',
    statusIdle: 'स्थिर',
  },

  // 5. KHASI (Ka Ktien Khasi)
  kha: {
    navPublicSafetyTitle: 'Ka Shngain Paidbah bad Ki Lynti',
    navPublicActionsTitle: 'Ki Kam Paidbah bad Ki Maham',
    navCorridorOversightTitle: 'Ka Jingpahara Ia Ki Surok',
    navIncidentCommandTitle: 'Ka Jingpeit bad Pynskhem Jingjia',
    navOperationsTitle: 'Ki Kam',
    navLogisticsDetoursTitle: 'Logistics bad Ki Lynti Bym Hap',
    navHazardsSafetyTitle: 'Ki Jingma bad Shngain',
    navFleetOperationsDashboard: 'Dashboard Ki Kali Kit-Mar',
    navOperationsDashboard: 'Dashboard Ki Kam Sorkar',
    navLiveFleetMap: 'Map Ki Kali (Live)',
    navLiveHighwayMap: 'Map Surok Bah (Live)',
    navWeatherRiskRadar: 'Radar Suiñbneng bad Jingma',
    navWeatherRainAlerts: 'Jingtip Slap bad Suiñbneng',
    navRoutePlanningDetour: 'Pynbeit Lynti / Detour',
    navCargoShipments: 'Ki Mar ba Kit bad Phah',
    navFleetTracking: 'Jingbuh-Tymmen Kali',
    navActiveHazardsFeed: 'Ki Jingma ba Dang Jia',
    navActiveIncidentsFeed: 'Ki Jingjia ha Surok Bah',
    navIncidentVerificationQueue: 'Ka Ryntih Pynskhem Jingjia',
    navIncidentManagement: 'Pyniaid ia Ki Jingjia',
    navOfficialRoadblockLogging: 'Buh Record Surok ba Khang',
    navReportRoadHazard: 'Pyntip Jingma ha Surok',
    navReportIncidentHazard: 'Pyntip Jingjia / Jingma',
    navEmergencyAlerts: 'Jingmaham ba Kyrkieh',
    navEmergencyAlertsBroadcasts: 'Jingmaham bad Pynbna',
    navSettings: 'Ki Settings',
    navLogOut: 'Mih noh',

    topFleetDashboard: 'Fleet Dashboard',
    topFleetMap: 'Fleet Map',
    topRoutePlanning: 'Pynbeit Lynti',
    topCargoShipments: 'Ki Mar Kit',
    topOperationsDashboard: 'Operations Dashboard',
    topLiveHighwayMap: 'Map Surok Bah',
    topVerificationQueue: 'Pynskhem Jingjia',
    topActiveIncidents: 'Ki Jingjia',
    topWeatherAlerts: 'Jingmaham Mariang',
    operatorRoleLogistics: 'Logistics & Fleet Operator',
    operatorRoleAuthority: 'Govt Authority',
    operatorRolePublic: 'Public Traveler',

    dashBannerTitle: 'Ka Jingpyniaid ia Ki Surok Bah',
    dashMonsoonAdvisory: 'Jingmaham Slap la Pynbna',
    dashCorridorSub: 'Ki Surok Bah: NH-6, NH-40 & NH-27 (Assam – Meghalaya Corridor)',
    dashPlanRouteBtn: 'Pynbeit Lynti / Detour',
    dashClearanceTitle: 'Ka Jinglait Ki Surok Bah',
    dashRestrictedMovement: 'Don Jingeh ban Ia-iaid',
    dashPassable: 'Lah ban iaid',
    dashClearanceNote: 'Hiar 4% namar slap jur ha East Jaintia Hills',
    dashActiveBlockages: 'Ki Surok ba Khang',
    dashTotalClosure: 'Khang Dam',
    dash2Critical: '2 tylli ba jur',
    dashSingleLaneOpen: 'Plie tang shi liang ha 3 jaka',
    dashViewBlockages: 'Peit Ki Surok ba Khang →',
    dashActiveFleet: 'Ki Kali ba Iaid ha Lynti',
    dashEnRoute: 'Ha Lynti',
    dashVehiclesMoving: 'Kali ba iaid',
    dashDispatchedCount: '(Na ki 6 tylli ba phah)',
    dashFleetDiversionNote: 'La kyntu ia 1 kali ban iaid na Shillong bypass',
    dashTrackVehicles: 'Bud Dien ia Ki Kali →',
    dashLandslideAlert: 'Jingmaham Twad-Khyndew',
    dashHighVulnerability: 'Ma Jur',
    dashHighRiskLevel: 'Jingma ba Jur (Level 3)',
    dashRainBeltSaturated: 'Slap 184mm ha ki 24 kynta • Mawsynram-Sohra la dap um pura',
    dashWeatherRadar: 'Radar Suiñbneng →',
    dashLiveHighwayMap: 'Map Surok Bah (Live)',
    dashAllCorridors: 'Baroh Ki Surok',
    dashLayers: 'Layers',
    dashActiveIncidentsTitle: 'Ki Jingjia bad Jingma ba Dang Don',
    dashViewAll: 'Peit Baroh',
    dashViewOnMap: 'Peit ha Map',
    dashFindDetour: 'Wad Lynti Thymmai',

    mapFilter: 'Jied:',
    mapStatusBlocked: 'Status: Khang',
    mapStatusRestricted: 'Status: Eh ban Iaid',
    mapStatusAll: 'Baroh',
    mapReset: 'Pynphai Pat',
    mapLegendOpen: 'Plie / Lait',
    mapLegendPartial: 'Duh Katto-katne',
    mapLegendBlocked: 'Khang Dam',
    mapCardActiveHazards: '7 tylli ki Jingma ha Surok',
    mapCardHazardsSub: 'Twad khyndew Sonapur & jingjop um',
    mapCardViewHazards: 'Peit Jingma →',
    mapCardActiveTrucks: '5 tylli ki Truck Supply',
    mapCardTrucksSub: 'Don GPS ha baroh ki kali',
    mapCardTrackFleet: 'Bud Dien Kali →',
    mapCardCalcDetour: 'Wad Lynti ba Shngain',
    mapCardDetourSub: 'Kiit na ki jaka ba khang bad dap um',
    mapCardPlanRoute: 'Plan Lynti →',

    weatherTitle: 'Ka Suiñbneng bad Jingma Twad-Khyndew',
    weatherSubtitle: 'Jinglap radar bad jingthew slap IMD ha Meghalaya bad Assam',
    weatherHighRain: 'Slap Jur',
    weatherModerateRain: 'Slap Khabit',
    weatherLowRisk: 'Jingma ba rit',
    weatherHeavyRainMist: 'Slap jur bad lyoh ha lum',
    weatherHumidClouds: 'Sya bad lyoh',
    weatherMonsoonDownpours: 'Slap monsoon',
    weatherOvercastMist: 'Dap lyoh bad lyoh-khyndew',
    weatherRain: 'Slap',
    weatherWind: 'Lyer',
    weatherSaturationTitle: 'Ka Jingdap Um ha Khyndew & Jingtwad Lum',
    weatherLastUpdated: 'La pynbeit: 5m mynshuwa (IMD Radar)',
    weatherRiskCritical: 'JUR SHIKADDEI',
    weatherRiskHigh: 'JUR',
    weatherRiskLow: 'RIT',
    weatherRiskModerate: 'KHABIT',

    routeOptTitle: 'Ka Lynti ba Bha Tam',
    routeVerifiedBadge: 'Route B la Pynskhem',
    routeRecalcBtn: 'Khein biang ia ka Lynti',
    routeOptDesc: 'La kyntu ban iaid na Route B ban kiit na ki maw ba hap bad um ha NH-6 Sonapur Tunnel.',
    routeSaferBypass: 'Lynti ba Shngain (Route B)',
    routeRecommended: 'La Kyntu',
    routeDirectHighway: 'Surok Beit (Route A)',
    routeHighRiskBadge: 'Jingma Jur – 2 tylli ki jingjia',
    routeTotalDistance: 'JINGJNGAI BAROH',
    routeEstTravelTime: 'POR BA KORDIT',
    routeDelayed: '(Sahkut)',
    routeCorridor: 'Surok:',
    routeBypassDesc: 'Kiit na ka jingtwad ktieh ha Sonapur bad tunnel ba khang.',
    routeAWarning: 'Sahkut jur bad don jingma maw ban hap ha Sonapur Tunnel.',
    routeModAdvisory: 'Jingmaham Khabit',
    routeWeatherWarning: 'Jingmaham Mariang',
    routeCorridorStatus: 'Status Surok',
    routeStatusPatrolled: 'Plie bad don ki pulit surok ba peit',
    routeRoadBlockage: 'Surok ba Khang',
    routeBlockageDesc: 'Khang dam ha Sonapur Tunnel namar jingtwad khyndew',
    routeComparisonTitle: 'Jingia-nujor ia Ki Surok Bah',
    routeAIndicator: 'Route A (Khang)',
    routeBIndicator: 'Route B (La Kyntu)',

    cargoTitle: 'Ka Jingbud Dien ia Ki Mar ba Kit',
    cargoSubtitle: 'Ka jingbud dien ia ki mar bam, dawai bad mar iarap.',
    cargoNewBtn: 'Buh Mar Thymmai',
    cargoActiveLoads: 'KI MAR BA DANG KIT',
    cargoCriticalCargo: 'MAR BA KONGSAN',
    cargoDelayedRoadblocks: 'SAHKUT HA SUROK',
    cargoOnTimeDelivery: 'POH POR HOK',
    cargoSearchPlaceholder: 'Wad manifest #, mar, kyrteng nongniah...',
    cargoAllStatuses: 'Baroh Status',
    cargoHighPriority: 'KONGSAN JUR',
    cargoNormalPriority: 'KABA JIA',
    cargoInTransit: 'DANG IAID',
    cargoDelayed: 'SAHKUT',
    cargoDelivered: 'LA POI',
    cargoEtaLabel: 'POR BAN POI',
    cargoArrivingIn: 'Yn poi ha',
    cargoTrackOnMap: 'Peit ha Map',
    cargoRerouteFreight: 'Pynphai Lynti Mar',
    cargoTrackRoute: 'Bud Dien Lynti',
    cargoViewManifest: 'Peit Manifest',
    cargoDeliveryConfirmation: 'Pynskhem Jingpoi',

    fleetTitle: 'Ka Jingbud Dien ia Ki Kali',
    fleetSubtitle: 'Jingbud dien ia ki kali ha NH-6, NH-27 bad NH-44.',
    fleetAddBtn: 'Buh Kali Thymmai',
    fleetTotal: 'KALI BAROH',
    fleetOnRoad: 'HA SUROK',
    fleetDelayedHalted: 'SAHKUT / SANGEH',
    fleetAtDepot: 'HA DEPOT',
    fleetSearchPlaceholder: 'Wad number kali, nongniah, model...',
    fleetStatusMoving: 'IAID',
    fleetStatusDelayed: 'SAHKUT',
    fleetStatusIdle: 'SANGEH',
    fleetFuel: 'Petrol/Diesel',
    fleetRoute: 'Lynti:',
    fleetDriver: 'Nongniah:',
    fleetTrackOnMap: 'Peit ha Map',
    fleetCallDriver: 'Phone sha Nongniah',
    fleetRerouteVehicle: 'Pynphai Lynti Kali',

    incidentsTitle: 'Ki Jingjia bad Jingma ha Surok Bah',
    incidentsSubtitle: 'Ki report ba la pynskhem da ki BRO, Disaster Management bad Pulit.',
    incidentsReportBtn: 'Pyntip Jingjia Thymmai',
    incidentsSearchPlaceholder: 'Wad surok, jaka lane district...',
    incidentsAllSeverities: 'Baroh Jingjur',
    incidentsAllTypes: 'Baroh Jingma',
    incidentsCalculateDetour: 'Wad Lynti Detour',
    incidentsViewAdvisory: 'Peit Jingmaham',
    incidentsDetailsTitle: 'Jingbatai Jingjia:',
    incidentsCorridorLandmark: 'Surok / Jaka:',
    incidentsDistrictState: 'District / State:',
    incidentsReportingSource: 'Mano ba pyntip:',
    incidentsGpsCoords: 'GPS Coordinates:',
    incidentsEstimatedClearance: 'Por ban plie biang:',

    fieldTitle: 'Field Reporting & Surok ba Khang',
    fieldSubtitle: 'Ki nongtrei field bad outposts ki lah ban pyntip jingma, shim GPS bad dur.',
    fieldUseLocationBtn: 'Shim Jaka ba Don Mynta',
    fieldStateLabel: 'State / Jylla',
    fieldDistrictLabel: 'District Sector',
    fieldCorridorLabel: 'Kyrteng Surok / Jaka',
    fieldCorridorPlaceholder: 'kd: NH-6 hajan Sonapur Tunnel',
    fieldHazardCatLabel: 'Jait Jingma',
    fieldPassageStatusLabel: 'Status Iaid Kali',
    fieldEstDelayLabel: 'Jingpynslem ba Kordit',
    fieldLatLabel: 'Latitude (°N)',
    fieldLngLabel: 'Longitude (°E)',
    fieldObservationsLabel: 'Jingbatai na Field & Jingjulor',
    fieldObservationsPlaceholder: 'Batai jinglong ka surok, jingheh ka twad khyndew, ki kali ba sahkut...',
    fieldPhotoLabel: 'Dur ba shon (Image Proof)',
    fieldSubmitReport: 'Phah Report Jingjia',
    fieldPublishDeclaration: 'Pynbna Sorkar',
    fieldSubmitVerification: 'Phah ban Pynskhem',

    queueTitle: 'Ka Ryntih Pynskhem Jingjia',
    queueSubtitle: 'Ki report na ki paidbah ba ap jingpynskhem sorkar',
    queueTabPending: 'Ap Jingpynskhem',
    queueTabVerified: 'La Pynskhem & Pynbna',
    queueTabRejected: 'La Kyntait',
    queueReviewBtn: 'Peit bad Pynskhem',
    queueVerifyAction: 'Pynskhem & Pynbna Surok',
    queueDismissAction: 'Kyntait Report',

    alertsTitle: 'Ki Jingmaham bad Pynbna',
    alertsSubtitle: 'Jingmaham ha ka por ba thikna shaphang ki surok ba khang.',
    alertsMarkAllRead: 'Buh ba la pule baroh',
    alertsStatusAction: 'Status: Donkam ban leh eiei',
    alertsRerouteConvoys: 'Pynphai Lynti Convoys',
    alertsMarkHandled: 'La Dep Leh',
    alertsCheckVanTemp: 'Peit Temperature Van',

    settingsTitle: 'Ki Settings bad Profile',
    settingsSubtitle: 'Pyniaid ia ka kam, contact bad notification.',
    settingsAssignedSectors: 'Ki jaka ba la aiti:',
    settingsSwitchTitle: 'KYLLA PROFILE / JINGTREI',
    settingsSwitchSubtitle: 'Kylla profile ban pyrshang ia ki bor bad jingpeit sorkar.',
    settingsContactTitle: 'KI JINGTIP SHAPHANG IALADE',
    settingsFullName: 'Kyrteng Pura Sorkar',
    settingsOfficialEmail: 'Email Sorkar',
    settingsSectorPost: 'Ka Kam / Post',
    settingsRadioChannel: 'Radio Channel Emergency',
    settingsSaveBtn: 'Kynshew Jingkylla',

    statusBlocked: 'Khang Dam',
    statusRestricted: 'Eh ban Iaid',
    statusPassable: 'Lait ban Iaid',
    statusMoving: 'DANG IAID',
    statusDelayedTag: 'SAHKUT',
    statusIdle: 'SANGEH',
  },

  // 6. MANIPURI (ꯃꯤꯇꯩꯂꯣꯟ)
  mni: {
    navPublicSafetyTitle: 'ꯃꯤꯌꯥꯝꯒꯤ ꯌꯥꯏꯐꯕ ꯑꯃꯁꯨꯡ ꯂꯝꯕꯤꯒꯤ ꯐꯤꯚꯝ',
    navPublicActionsTitle: 'ꯃꯤꯌꯥꯝꯒꯤ ꯊꯕꯛ ꯑꯃꯁꯨꯡ ꯆꯦꯛꯁꯤꯅꯋꯥ',
    navCorridorOversightTitle: 'ꯀꯣꯔꯤꯗꯣꯔ ꯌꯦꯡꯁꯤꯟꯕ',
    navIncidentCommandTitle: 'ꯊꯧꯗꯣꯛ ꯀꯃꯥꯟꯗ ꯑꯃꯁꯨꯡ ꯂꯦꯞꯊꯣꯛꯄ',
    navOperationsTitle: 'ꯑꯣꯄꯔꯦꯁꯟꯁ',
    navLogisticsDetoursTitle: 'ꯄꯣꯠ-ꯆꯩ ꯑꯃꯁꯨꯡ ꯑꯇꯣꯞꯄ ꯂꯝꯕꯤ',
    navHazardsSafetyTitle: 'ꯈꯨꯗꯣꯡꯊꯤꯕ ꯑꯃꯁꯨꯡ ꯉꯥꯛꯊꯣꯛꯄ',
    navFleetOperationsDashboard: 'ꯒꯥꯔꯤ ꯃꯆꯥꯁꯤꯡꯒꯤ ꯗꯦꯁꯕꯣꯔ꯭ꯗ',
    navOperationsDashboard: 'ꯑꯣꯄꯔꯦꯁꯟ ꯗꯦꯁꯕꯣꯔ꯭ꯗ',
    navLiveFleetMap: 'ꯂꯥꯏꯚ ꯐ꯭ꯂꯤꯠ ꯃꯦꯞ',
    navLiveHighwayMap: 'ꯂꯥꯏꯚ ꯍꯥꯏꯋꯦ ꯃꯦꯞ',
    navWeatherRiskRadar: 'ꯅꯣꯡ-ꯆꯤꯡ ꯑꯃꯁꯨꯡ ꯈꯨꯗꯣꯡꯊꯤꯕ ꯔꯥꯗꯥꯔ',
    navWeatherRainAlerts: 'ꯅꯣꯡ-ꯆꯤꯡ ꯆꯦꯛꯁꯤꯟꯋꯥ',
    navRoutePlanningDetour: 'ꯂꯝꯕꯤ ꯁꯦꯝꯕ / ꯑꯇꯣꯞꯄ ꯂꯝꯕꯤ',
    navCargoShipments: 'ꯄꯣꯠ-ꯆꯩ ꯑꯃꯁꯨꯡ ꯊꯥꯒꯠꯂꯛꯄ',
    navFleetTracking: 'ꯒꯥꯔꯤ ꯃꯆꯥꯁꯤꯡ ꯇ꯭ꯔꯦꯛ ꯇꯧꯕ',
    navActiveHazardsFeed: 'ꯍꯧꯖꯤꯛ ꯊꯣꯛꯂꯤꯕ ꯈꯨꯗꯣꯡꯊꯤꯕꯁꯤꯡ',
    navActiveIncidentsFeed: 'ꯍꯧꯖꯤꯛ ꯊꯣꯛꯂꯤꯕ ꯊꯧꯗꯣꯛꯁꯤꯡ',
    navIncidentVerificationQueue: 'ꯊꯧꯗꯣꯛ ꯂꯦꯞꯊꯣꯛꯅꯕ ꯔꯣꯜ',
    navIncidentManagement: 'ꯊꯧꯗꯣꯛ ꯌꯦꯡꯁꯤꯟꯕ',
    navOfficialRoadblockLogging: 'ꯂꯩꯉꯥꯛꯀꯤ ꯂꯝꯕꯤ ꯊꯤꯡꯖꯤꯜꯂꯕ ꯂꯣꯒ',
    navReportRoadHazard: 'ꯂꯝꯕꯤꯒꯤ ꯈꯨꯗꯣꯡꯊꯤꯕ ꯔꯤꯄꯣꯔ꯭ꯠ',
    navReportIncidentHazard: 'ꯊꯧꯗꯣꯛ / ꯈꯨꯗꯣꯡꯊꯤꯕ ꯔꯤꯄꯣꯔ꯭ꯠ',
    navEmergencyAlerts: 'ꯑꯈꯟꯅꯕ ꯆꯦꯛꯁꯤꯟꯋꯥ',
    navEmergencyAlertsBroadcasts: 'ꯑꯈꯟꯅꯕ ꯆꯦꯛꯁꯤꯟꯋꯥ ꯑꯃꯁꯨꯡ ꯂꯥꯎꯊꯣꯛꯄ',
    navSettings: 'ꯁꯦꯇꯤꯡꯁ',
    navLogOut: 'ꯂꯣꯒ ꯑꯥꯎꯠ',

    topFleetDashboard: 'ꯐ꯭ꯂꯤꯠ ꯗꯦꯁꯕꯣꯔ꯭ꯗ',
    topFleetMap: 'ꯐ꯭ꯂꯤꯠ ꯃꯦꯞ',
    topRoutePlanning: 'ꯂꯝꯕꯤ ꯁꯦꯝꯕ',
    topCargoShipments: 'ꯄꯣꯠ-ꯆꯩ ꯄꯨꯕ',
    topOperationsDashboard: 'ꯑꯣꯄꯔꯦꯁꯟ ꯗꯦꯁꯕꯣꯔ꯭ꯗ',
    topLiveHighwayMap: 'ꯂꯥꯏꯚ ꯍꯥꯏꯋꯦ ꯃꯦꯞ',
    topVerificationQueue: 'ꯂꯦꯞꯊꯣꯛꯅꯕ ꯔꯣꯜ',
    topActiveIncidents: 'ꯍꯧꯖꯤꯛ ꯊꯣꯛꯂꯤꯕ ꯊꯧꯗꯣꯛ',
    topWeatherAlerts: 'ꯅꯣꯡ-ꯆꯤꯡ ꯆꯦꯛꯁꯤꯟꯋꯥ',
    operatorRoleLogistics: 'ꯂꯣꯖꯤꯁ꯭ꯇꯤꯛꯁ ꯑꯣꯄꯔꯦꯇꯔ',
    operatorRoleAuthority: 'ꯂꯩꯉꯥꯛꯀꯤ ꯑꯣꯊꯣꯔꯤꯇꯤ',
    operatorRolePublic: 'ꯃꯤꯌꯥꯝꯒꯤ ꯆꯠ-ꯊꯣꯛꯄ',

    dashBannerTitle: 'ꯂꯃꯗꯝꯁꯤꯒꯤ ꯂꯝꯕꯤ-ꯆꯠꯊꯣꯛ ꯑꯣꯄꯔꯦꯁꯟ',
    dashMonsoonAdvisory: 'ꯅꯣꯡꯖꯨꯒꯤ ꯆꯦꯛꯁꯤꯟꯋꯥ ꯍꯧꯔꯦ',
    dashCorridorSub: 'ꯃꯔꯨꯑꯣꯏꯕ ꯂꯝꯕꯤꯁꯤꯡ: NH-6, NH-40 ꯑꯃꯁꯨꯡ NH-27 (ꯑꯁꯥꯝ – ꯃꯦꯘꯥꯂꯌꯥ)',
    dashPlanRouteBtn: 'ꯂꯝꯕꯤ ꯁꯦꯝꯕ / ꯑꯇꯣꯞꯄ ꯂꯝꯕꯤ',
    dashClearanceTitle: 'ꯂꯝꯕꯤ ꯍꯥꯡꯗꯣꯛꯄꯒꯤ ꯆꯥꯡ',
    dashRestrictedMovement: 'ꯆꯠꯄꯗ ꯑꯊꯤꯡꯕ ꯂꯩꯕ',
    dashPassable: 'ꯆꯠꯄ ꯌꯥꯕ',
    dashClearanceNote: 'East Jaintia Hills ꯗ ꯅꯣꯡ ꯂꯦꯞꯇꯅ ꯆꯨꯕꯅ 4% ꯍꯟꯊꯔꯦ',
    dashActiveBlockages: 'ꯍꯧꯖꯤꯛ ꯊꯤꯡꯖꯤꯜꯂꯕ ꯂꯝꯕꯤ',
    dashTotalClosure: 'ꯃꯄꯨꯡꯐꯥꯅ ꯊꯤꯡꯖꯤꯜꯂꯕ',
    dash2Critical: '꯲ ꯌꯥꯝꯅ ꯂꯨꯕ',
    dashSingleLaneOpen: 'ꯃꯐꯝ ꯳ ꯗ ꯂꯦꯟ ꯑꯃ ꯍꯥꯡꯂꯤ',
    dashViewBlockages: 'ꯊꯤꯡꯖꯤꯜꯂꯕ ꯃꯐꯝꯁꯤꯡ ꯌꯦꯡꯕꯤꯌꯨ →',
    dashActiveFleet: 'ꯂꯝꯕꯤꯗ ꯆꯠꯂꯤꯕ ꯒꯥꯔꯤꯁꯤꯡ',
    dashEnRoute: 'ꯂꯝꯕꯤꯗ',
    dashVehiclesMoving: 'ꯒꯥꯔꯤ ꯆꯠꯂꯤꯕ',
    dashDispatchedCount: '(ꯊꯥꯈ꯭ꯔꯕ ꯶ ꯀꯤ ꯃꯅꯨꯡꯗ)',
    dashFleetDiversionNote: 'Shillong bypass ꯂꯣꯝꯗ ꯒꯥꯔꯤ ꯱ ꯂꯝꯕꯤ ꯍꯣꯡꯗꯣꯛꯅꯕ ꯈꯪꯍꯟꯈ꯭ꯔꯦ',
    dashTrackVehicles: 'ꯒꯥꯔꯤꯁꯤꯡ ꯇ꯭ꯔꯦꯛ ꯇꯧꯕꯤꯌꯨ →',
    dashLandslideAlert: 'ꯂꯩ-ꯆꯤꯡꯕꯒꯤ ꯈꯨꯗꯣꯡꯊꯤꯕ ꯆꯦꯛꯁꯤꯟꯋꯥ',
    dashHighVulnerability: 'ꯌꯥꯝꯅ ꯈꯨꯗꯣꯡꯊꯤꯕ',
    dashHighRiskLevel: 'ꯑꯀꯟꯕ ꯈꯨꯗꯣꯡꯊꯤꯕ (Level 3)',
    dashRainBeltSaturated: 'ꯄꯨꯡ ꯲꯴ ꯗ ꯅꯣꯡ 184mm ꯆꯨꯈ꯭ꯔꯦ • ꯃꯥꯎꯁꯤꯟꯔꯥꯝ-ꯆꯦꯔꯥꯄꯨꯟꯖꯤ ꯏꯁꯤꯡ ꯊꯜꯂꯦ',
    dashWeatherRadar: 'ꯅꯣꯡ-ꯆꯤꯡ ꯔꯥꯗꯥꯔ →',
    dashLiveHighwayMap: 'ꯂꯥꯏꯚ ꯍꯥꯏꯋꯦ ꯃꯦꯞ',
    dashAllCorridors: 'ꯂꯝꯕꯤ ꯄꯨꯝꯅꯃꯛ',
    dashLayers: 'ꯂꯦꯌꯔꯁꯤꯡ',
    dashActiveIncidentsTitle: 'ꯍꯧꯖꯤꯛ ꯊꯣꯛꯂꯤꯕ ꯂꯝꯕꯤꯒꯤ ꯈꯨꯗꯣꯡꯊꯤꯕꯁꯤꯡ',
    dashViewAll: 'ꯄꯨꯝꯅꯃꯛ ꯌꯦꯡꯕꯤꯌꯨ',
    dashViewOnMap: 'ꯃꯦꯞꯇ ꯌꯦꯡꯕꯤꯌꯨ',
    dashFindDetour: 'ꯑꯇꯣꯞꯄ ꯂꯝꯕꯤ ꯊꯤꯕꯤꯌꯨ',

    mapFilter: 'ꯐꯤꯜꯇꯔ:',
    mapStatusBlocked: 'ꯐꯤꯚꯝ: ꯊꯤꯡꯖꯤꯜꯂꯕ',
    mapStatusRestricted: 'ꯐꯤꯚꯝ: ꯑꯊꯤꯡꯕ ꯂꯩꯕ',
    mapStatusAll: 'ꯐꯤꯚꯝ ꯄꯨꯝꯅꯃꯛ',
    mapReset: 'ꯔꯤꯁꯦꯠ',
    mapLegendOpen: 'ꯍꯥꯡꯂꯤ / ꯆꯠꯄ ꯌꯥꯏ',
    mapLegendPartial: 'ꯈꯔꯈꯛ ꯀꯥꯏꯕ',
    mapLegendBlocked: 'ꯊꯤꯡꯖꯤꯜꯂꯕ',
    mapCardActiveHazards: 'ꯂꯝꯕꯤꯒꯤ ꯈꯨꯗꯣꯡꯊꯤꯕ ꯷',
    mapCardHazardsSub: 'Sonapur ꯂꯩ-ꯆꯤꯡꯕ & ꯏꯁꯤꯡ ꯏꯀꯥꯏꯕ',
    mapCardViewHazards: 'ꯈꯨꯗꯣꯡꯊꯤꯕ ꯌꯦꯡꯕꯤꯌꯨ →',
    mapCardActiveTrucks: 'ꯄꯣꯠ ꯄꯨꯕ ꯇ꯭ꯔꯛ ꯵',
    mapCardTrucksSub: 'GPS ꯁꯝꯅꯈ꯭ꯔꯦ',
    mapCardTrackFleet: 'ꯒꯥꯔꯤꯁꯤꯡ ꯇ꯭ꯔꯦꯛ ꯇꯧꯕꯤꯌꯨ →',
    mapCardCalcDetour: 'ꯑꯇꯣꯞꯄ ꯂꯝꯕꯤ ꯊꯤꯕꯤꯌꯨ',
    mapCardDetourSub: 'ꯊꯤꯡꯖꯤꯜꯂꯕ & ꯏꯁꯤꯡ ꯏꯀꯥꯏꯕ ꯊꯣꯛꯄ ꯃꯐꯝ ꯊꯤꯡꯗꯣꯛꯎ',
    mapCardPlanRoute: 'ꯂꯝꯕꯤ ꯁꯦꯝꯕꯤꯌꯨ →',

    weatherTitle: 'ꯅꯣꯡ-ꯆꯤꯡꯒꯤ ꯐꯤꯚꯝ ꯑꯃꯁꯨꯡ ꯂꯩ-ꯆꯤꯡꯕ ꯌꯦꯡꯁꯤꯟꯕ',
    weatherSubtitle: 'ꯃꯦꯘꯥꯂꯌꯥ ꯑꯃꯁꯨꯡ ꯑꯁꯥꯝꯒꯤ ꯔꯤꯑꯦꯜ-ꯇꯥꯏꯝ ꯔꯥꯗꯥꯔ ꯑꯃꯁꯨꯡ IMD ꯅꯣꯡ ꯆꯨꯕꯒꯤ ꯏ-ꯄꯥꯎ',
    weatherHighRain: 'ꯅꯣꯡ ꯀꯟꯅ ꯆꯨꯕ',
    weatherModerateRain: 'ꯅꯣꯡ ꯆꯥꯡ ꯅꯥꯏꯅ ꯆꯨꯕ',
    weatherLowRisk: 'ꯈꯨꯗꯣꯡꯊꯤꯕ ꯅꯦꯝꯕ',
    weatherHeavyRainMist: 'ꯑꯀꯟꯕ ꯅꯣꯡ ꯑꯃꯁꯨꯡ ꯆꯤꯡꯒꯤ ꯃꯩꯈꯨ',
    weatherHumidClouds: 'ꯑꯌꯨꯛ ꯑꯃꯁꯨꯡ ꯂꯩꯆꯤꯜ',
    weatherMonsoonDownpours: 'ꯃꯣꯟꯁꯨꯟ ꯅꯣꯡ',
    weatherOvercastMist: 'ꯂꯩꯆꯤꯜ ꯑꯃꯁꯨꯡ ꯀꯨꯍꯦꯜ',
    weatherRain: 'ꯅꯣꯡ',
    weatherWind: 'ꯅꯨꯡꯁꯤꯠ',
    weatherSaturationTitle: 'ꯂꯩꯃꯥꯏ ꯏꯁꯤꯡ ꯊꯜꯂꯛꯄ & ꯂꯩ-ꯆꯤꯡꯕꯒꯤ ꯆꯥꯡ',
    weatherLastUpdated: 'ꯑꯔꯣꯏꯕ ꯑꯞꯗꯦꯠ: ꯃꯤꯅꯤꯠ ꯵ ꯒꯤ ꯃꯃꯥꯡꯗ (IMD Radar)',
    weatherRiskCritical: 'ꯌꯥꯝꯅ ꯂꯨꯕ',
    weatherRiskHigh: 'ꯑꯀꯟꯕ',
    weatherRiskLow: 'ꯅꯦꯝꯕ',
    weatherRiskModerate: 'ꯃꯌꯥꯏ ꯑꯣꯏꯕ',

    routeOptTitle: 'ꯈ꯭ꯋꯥꯏꯗꯒꯤ ꯐꯕ ꯂꯝꯕꯤꯒꯤ ꯄꯥꯎꯇꯥꯛ',
    routeVerifiedBadge: 'Route B ꯂꯦꯞꯊꯣꯛꯈ꯭ꯔꯦ',
    routeRecalcBtn: 'ꯂꯝꯕꯤ ꯑꯃꯨꯛ ꯊꯤꯕꯤꯌꯨ',
    routeOptDesc: 'NH-6 Sonapur Tunnel ꯗ ꯅꯨꯡ ꯇꯨꯒꯗꯧꯕ ꯑꯃꯁꯨꯡ ꯏꯁꯤꯡ ꯏꯀꯥꯏꯕ ꯊꯣꯛꯄꯅ Route B ꯆꯠꯅꯕ ꯄꯥꯎꯇꯥꯛ ꯄꯤꯔꯤ।',
    routeSaferBypass: 'ꯈꯨꯗꯣꯡꯊꯤꯗꯕ ꯑꯇꯣꯞꯄ ꯂꯝꯕꯤ (Route B)',
    routeRecommended: 'ꯄꯥꯎꯇꯥꯛ ꯄꯤꯔꯕ',
    routeDirectHighway: 'ꯍꯛꯊꯦꯡꯅꯕ ꯍꯥꯏꯋꯦ (Route A)',
    routeHighRiskBadge: 'ꯑꯀꯟꯕ ꯈꯨꯗꯣꯡꯊꯤꯕ – ꯊꯧꯗꯣꯛ ꯲ ꯊꯣꯛꯈ꯭ꯔꯦ',
    routeTotalDistance: 'ꯄꯨꯟꯅ ꯂꯝꯕꯤ ꯆꯠꯄ',
    routeEstTravelTime: 'ꯆꯪꯒꯗꯧꯔꯤꯕ ꯃꯇꯝ',
    routeDelayed: '(ꯊꯦꯡꯊꯔꯦ)',
    routeCorridor: 'ꯂꯝꯕꯤ:',
    routeBypassDesc: 'Sonapur ꯒꯤ ꯂꯩ-ꯆꯤꯡꯕ ꯑꯃꯁꯨꯡ ꯇꯅꯦꯜ ꯊꯤꯡꯖꯤꯜꯂꯕ ꯊꯤꯡꯗꯣꯛꯏ।',
    routeAWarning: 'Sonapur ꯇꯅꯦꯜ ꯃꯅꯥꯛꯇ ꯌꯥꯝꯅ ꯊꯦꯡꯊꯕ ꯑꯃꯁꯨꯡ ꯅꯨꯡ ꯇꯨꯕꯒꯤ ꯆꯦꯛꯁꯤꯟꯋꯥ ꯂꯩ।',
    routeModAdvisory: 'ꯃꯌꯥꯏ ꯑꯣꯏꯕ ꯆꯦꯛꯁꯤꯟꯋꯥ',
    routeWeatherWarning: 'ꯅꯣꯡ-ꯆꯤꯡꯒꯤ ꯆꯦꯛꯁꯤꯟꯋꯥ',
    routeCorridorStatus: 'ꯂꯝꯕꯤꯒꯤ ꯐꯤꯚꯝ',
    routeStatusPatrolled: 'ꯍꯥꯡꯂꯤ ꯑꯃꯁꯨꯡ ꯍꯥꯏꯋꯦ ꯇꯤꯝꯅ ꯉꯥꯛꯄꯤꯔꯤ',
    routeRoadBlockage: 'ꯂꯝꯕꯤ ꯊꯤꯡꯖꯤꯜꯂꯕ',
    routeBlockageDesc: 'Sonapur ꯇꯅꯦꯜ ꯂꯩ-ꯆꯤꯡꯕ ꯃꯐꯝꯗ ꯃꯄꯨꯡꯐꯥꯅ ꯊꯤꯡꯖꯤꯜꯂꯦ',
    routeComparisonTitle: 'ꯂꯝꯕꯤꯁꯤꯡ ꯆꯥꯡꯗꯝꯅꯕ',
    routeAIndicator: 'Route A (ꯊꯤꯡꯖꯤꯜꯂꯕ)',
    routeBIndicator: 'Route B (ꯄꯥꯎꯇꯥꯛ ꯄꯤꯔꯕ)',

    cargoTitle: 'ꯄꯣꯠ-ꯆꯩ ꯄꯨꯕ ꯇ꯭ꯔꯦꯛ ꯇꯧꯕ',
    cargoSubtitle: 'ꯃꯔꯨꯑꯣꯏꯕ ꯄꯣꯠꯂꯝ, ꯍꯤꯗꯥꯛ-ꯂꯥꯡꯊꯛ ꯑꯃꯁꯨꯡ ꯃꯇꯦꯡꯒꯤ ꯄꯣꯠꯂꯝꯁꯤꯡ ꯂꯥꯏꯚ ꯇ꯭ꯔꯦꯛ ꯇꯧꯕ।',
    cargoNewBtn: 'ꯑꯅꯧꯕ ꯄꯣꯠ ꯄꯨꯕꯒꯤ ꯏ-ꯄꯥꯎ',
    cargoActiveLoads: 'ꯍꯧꯖꯤꯛ ꯄꯨꯔꯤꯕ ꯄꯣꯠ',
    cargoCriticalCargo: 'ꯌꯥꯝꯅ ꯃꯔꯨꯑꯣꯏꯕ ꯄꯣꯠ',
    cargoDelayedRoadblocks: 'ꯂꯝꯕꯤ ꯊꯤꯡꯖꯤꯜꯂꯕꯅ ꯊꯦꯡꯊꯔꯕ',
    cargoOnTimeDelivery: 'ꯃꯇꯝ ꯆꯥꯅ ꯌꯧꯍꯟꯕ',
    cargoSearchPlaceholder: 'ꯃꯦꯅꯤꯐꯦꯁ꯭ꯇ, ꯄꯣꯠꯂꯝ, ꯗ꯭ꯔꯥꯏꯚꯔꯒꯤ ꯃꯤꯡꯅ ꯊꯤꯕꯤꯌꯨ...',
    cargoAllStatuses: 'ꯐꯤꯚꯝ ꯄꯨꯝꯅꯃꯛ',
    cargoHighPriority: 'ꯃꯔꯨꯑꯣꯏꯕ ꯄꯣꯠ',
    cargoNormalPriority: 'ꯃꯌꯥꯏ ꯑꯣꯏꯕ ꯄꯣꯠ',
    cargoInTransit: 'ꯂꯝꯕꯤꯗ ꯂꯩꯔꯤ',
    cargoDelayed: 'ꯊꯦꯡꯊꯔꯦ',
    cargoDelivered: 'ꯌꯧꯈ꯭ꯔꯦ',
    cargoEtaLabel: 'ꯌꯧꯒꯗꯧꯔꯤꯕ ꯃꯇꯝ',
    cargoArrivingIn: 'ꯌꯧꯔꯛꯀꯅꯤ',
    cargoTrackOnMap: 'ꯃꯦꯞꯇ ꯌꯦꯡꯕꯤꯌꯨ',
    cargoRerouteFreight: 'ꯑꯇꯣꯞꯄ ꯂꯝꯕꯤꯗ ꯊꯥꯕꯤꯌꯨ',
    cargoTrackRoute: 'ꯂꯝꯕꯤ ꯇ꯭ꯔꯦꯛ ꯇꯧꯕꯤꯌꯨ',
    cargoViewManifest: 'ꯃꯦꯅꯤꯐꯦꯁ꯭ꯇ ꯌꯦꯡꯕꯤꯌꯨ',
    cargoDeliveryConfirmation: 'ꯌꯧꯔꯦ ꯍꯥꯏꯅ ꯂꯦꯞꯄ',

    fleetTitle: 'ꯒꯥꯔꯤ ꯃꯆꯥꯁꯤꯡ ꯇ꯭ꯔꯦꯛ ꯇꯧꯕ',
    fleetSubtitle: 'NH-6, NH-27, ꯑꯃꯁꯨꯡ NH-44 ꯂꯝꯕꯤꯗ ꯒꯥꯔꯤꯁꯤꯡ ꯂꯥꯏꯚ ꯇ꯭ꯔꯦꯛ ꯇꯧꯕ।',
    fleetAddBtn: 'ꯑꯅꯧꯕ ꯒꯥꯔꯤ ꯍꯥꯞꯆꯤꯟꯕꯤꯌꯨ',
    fleetTotal: 'ꯄꯨꯟꯅ ꯒꯥꯔꯤ',
    fleetOnRoad: 'ꯂꯝꯕꯤꯗ ꯆꯠꯂꯤꯕ',
    fleetDelayedHalted: 'ꯊꯦꯡꯊꯔꯕ / ꯂꯦꯞꯂꯕ',
    fleetAtDepot: 'ꯗꯤꯄꯣꯗ ꯂꯩꯕ',
    fleetSearchPlaceholder: 'ꯂꯥꯏꯁꯦꯟꯁ ꯄ꯭ꯂꯦꯠ, ꯗ꯭ꯔꯥꯏꯚꯔ, ꯒꯥꯔꯤꯒꯤ ꯃꯃꯤꯡꯅ ꯊꯤꯕꯤꯌꯨ...',
    fleetStatusMoving: 'ꯆꯠꯂꯤ',
    fleetStatusDelayed: 'ꯊꯦꯡꯊꯔꯦ',
    fleetStatusIdle: 'ꯂꯦꯞꯂꯤ',
    fleetFuel: 'ꯊꯥꯎ',
    fleetRoute: 'ꯂꯝꯕꯤ:',
    fleetDriver: 'ꯗ꯭ꯔꯥꯏꯚꯔ:',
    fleetTrackOnMap: 'ꯃꯦꯞꯇ ꯌꯦꯡꯕꯤꯌꯨ',
    fleetCallDriver: 'ꯗ꯭ꯔꯥꯏꯚꯔꯗ ꯀꯣꯜ ꯇꯧꯕꯤꯌꯨ',
    fleetRerouteVehicle: 'ꯒꯥꯔꯤꯒꯤ ꯂꯝꯕꯤ ꯍꯣꯡꯗꯣꯛꯎ',

    incidentsTitle: 'ꯂꯝꯕꯤꯒꯤ ꯊꯧꯗꯣꯛ ꯑꯃꯁꯨꯡ ꯈꯨꯗꯣꯡꯊꯤꯕꯁꯤꯡ',
    incidentsSubtitle: 'BRO, ꯗꯤꯖꯥꯁ꯭ꯇꯔ ꯑꯣꯊꯣꯔꯤꯇꯤ ꯑꯃꯁꯨꯡ ꯄꯨꯂꯤꯁꯅ ꯂꯦꯞꯊꯣꯛꯂꯕ ꯔꯤꯄꯣꯔ꯭ꯠꯁꯤꯡ।',
    incidentsReportBtn: 'ꯑꯅꯧꯕ ꯊꯧꯗꯣꯛ ꯔꯤꯄꯣꯔ꯭ꯠ ꯇꯧꯕꯤꯌꯨ',
    incidentsSearchPlaceholder: 'ꯂꯝꯕꯤ, ꯃꯐꯝ ꯅꯠꯇ꯭ꯔꯒ ꯗꯤꯁ꯭ꯇ꯭ꯔꯤꯛꯅ ꯐꯤꯜꯇꯔ ꯇꯧꯕꯤꯌꯨ...',
    incidentsAllSeverities: 'ꯈꯨꯗꯣꯡꯊꯤꯕ ꯄꯨꯝꯅꯃꯛ',
    incidentsAllTypes: 'ꯃꯈꯜ ꯄꯨꯝꯅꯃꯛ',
    incidentsCalculateDetour: 'ꯑꯇꯣꯞꯄ ꯂꯝꯕꯤ ꯊꯤꯕꯤꯌꯨ',
    incidentsViewAdvisory: 'ꯆꯦꯛꯁꯤꯟꯋꯥ ꯌꯦꯡꯕꯤꯌꯨ',
    incidentsDetailsTitle: 'ꯊꯧꯗꯣꯛꯀꯤ ꯑꯀꯨꯞꯄ ꯋꯥꯔꯣꯜ:',
    incidentsCorridorLandmark: 'ꯂꯝꯕꯤ / ꯃꯐꯝ:',
    incidentsDistrictState: 'ꯗꯤꯁ꯭ꯇ꯭ꯔꯤꯛ / ꯁ꯭ꯇꯦꯠ:',
    incidentsReportingSource: 'ꯔꯤꯄꯣꯔ꯭ꯠ ꯇꯧꯔꯛꯄ:',
    incidentsGpsCoords: 'GPS ꯃꯐꯝ:',
    incidentsEstimatedClearance: 'ꯍꯥꯡꯗꯣꯛꯀꯗꯧꯔꯤꯕ ꯃꯇꯝ:',

    fieldTitle: 'ꯐꯤꯜꯗ ꯔꯤꯄꯣꯔ꯭ꯠ ꯑꯃꯁꯨꯡ ꯂꯝꯕꯤ ꯊꯤꯡꯖꯤꯜꯂꯕ ꯂꯣꯒ',
    fieldSubtitle: 'ꯐꯤꯜꯗ ꯑꯣꯐꯤꯁꯔꯁꯤꯡꯅ ꯈꯨꯗꯣꯡꯊꯤꯕ ꯂꯣꯒ ꯇꯧꯕ, GPS ꯂꯧꯕ ꯑꯃꯁꯨꯡ ꯐꯣꯇꯣ ꯊꯥꯒꯠꯄ ꯌꯥꯏ।',
    fieldUseLocationBtn: 'ꯍꯧꯖꯤꯛ ꯂꯩꯔꯤꯕ ꯃꯐꯝ ꯁꯤꯖꯤꯟꯅꯧ',
    fieldStateLabel: 'ꯁ꯭ꯇꯦꯠ / ꯂꯃꯗꯝ',
    fieldDistrictLabel: 'ꯗꯤꯁ꯭ꯇ꯭ꯔꯤꯛ ꯁꯦꯛꯇꯔ',
    fieldCorridorLabel: 'ꯂꯝꯕꯤ / ꯃꯐꯝꯒꯤ ꯃꯃꯤꯡ',
    fieldCorridorPlaceholder: 'ꯈꯨꯗꯝ: NH-6 Sonapur Tunnel ꯃꯅꯥꯛꯇ',
    fieldHazardCatLabel: 'ꯈꯨꯗꯣꯡꯊꯤꯕꯒꯤ ꯃꯈꯜ',
    fieldPassageStatusLabel: 'ꯂꯝꯕꯤꯒꯤ ꯐꯤꯚꯝ',
    fieldEstDelayLabel: 'ꯊꯦꯡꯊꯒꯗꯧꯔꯤꯕ ꯃꯇꯝ',
    fieldLatLabel: 'Latitude (°N)',
    fieldLngLabel: 'Longitude (°E)',
    fieldObservationsLabel: 'ꯐꯤꯜꯗꯒꯤ ꯐꯤꯚꯝ ꯑꯃꯁꯨꯡ ꯃꯥꯡꯈ꯭ꯔꯕ ꯑꯀꯨꯞꯄ ꯋꯥꯔꯣꯜ',
    fieldObservationsPlaceholder: 'ꯂꯝꯕꯤꯒꯤ ꯐꯤꯚꯝ, ꯂꯩ-ꯆꯤꯡꯕꯒꯤ ꯄꯥꯛ-ꯆꯥꯎ, ꯒꯥꯔꯤ ꯊꯤꯡꯖꯤꯜꯂꯕ ꯑꯃꯁꯨꯡ ꯃꯇꯦꯡ ꯄꯥꯡꯂꯤꯕ ꯇꯤꯃꯒꯤ ꯃꯔꯝꯗ ꯏꯕꯤꯌꯨ...',
    fieldPhotoLabel: 'ꯐꯣꯇꯣꯒꯤ ꯄ꯭ꯔꯨꯐ (Image Proof)',
    fieldSubmitReport: 'ꯔꯤꯄꯣꯔ꯭ꯠ ꯊꯥꯒꯠꯄꯤꯌꯨ',
    fieldPublishDeclaration: 'ꯑꯣꯐꯤꯁꯤꯑꯦꯜ ꯂꯥꯎꯊꯣꯛꯄ',
    fieldSubmitVerification: 'ꯂꯦꯞꯊꯣꯛꯅꯕ ꯊꯥꯒꯠꯄꯤꯌꯨ',

    queueTitle: 'ꯊꯧꯗꯣꯛ ꯂꯦꯞꯊꯣꯛꯅꯕ ꯔꯣꯜ',
    queueSubtitle: 'ꯂꯩꯉꯥꯛꯀꯤ ꯑꯌꯥꯕ ꯉꯥꯏꯔꯤꯕ ꯃꯤꯌꯥꯝ ꯑꯃꯁꯨꯡ ꯐꯤꯜꯗꯒꯤ ꯔꯤꯄꯣꯔ꯭ꯠꯁꯤꯡ',
    queueTabPending: 'ꯂꯦꯞꯊꯣꯛꯅꯕ ꯉꯥꯏꯔꯤꯕ',
    queueTabVerified: 'ꯂꯦꯞꯊꯣꯛꯂꯕ & ꯂꯥꯎꯊꯣꯛꯂꯕ',
    queueTabRejected: 'ꯌꯥꯗꯕ / ꯊꯥꯗꯣꯛꯂꯕ',
    queueReviewBtn: 'ꯌꯦꯡꯁꯤꯟꯕ & ꯑꯌꯥꯕ ꯄꯤꯕ',
    queueVerifyAction: 'ꯂꯦꯞꯊꯣꯛꯎ ꯑꯃꯁꯨꯡ ꯂꯝꯕꯤꯒꯤ ꯐꯤꯚꯝ ꯂꯥꯎꯊꯣꯛꯎ',
    queueDismissAction: 'ꯔꯤꯄꯣꯔ꯭ꯠ ꯌꯥꯗꯕ',

    alertsTitle: 'ꯑꯣꯄꯔꯦꯁꯅꯦꯜ ꯆꯦꯛꯁꯤꯟꯋꯥ ꯑꯃꯁꯨꯡ ꯂꯥꯎꯊꯣꯛꯄ',
    alertsSubtitle: 'ꯔꯤꯑꯦꯜ-ꯇꯥꯏꯝ ꯆꯦꯛꯁꯤꯟꯋꯥ, ꯈꯨꯗꯣꯡꯊꯤꯕ ꯃꯇꯝꯒꯤ ꯄꯥꯎ ꯑꯃꯁꯨꯡ ꯂꯝꯕꯤ ꯊꯤꯡꯖꯤꯜꯂꯕꯒꯤ ꯄꯥꯎꯇꯥꯛ।',
    alertsMarkAllRead: 'ꯄꯨꯝꯅꯃꯛ ꯄꯥꯈ꯭ꯔꯦ ꯍꯥꯏꯅ ꯇꯧꯕꯤꯌꯨ',
    alertsStatusAction: 'ꯐꯤꯚꯝ: ꯊꯕꯛ ꯄꯥꯏꯈꯠꯄ ꯃꯊꯧ ꯇꯥꯏ',
    alertsRerouteConvoys: 'ꯒꯥꯔꯤ ꯃꯆꯥꯁꯤꯡꯒꯤ ꯂꯝꯕꯤ ꯍꯣꯡꯗꯣꯛꯎ',
    alertsMarkHandled: 'ꯂꯣꯏꯁꯤꯟꯈ꯭ꯔꯦ ꯍꯥꯏꯅ ꯇꯧꯕꯤꯌꯨ',
    alertsCheckVanTemp: 'ꯒꯥꯔꯤꯒꯤ ꯑꯁꯥ-ꯑꯋꯥ ꯌꯦꯡꯕꯤꯌꯨ',

    settingsTitle: 'ꯑꯦꯀꯥꯎꯟ ꯁꯦꯇꯤꯡꯁ & ꯄ꯭ꯔꯣꯐꯥꯏꯜ',
    settingsSubtitle: 'ꯑꯣꯄꯔꯦꯁꯅꯦꯜ ꯔꯣꯜ, ꯄꯥꯎ ꯐꯥꯎꯅꯕꯒꯤ ꯏ-ꯄꯥꯎ ꯑꯃꯁꯨꯡ ꯅꯣꯇꯤꯐꯤꯀꯦꯁꯟ ꯌꯦꯡꯁꯤꯟꯕꯤꯌꯨ।',
    settingsAssignedSectors: 'ꯄꯤꯔꯕ ꯂꯃꯗꯝꯁꯤꯡ:',
    settingsSwitchTitle: 'ꯑꯣꯄꯔꯦꯁꯅꯦꯜ ꯄ꯭ꯔꯣꯐꯥꯏꯜ / ꯔꯣꯜ ꯍꯣꯡꯗꯣꯛꯄꯤꯌꯨ',
    settingsSwitchSubtitle: 'ꯔꯣꯜ-ꯕꯦꯁ ꯑꯌꯥꯕ, ꯊꯧꯗꯣꯛ ꯌꯦꯡꯁꯤꯟꯕ ꯑꯃꯁꯨꯡ ꯒꯥꯔꯤ ꯊꯥꯕ ꯆꯥꯡꯌꯦꯡ ꯇꯧꯅꯕ ꯄ꯭ꯔꯣꯐꯥꯏꯜ ꯍꯣꯡꯗꯣꯛꯎ।',
    settingsContactTitle: 'ꯏꯁꯥꯒꯤ ꯄꯥꯎ ꯐꯥꯎꯅꯕ & ꯄꯥꯝꯕꯁꯤꯡ',
    settingsFullName: 'ꯑꯣꯐꯤꯁꯤꯑꯦꯜ ꯃꯤꯡ ꯃꯄꯨꯡꯐꯥꯕ',
    settingsOfficialEmail: 'ꯑꯣꯐꯤꯁꯤꯑꯦꯜ ꯏꯃꯦꯜ ꯑꯦꯗ꯭ꯔꯦꯁ',
    settingsSectorPost: 'ꯑꯣꯄꯔꯦꯁꯅꯦꯜ ꯁꯦꯛꯇꯔ / ꯐꯝ',
    settingsRadioChannel: 'ꯑꯈꯟꯅꯕ ꯔꯦꯗꯤꯑꯣ ꯆꯦꯅꯦꯜ',
    settingsSaveBtn: 'ꯁꯦꯇꯤꯡꯁ ꯇꯨꯡꯁꯤꯟꯕꯤꯌꯨ',

    statusBlocked: 'ꯊꯤꯡꯖꯤꯜꯂꯕ',
    statusRestricted: 'ꯑꯊꯤꯡꯕ ꯂꯩꯕ',
    statusPassable: 'ꯆꯠꯄ ꯌꯥꯕ',
    statusMoving: 'ꯆꯠꯂꯤ',
    statusDelayedTag: 'ꯊꯦꯡꯊꯔꯦ',
    statusIdle: 'ꯂꯦꯞꯂꯤ',
  },
};

const EXTRA_TRANSLATIONS: Record<LanguageCode, Partial<AppTranslations>> = {
  en: {
    logisticsApprove: 'Approve Delivery',
    routeUpdating: 'Recalculating...',
    routeAssignVehicle: 'Assign to Vehicle',
    routeConfirmSend: 'Confirm & Send Detour',
    settingsPhone: 'Phone Number',
    settingsRefreshInterval: 'Data Refresh Interval',
    settingsSoundAlerts: 'Audio / Voice Alerts',
    navActiveSession: 'Active Session',
    incidentsLandslide: 'Landslide',
    incidentsFlashFlood: 'Flash Flood',
    incidentsRockfall: 'Rockfall / Debris',
    incidentsCongestion: 'Traffic Congestion',
    incidentsBridgeDamage: 'Bridge Damage',
    incidentsNoHazards: 'No Hazards Found',
    dashStateHighwayStatus: 'State Highway Status',
    dashLiveClearanceScore: 'Live Corridor Clearance Score',
    dashClearanceScoreHeader: 'Clearance Index',
    dashOperationalState: 'Fully Operational',
    dashRestrictedState: 'Partial Delay / Warning',
    dashRegionalTransportMonitoring: 'Regional Transport Monitoring',
    dashRealtimeSync: 'Connected • GPS Live',
    dashRegionalWeatherAlerts: 'Regional Weather Alerts',
    dashDetailedForecast: 'View Detailed Radar',
    dashLandslideWarningFooter: 'High Landslide Hazard on NH-6 Jowai belt',
    dashActivePill: 'Active',
    dashShillongNH40: 'Shillong Bypass / NH-40',
    dashNongpohNH6: 'Nongpoh Valley / NH-6',
    dashJowaiSilchar: 'Jowai–Ratacherra / Silchar Highway',
    fieldReportingTransmitted: 'GPS Data Acquired',
    headerLiveServerConnected: 'Live Server Connected',
    headerServerOffline: 'Server Offline / Local Cache',
    headerReportIncident: 'Report Incident',
    modalSeverityLevel: 'Severity Level',
    rolePublicTitle: 'Public Traveler / Driver',
    roleAuthorityTitle: 'Highway Authority & Disaster Nodal',
    roleLogisticsTitle: 'Logistics & Fleet Operator',
    publicCardVerifiedHazards: 'Verified Road Hazards',
    publicCardHazardsSub: 'Read-only corridor safety bulletins',
    publicCardViewBulletins: 'View Bulletins',
    publicCardWeatherWarnings: 'Weather & Rain Warnings',
    publicCardWeatherSub: 'Shillong, Silchar & Guwahati',
    publicCardCheckRadar: 'Check Radar',
    publicCardReportObstruction: 'Report Road Obstruction',
    publicCardReportSub: 'Submit photo to disaster authority queue',
    publicCardReportHazard: 'Report Hazard',
    authorityCardQueueTitle: 'Incident Verification Queue',
    authorityCardQueueSub: 'Review & approve citizen hazard reports',
    authorityCardOpenQueue: 'Open Queue',
    authorityCardCorridorHealth: 'Corridor Health & Saturation',
    authorityCardCorridorSub: 'District slope stability & roadblocks',
    authorityCardDashboard: 'Dashboard',
    authorityCardRainfallRadar: 'Rainfall & Weather Radar',
    authorityCardRadarSub: 'Regional precipitation telemetry',
    authorityCardViewRadar: 'View Radar',
    districtEastKhasi: 'East Khasi Hills',
    districtEastJaintia: 'East Jaintia Hills',
    districtRiBhoi: 'Ri-Bhoi',
    districtKamrupMetro: 'Kamrup Metropolitan',
    districtCachar: 'Cachar',
    dashCorridorStripTitle: 'Meghalaya – Assam Corridor',
    weatherRainUnit: 'Rain',
  },
  as: {
    logisticsApprove: 'বিতৰণ অনুমোদন কৰক',
    routeUpdating: 'পুনৰ গণনা চলিছে...',
    routeAssignVehicle: 'বাহনত আৱণ্টন কৰক',
    routeConfirmSend: 'নিশ্চিত কৰি ডাইভাৰ্চন প্ৰেৰণ কৰক',
    settingsPhone: 'ফোন নম্বৰ',
    settingsRefreshInterval: 'তথ্য সতেজ কৰাৰ ব্যৱধান',
    settingsSoundAlerts: 'শব্দ / কণ্ঠ সতৰ্কবাৰ্তা',
    navActiveSession: 'সক্ৰিয় অধিৱেশন',
    incidentsLandslide: 'ভূমিস্খলন',
    incidentsFlashFlood: 'হঠাত্‍ বানপানী',
    incidentsRockfall: 'শিলা পতন / ধ্বংসাৱশেষ',
    incidentsCongestion: 'যানজঁট',
    incidentsBridgeDamage: 'দলং ক্ষতিগ্ৰস্ত',
    incidentsNoHazards: 'কোনো বিপদ পোৱা নগ’ল',
    dashStateHighwayStatus: 'ৰাজ্যিক ঘাইপথৰ স্থিতি',
    dashLiveClearanceScore: 'বাস্তৱ সময়ৰ কৰিডৰ ক্লিয়াৰেন্স স্ক’ৰ',
    dashClearanceScoreHeader: 'ক্লিয়াৰেন্স সূচক',
    dashOperationalState: 'সম্পূৰ্ণ কাৰ্যক্ষম',
    dashRestrictedState: 'আংশিক পলম / সতৰ্কবাৰ্তা',
    dashRegionalTransportMonitoring: 'আঞ্চলিক পৰিবহণ নিৰীক্ষণ',
    dashRealtimeSync: 'সংযুক্ত • লাইভ জিপিএছ',
    dashRegionalWeatherAlerts: 'আঞ্চলিক বতৰ সতৰ্কবাৰ্তা',
    dashDetailedForecast: 'বিতং ৰাডাৰ চাওক',
    dashLandslideWarningFooter: 'এনএইচ-৬ জোৱাই অঞ্চলত উচ্চ ভূমিস্খলনৰ আশংকা',
    dashActivePill: 'সক্ৰিয়',
    dashShillongNH40: 'শ্বিলং বাইপাছ / এনএইচ-৪০',
    dashNongpohNH6: 'নংপোহ উপত্যকা / এনএইচ-৬',
    dashJowaiSilchar: 'জোৱাই–ৰাতাচেৰা / শিলচৰ ঘাইপথ',
    fieldReportingTransmitted: 'জিপিএছ তথ্য সংগৃহীত',
    headerLiveServerConnected: 'লাইভ চাৰ্ভাৰ সংযোগ হৈছে',
    headerServerOffline: 'চাৰ্ভাৰ অফলাইন / স্থানীয় কেচ',
    headerReportIncident: 'পথ দুৰ্ঘটনাৰ প্ৰতিবেদন দিয়ক',
    modalSeverityLevel: 'বিপদৰ তীব্ৰতাৰ স্তৰ',
    rolePublicTitle: 'সাধাৰণ যাত্ৰী / চালক',
    roleAuthorityTitle: 'ৰাষ্ট্ৰীয় ঘাইপথ প্ৰাধিকৰণ আৰু দুৰ্যোগ ন’ডেল',
    roleLogisticsTitle: 'পৰিবহণ আৰু ফ্লিট অপাৰেটৰ',
    publicCardVerifiedHazards: 'প্ৰমাণিত পথৰ বিপদসমূহ',
    publicCardHazardsSub: 'কৰিডৰ সুৰক্ষা নিৰ্দেশাৱলী',
    publicCardViewBulletins: 'বুলেটিন চাওক',
    publicCardWeatherWarnings: 'বতৰ আৰু বৰষুণৰ সতৰ্কবাণী',
    publicCardWeatherSub: 'শ্বিলং, শিলচৰ আৰু গুৱাহাটী',
    publicCardCheckRadar: 'ৰাডাৰ চাওক',
    publicCardReportObstruction: 'পথৰ বাধাৰ প্ৰতিবেদন দিয়ক',
    publicCardReportSub: 'দুৰ্যোগ প্ৰাধিকৰণৰ শাৰীত ছবি দাখিল কৰক',
    publicCardReportHazard: 'বিপদৰ প্ৰতিবেদন দিয়ক',
    authorityCardQueueTitle: 'ঘটনা পৰীক্ষণ শাৰী',
    authorityCardQueueSub: 'নাগৰিকৰ বিপদ প্ৰতিবেদন পৰীক্ষা আৰু অনুমোদন',
    authorityCardOpenQueue: 'শাৰী খোলক',
    authorityCardCorridorHealth: 'কৰিডৰ অৱস্থা আৰু চাপ',
    authorityCardCorridorSub: 'জিলা পাহাৰৰ সুস্থিৰতা আৰু পথৰ বাধা',
    authorityCardDashboard: 'ডেশ্ববৰ্ড',
    authorityCardRainfallRadar: 'বৰষুণ আৰু বতৰৰ ৰাডাৰ',
    authorityCardRadarSub: 'আঞ্চলিক বৃষ্টিপাত টেলিমিত্ৰি',
    authorityCardViewRadar: 'ৰাডাৰ চাওক',
    districtEastKhasi: 'পূব খাছী পাহাৰ',
    districtEastJaintia: 'পূব জয়ন্তীয়া পাহাৰ',
    districtRiBhoi: 'ৰি-ভৈ',
    districtKamrupMetro: 'কামৰূপ মহানগৰ',
    districtCachar: 'কাছাৰ',
    dashCorridorStripTitle: 'মেঘালয় – অসম কৰিডৰ',
    weatherRainUnit: 'বৰষুণ',
  },
  bn: {
    logisticsApprove: 'ডেলিভারি অনুমোদন করুন',
    routeUpdating: 'পুনরায় গণনা করা হচ্ছে...',
    routeAssignVehicle: 'গাড়িতে বরাদ্দ করুন',
    routeConfirmSend: 'নিশ্চিত করে ডাইভারশন পাঠান',
    settingsPhone: 'ফোন নম্বর',
    settingsRefreshInterval: 'তথ্য রিফ্রেশ ব্যবধান',
    settingsSoundAlerts: 'শব্দ / ভয়েস সতর্কতা',
    navActiveSession: 'সক্রিয় অধিবেশন',
    incidentsLandslide: 'ভূমিধস',
    incidentsFlashFlood: 'আকস্মিক বন্যা',
    incidentsRockfall: 'পাথর ধস / ধ্বংসাবশেষ',
    incidentsCongestion: 'যানজট',
    incidentsBridgeDamage: 'সেতু ক্ষতি',
    incidentsNoHazards: 'কোনো বিপদ পাওয়া যায়নি',
    dashStateHighwayStatus: 'রাজ্য মহাসড়ক অবস্থা',
    dashLiveClearanceScore: 'রিয়েল-টাইম করিডোর ক্লিয়ারেন্স স্কোর',
    dashClearanceScoreHeader: 'ক্লিয়ারেন্স সূচক',
    dashOperationalState: 'সম্পূর্ণ কার্যকর',
    dashRestrictedState: 'আংশিক বিলম্ব / সতর্কতা',
    dashRegionalTransportMonitoring: 'আঞ্চলিক পরিবহন পর্যবেক্ষণ',
    dashRealtimeSync: 'সংযুক্ত • লাইভ জিপিএস',
    dashRegionalWeatherAlerts: 'আঞ্চলিক আবহাওয়া সতর্কতা',
    dashDetailedForecast: 'বিস্তারিত রাডার দেখুন',
    dashLandslideWarningFooter: 'এনএইচ-৬ জোওয়াই অঞ্চলে উচ্চ ভূমিধসের ঝুঁকি',
    dashActivePill: 'সক্রিয়',
    dashShillongNH40: 'শিলং বাইপাস / এনএইচ-৪০',
    dashNongpohNH6: 'নংপোহ উপত্যকা / এনএইচ-৬',
    dashJowaiSilchar: 'জোওয়াই–রাতাচেরা / শিলচর হাইওয়ে',
    fieldReportingTransmitted: 'জিপিএস তথ্য সংগৃহীত',
    headerLiveServerConnected: 'লাইভ সার্ভার সংযুক্ত',
    headerServerOffline: 'সার্ভার অফলাইন / স্থানীয় ক্যাশ',
    headerReportIncident: 'সড়ক দুর্ঘটনার রিপোর্ট করুন',
    modalSeverityLevel: 'বিপদের মাত্রার স্তর',
    rolePublicTitle: 'সাধারণ যাত্রী / চালক',
    roleAuthorityTitle: 'হাইওয়ে কর্তৃপক্ষ ও বিপর্যয় নোডাল',
    roleLogisticsTitle: 'লজিস্টিক ও ফ্লিট অপারেটর',
    publicCardVerifiedHazards: 'যাচাইকৃত সড়ক ঝুঁকি',
    publicCardHazardsSub: 'করিডোর সুরক্ষা নির্দেশিকা',
    publicCardViewBulletins: 'বুলেটিন দেখুন',
    publicCardWeatherWarnings: 'আবহাওয়া ও বৃষ্টির সতর্কতা',
    publicCardWeatherSub: 'শিলং, শিলচর ও গুয়াহাটি',
    publicCardCheckRadar: 'রাডার দেখুন',
    publicCardReportObstruction: 'সড়ক বাধার রিপোর্ট করুন',
    publicCardReportSub: 'দুর্যোগ কর্তৃপক্ষের সারিতে ছবি জমা দিন',
    publicCardReportHazard: 'ঝুঁকি রিপোর্ট করুন',
    authorityCardQueueTitle: 'ঘটনা যাচাইকরণ সারি',
    authorityCardQueueSub: 'নাগরিকদের ঝুঁকি রিপোর্ট পর্যালোচনা ও অনুমোদন',
    authorityCardOpenQueue: 'সারি খুলুন',
    authorityCardCorridorHealth: 'করিডোর স্বাস্থ্য ও স্যাচুরেশন',
    authorityCardCorridorSub: 'জেলা ঢাল স্থিতিশীলতা ও রোডব্লক',
    authorityCardDashboard: 'ড্যাশবোর্ড',
    authorityCardRainfallRadar: 'বৃষ্টিপাত ও আবহাওয়া রাডার',
    authorityCardRadarSub: 'আঞ্চলিক বৃষ্টিপাত টেলিমেট্রি',
    authorityCardViewRadar: 'রাডার দেখুন',
    districtEastKhasi: 'পূর্ব খাসি পাহাড়',
    districtEastJaintia: 'পূর্ব জয়ন্তিয়া পাহাড়',
    districtRiBhoi: 'রি-ভোই',
    districtKamrupMetro: 'কামরূপ মহানগর',
    districtCachar: 'কাছাড়',
    dashCorridorStripTitle: 'মেঘালয় – আসাম করিডোর',
    weatherRainUnit: 'বৃষ্টি',
  },
  hi: {
    logisticsApprove: 'वितरण स्वीकृत करें',
    routeUpdating: 'पुनर्गणना जारी...',
    routeAssignVehicle: 'वाहन को सौंपें',
    routeConfirmSend: 'पुष्टि करें और डायवर्जन भेजें',
    settingsPhone: 'फ़ोन नंबर',
    settingsRefreshInterval: 'डेटा रीफ़्रेश अंतराल',
    settingsSoundAlerts: 'ऑडियो / ध्वनि अलर्ट',
    navActiveSession: 'सक्रिय सत्र',
    incidentsLandslide: 'भूस्खलन',
    incidentsFlashFlood: 'अचानक बाढ़',
    incidentsRockfall: 'चट्टान गिरना / मलबा',
    incidentsCongestion: 'यातायात जाम',
    incidentsBridgeDamage: 'पुल क्षति',
    incidentsNoHazards: 'कोई खतरा नहीं मिला',
    dashStateHighwayStatus: 'राज्य राजमार्ग स्थिति',
    dashLiveClearanceScore: 'लाइव कॉरिडोर क्लीयरेंस स्कोर',
    dashClearanceScoreHeader: 'क्लीयरेंस सूचकांक',
    dashOperationalState: 'पूर्ण रूप से चालू',
    dashRestrictedState: 'आंशिक देरी / चेतावनी',
    dashRegionalTransportMonitoring: 'क्षेत्रीय परिवहन निगरानी',
    dashRealtimeSync: 'जुड़ा हुआ • जीपीएस लाइव',
    dashRegionalWeatherAlerts: 'क्षेत्रीय मौसम अलर्ट',
    dashDetailedForecast: 'विस्तृत रडार देखें',
    dashLandslideWarningFooter: 'एनएच-6 जोवाई बेल्ट पर उच्च भूस्खलन खतरा',
    dashActivePill: 'सक्रिय',
    dashShillongNH40: 'शिलांग बाईपास / एनएच-40',
    dashNongpohNH6: 'नोंगपोह घाटी / एनएच-6',
    dashJowaiSilchar: 'जोवाई–रताचेरा / सिलचर हाईवे',
    fieldReportingTransmitted: 'जीपीएस डेटा प्राप्त',
    headerLiveServerConnected: 'लाइव सर्वर कनेक्टेड',
    headerServerOffline: 'सर्वर ऑफ़लाइन / स्थानीय कैश',
    headerReportIncident: 'सड़क घटना की रिपोर्ट करें',
    modalSeverityLevel: 'गंभीरता का स्तर',
    rolePublicTitle: 'सार्वजनिक यात्री / चालक',
    roleAuthorityTitle: 'राजमार्ग प्राधिकरण एवं आपदा नोडल',
    roleLogisticsTitle: 'लॉजिस्टिक्स एवं फ्लीट ऑपरेटर',
    publicCardVerifiedHazards: 'सत्यापित सड़क खतरे',
    publicCardHazardsSub: 'केवल पढ़ने योग्य गलियारा सुरक्षा बुलेटिन',
    publicCardViewBulletins: 'बुलेटिन देखें',
    publicCardWeatherWarnings: 'मौसम और बारिश की चेतावनी',
    publicCardWeatherSub: 'शिलांग, सिलचर और गुवाहाटी',
    publicCardCheckRadar: 'रडार देखें',
    publicCardReportObstruction: 'सड़क अवरोध की रिपोर्ट करें',
    publicCardReportSub: 'आपदा प्रबंधन कतार में फोटो भेजें',
    publicCardReportHazard: 'खतरे की रिपोर्ट करें',
    authorityCardQueueTitle: 'घटना सत्यापन कतार',
    authorityCardQueueSub: 'नागरिकों की रिपोर्ट की समीक्षा और अनुमोदन',
    authorityCardOpenQueue: 'कतार खोलें',
    authorityCardCorridorHealth: 'गलियारा स्थिति और घनत्व',
    authorityCardCorridorSub: 'जिला ढलान स्थिरता और सड़क अवरोध',
    authorityCardDashboard: 'डैशबोर्ड',
    authorityCardRainfallRadar: 'वर्षा एवं मौसम रडार',
    authorityCardRadarSub: 'क्षेत्रीय वर्षा टेलीमेट्री',
    authorityCardViewRadar: 'रडार देखें',
    districtEastKhasi: 'पूर्वी खासी हिल्स',
    districtEastJaintia: 'पूर्वी जयंतिया हिल्स',
    districtRiBhoi: 'री-भोई',
    districtKamrupMetro: 'कामरूप महानगर',
    districtCachar: 'कछार',
    dashCorridorStripTitle: 'मेघालय – असम गलियारा',
    weatherRainUnit: 'बारिश',
  },
  kha: {
    logisticsApprove: 'Mynjur Jingkit',
    routeUpdating: 'Dang kheiñ biang...',
    routeAssignVehicle: 'Ai sha ka Kali',
    routeConfirmSend: 'Pynskhem & Phah Detour',
    settingsPhone: 'Number Phone',
    settingsRefreshInterval: 'Pynsaphriang Data',
    settingsSoundAlerts: 'Sawa Jingmaham',
    navActiveSession: 'Session ba Treikam',
    incidentsLandslide: 'Twad Khyndew',
    incidentsFlashFlood: 'Shlei Um Kyrkieh',
    incidentsRockfall: 'Hap Maw / Jakhlia',
    incidentsCongestion: 'Sah Kali',
    incidentsBridgeDamage: 'Pait Jingkieng',
    incidentsNoHazards: 'Ym Don Jingma',
    dashStateHighwayStatus: 'Kyrdan Surok Jylla',
    dashLiveClearanceScore: 'Skor Pynkhuid Surok',
    dashClearanceScoreHeader: 'Dak Jinglah Leit',
    dashOperationalState: 'Treikam Bha',
    dashRestrictedState: 'Sah Kut shiphang',
    dashRegionalTransportMonitoring: 'Jingpeit Kali Shnong',
    dashRealtimeSync: 'Batei • GPS Live',
    dashRegionalWeatherAlerts: 'Maham Bha ka Suiñbneng',
    dashDetailedForecast: 'Peit Radar Bniah',
    dashLandslideWarningFooter: 'Khyndew twad jur ha NH-6 Jowai',
    dashActivePill: 'Treikam',
    dashShillongNH40: 'Shillong Bypass / NH-40',
    dashNongpohNH6: 'Nongpoh Valley / NH-6',
    dashJowaiSilchar: 'Jowai–Ratacherra / Silchar Highway',
    fieldReportingTransmitted: 'Ioh GPS Data',
    headerLiveServerConnected: 'Live Server Batei',
    headerServerOffline: 'Server Offline / Local Cache',
    headerReportIncident: 'Pyntip Jingeh Surok',
    modalSeverityLevel: 'Kyrdan Jingmaham',
    rolePublicTitle: 'Nongleit Nongwan / Nongniah',
    roleAuthorityTitle: 'Bor Surok & Disaster Nodal',
    roleLogisticsTitle: 'Logistics & Fleet Operator',
    publicCardVerifiedHazards: 'Ki Jingeh Surok ba la Sakhi',
    publicCardHazardsSub: 'Ki khubor shngain na ka bynta ka lynti',
    publicCardViewBulletins: 'Peit ia ki Khubor',
    publicCardWeatherWarnings: 'Jingmaham Suinbneng & Slap',
    publicCardWeatherSub: 'Shillong, Silchar & Guwahati',
    publicCardCheckRadar: 'Peit Radar',
    publicCardReportObstruction: 'Pyntip Jingeh ha Surok',
    publicCardReportSub: 'Phah dur sha ka queue bor',
    publicCardReportHazard: 'Pyntip Jingeh',
    authorityCardQueueTitle: 'Incident Verification Queue',
    authorityCardQueueSub: 'Peit & pynskhem ia ki report',
    authorityCardOpenQueue: 'Plie Queue',
    authorityCardCorridorHealth: 'Koit-Khiah & Jingbun Kali Surok',
    authorityCardCorridorSub: 'Jingshngain riat & jingdheng surok',
    authorityCardDashboard: 'Dashboard',
    authorityCardRainfallRadar: 'Jingslap & Suinbneng Radar',
    authorityCardRadarSub: 'Jingthew slap ha ka thain',
    authorityCardViewRadar: 'Peit Radar',
    districtEastKhasi: 'East Khasi Hills',
    districtEastJaintia: 'East Jaintia Hills',
    districtRiBhoi: 'Ri-Bhoi',
    districtKamrupMetro: 'Kamrup Metropolitan',
    districtCachar: 'Cachar',
    dashCorridorStripTitle: 'Meghalaya – Assam Corridor',
    weatherRainUnit: 'Slap',
  },
  mni: {
    logisticsApprove: 'ꯄꯣꯠ ꯌꯧꯕ ꯑꯌꯥꯕ ꯄꯤꯌꯨ',
    routeUpdating: 'ꯑꯃꯨꯛ ꯍꯟꯅ ꯂꯦꯞꯂꯤ...',
    routeAssignVehicle: 'ꯒꯥꯔꯤꯗ ꯄꯤꯌꯨ',
    routeConfirmSend: 'ꯂꯝꯕꯤ ꯑꯇꯣꯞꯄ ꯊꯥꯕꯤꯌꯨ',
    settingsPhone: 'ꯐꯣꯟ ꯅꯝꯕꯔ',
    settingsRefreshInterval: 'ꯗꯥꯇꯥ ꯅꯧꯅ ꯂꯧꯕꯒꯤ ꯃꯇꯝ',
    settingsSoundAlerts: 'ꯈꯣꯟꯖꯦꯜ ꯆꯦꯛꯁꯤꯟꯋꯥ',
    navActiveSession: 'ꯑꯦꯛꯇꯤꯚ ꯁꯦꯁꯟ',
    incidentsLandslide: 'ꯆꯤꯡ ꯇꯨꯝꯕ',
    incidentsFlashFlood: 'ꯑꯀꯟꯕ ꯏꯁꯤꯡ ꯏꯆꯥꯎ',
    incidentsRockfall: 'ꯅꯨꯡ ꯇꯥꯕ',
    incidentsCongestion: 'ꯒꯥꯔꯤ ꯊꯤꯡꯕ',
    incidentsBridgeDamage: 'ꯊꯣꯡ ꯀꯥꯏꯕ',
    incidentsNoHazards: 'ꯈꯨꯗꯣꯡꯊꯤꯕ ꯐꯪꯗꯦ',
    dashStateHighwayStatus: 'ꯁ꯭ꯇꯦꯠ ꯍꯥꯏꯋꯦ ꯐꯤꯚꯝ',
    dashLiveClearanceScore: 'ꯂꯝꯕꯤ ꯍꯥꯡꯗꯣꯛꯄꯒꯤ ꯁ꯭ꯀꯣꯔ',
    dashClearanceScoreHeader: 'ꯍꯥꯡꯕꯒꯤ ꯆꯥꯡ',
    dashOperationalState: 'ꯃꯄꯨꯡꯐꯥꯅ ꯆꯠꯊꯣꯛ-ꯆꯠꯁꯤꯟ ꯌꯥꯔꯦ',
    dashRestrictedState: 'ꯈꯔ ꯊꯦꯡꯊꯕ / ꯆꯦꯛꯁꯤꯟꯋꯥ',
    dashRegionalTransportMonitoring: 'ꯔꯤꯖꯅꯦꯜ ꯇ꯭ꯔꯥꯟꯁꯄꯣꯔ꯭ꯠ ꯌꯦꯡꯁꯤꯟꯕ',
    dashRealtimeSync: 'ꯁꯝꯅꯔꯦ • GPS ꯂꯥꯏꯚ',
    dashRegionalWeatherAlerts: 'ꯅꯣꯡ-ꯅꯨꯡꯁꯤꯠ ꯆꯦꯛꯁꯤꯟꯋꯥ',
    dashDetailedForecast: 'ꯔꯥꯗꯥꯔ ꯌꯦꯡꯕꯤꯌꯨ',
    dashLandslideWarningFooter: 'NH-6 ꯖꯣꯋꯥꯏ ꯂꯝꯕꯤꯗ ꯆꯤꯡ ꯇꯨꯝꯕꯒꯤ ꯑꯀꯟꯕ ꯈꯨꯗꯣꯡꯊꯤꯕ',
    dashActivePill: 'ꯑꯦꯛꯇꯤꯚ',
    dashShillongNH40: 'ꯁꯤꯂꯣꯡ ꯕꯥꯏꯄꯥꯁ / NH-40',
    dashNongpohNH6: 'ꯅꯣꯡꯄꯣ ꯇꯝꯄꯥꯛ / NH-6',
    dashJowaiSilchar: 'ꯖꯣꯋꯥꯏ–ꯔꯇꯥꯆꯦꯔꯥ / ꯁꯤꯜꯆꯔ ꯍꯥꯏꯋꯦ',
    fieldReportingTransmitted: 'GPS ꯗꯥꯇꯥ ꯐꯪꯂꯦ',
    headerLiveServerConnected: 'ꯂꯥꯏꯚ ꯁꯔꯚꯔ ꯁꯝꯅꯔꯦ',
    headerServerOffline: 'ꯁꯔꯚꯔ ꯑꯣꯐꯂꯥꯏꯟ / ꯂꯣꯀꯦꯜ ꯀꯦꯁ',
    headerReportIncident: 'ꯂꯝꯕꯤ ꯈꯨꯗꯣꯡꯊꯤꯕ ꯔꯤꯄꯣꯔ꯭ꯠ ꯇꯧꯕꯤꯌꯨ',
    modalSeverityLevel: 'ꯈꯨꯗꯣꯡꯊꯤꯕꯒꯤ ꯆꯥꯡ',
    rolePublicTitle: 'ꯃꯤꯌꯥꯃꯒꯤ ꯂꯝꯕꯣꯏꯕ / ꯒꯥꯔꯤ ꯊꯧꯕ',
    roleAuthorityTitle: 'ꯍꯥꯏꯋꯦ ꯑꯣꯊꯣꯔꯤꯇꯤ ꯑꯃꯁꯨꯡ ꯂꯩꯄꯥꯛ ꯑꯋꯥꯕ ꯅꯣꯗꯦꯜ',
    roleLogisticsTitle: 'ꯂꯣꯖꯤꯁ꯭ꯇꯤꯛꯁ ꯑꯃꯁꯨꯡ ꯒꯥꯔꯤ ꯃꯆꯥ ꯑꯣꯄꯔꯦꯇꯔ',
    publicCardVerifiedHazards: 'ꯌꯥꯔꯕ ꯂꯝꯕꯤꯒꯤ ꯈꯨꯗꯣꯡꯊꯤꯕꯁꯤꯡ',
    publicCardHazardsSub: 'ꯀꯣꯔꯤꯗꯣꯔꯒꯤ ꯆꯦꯛꯁꯤꯟ-ꯊꯧꯔꯥꯡ',
    publicCardViewBulletins: 'ꯕꯨꯂꯦꯇꯤꯟ ꯌꯦꯡꯕꯤꯌꯨ',
    publicCardWeatherWarnings: 'ꯅꯣꯡ-ꯅꯨꯡꯁꯤꯠꯀꯤ ꯆꯦꯛꯁꯤꯟꯋꯥ',
    publicCardWeatherSub: 'ꯁꯤꯂꯣꯡ, ꯁꯤꯂꯆꯔ ꯑꯃꯁꯨꯡ ꯒꯨꯋꯥꯍꯥꯇꯤ',
    publicCardCheckRadar: 'ꯔꯥꯗꯥꯔ ꯌꯦꯡꯕꯤꯌꯨ',
    publicCardReportObstruction: 'ꯂꯝꯕꯤ ꯊꯤꯡꯕ ꯔꯤꯄꯣꯔ꯭ꯠ ꯇꯧꯕꯤꯌꯨ',
    publicCardReportSub: 'ꯑꯋꯥꯕ ꯊꯣꯛꯄ ꯃꯇꯝꯗ ꯐꯣꯇꯣ ꯊꯥꯕꯤꯌꯨ',
    publicCardReportHazard: 'ꯈꯨꯗꯣꯡꯊꯤꯕ ꯔꯤꯄꯣꯔ꯭ꯠ ꯇꯧꯕꯤꯌꯨ',
    authorityCardQueueTitle: 'ꯊꯧꯗꯣꯛ ꯌꯦꯡꯁꯤꯟꯕꯒꯤ ꯂꯥꯏꯟ',
    authorityCardQueueSub: 'ꯃꯤꯌꯥꯃꯒꯤ ꯔꯤꯄꯣꯔ꯭ꯠ ꯌꯦꯡꯁꯤꯟꯕ ꯑꯃꯁꯨꯡ ꯌꯥꯕ',
    authorityCardOpenQueue: 'ꯂꯥꯏꯟ ꯍꯥꯡꯗꯣꯛꯎ',
    authorityCardCorridorHealth: 'ꯀꯣꯔꯤꯗꯣꯔꯒꯤ ꯐꯤꯚꯝ',
    authorityCardCorridorSub: 'ꯖꯤꯂꯥꯒꯤ ꯂꯝꯕꯤ ꯆꯦꯡꯕ',
    authorityCardDashboard: 'ꯗꯦꯁꯕꯣꯔ꯭ꯗ',
    authorityCardRainfallRadar: 'ꯅꯣꯡ ꯑꯃꯁꯨꯡ ꯅꯨꯡꯁꯤꯠꯀꯤ ꯔꯥꯗꯥꯔ',
    authorityCardRadarSub: 'ꯅꯣꯡ ꯆꯨꯕꯒꯤ ꯈꯪꯗꯣꯛꯄ',
    authorityCardViewRadar: 'ꯔꯥꯗꯥꯔ ꯌꯦꯡꯕꯤꯌꯨ',
    districtEastKhasi: 'ꯅꯣꯡꯄꯣꯛ ꯈꯥꯁꯤ ꯆꯤꯡꯁꯥꯡ',
    districtEastJaintia: 'ꯅꯣꯡꯄꯣꯛ ꯖꯥꯏꯟꯇꯤꯌꯥ ꯆꯤꯡꯁꯥꯡ',
    districtRiBhoi: 'ꯔꯤ-ꯚꯣꯏ',
    districtKamrupMetro: 'ꯀꯥꯃꯔꯨꯞ ꯃꯦꯠꯔꯣ',
    districtCachar: 'ꯀꯆꯥꯔ',
    dashCorridorStripTitle: 'ꯃꯦꯘꯥꯂꯌꯥ – ꯑꯁꯥꯝ ꯀꯣꯔꯤꯗꯣꯔ',
    weatherRainUnit: 'ꯅꯣꯡ',
  },
};

export function getAppTranslation(lang: LanguageCode): AppTranslations {
  const base = APP_TRANSLATIONS[lang] || APP_TRANSLATIONS.en;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const ex = EXTRA_TRANSLATIONS[lang] || EXTRA_TRANSLATIONS.en;
  return {
    ...base,
    ...ex,
    // Logistics
    logisticsTitle: base.cargoTitle,
    logisticsSubtitle: base.cargoSubtitle,
    logisticsNewFreight: base.cargoNewBtn,
    logisticsActiveLoads: base.cargoActiveLoads,
    logisticsCriticalCargo: base.cargoCriticalCargo,
    logisticsDelayedRoadblocks: base.cargoDelayedRoadblocks,
    logisticsOnTimeDelivery: base.cargoOnTimeDelivery,
    logisticsSearchPlaceholder: base.cargoSearchPlaceholder,
    logisticsAllStatuses: base.cargoAllStatuses,
    logisticsInTransit: base.cargoInTransit,
    logisticsDelayed: base.cargoDelayed,
    logisticsPending: base.queueTabPending || 'Pending',
    logisticsEta: base.cargoEtaLabel,
    logisticsReroute: base.cargoRerouteFreight,
    logisticsApprove: ex.logisticsApprove || 'Approve Delivery',
    logisticsTrackMap: base.cargoTrackOnMap,

    // Vehicles
    vehiclesTitle: base.fleetTitle,
    vehiclesSubtitle: base.fleetSubtitle,
    vehiclesAddNew: base.fleetAddBtn,
    vehiclesTotalFleet: base.fleetTotal,
    vehiclesOnTheRoad: base.fleetOnRoad,
    vehiclesDelayedHalted: base.fleetDelayedHalted,
    vehiclesAtDepot: base.fleetAtDepot,
    vehiclesSearchPlaceholder: base.fleetSearchPlaceholder,
    vehiclesReroute: base.fleetRerouteVehicle,
    vehiclesTrackMap: base.fleetTrackOnMap,
    vehiclesCallDriver: base.fleetCallDriver,

    // Routes
    routeOptimalTitle: base.routeOptTitle,
    routeBVerified: base.routeVerifiedBadge,
    routeUpdating: ex.routeUpdating || 'Recalculating...',
    routeRecalculate: base.routeRecalcBtn,
    routeHighRisk: base.routeHighRiskBadge,
    routeSelectedRoute: base.dashPlanRouteBtn || 'Selected Route',
    routeAssignVehicle: ex.routeAssignVehicle || 'Assign to Vehicle',
    routeConfirmSend: ex.routeConfirmSend || 'Confirm & Send Detour',
    routeAnalysisUpdated: base.weatherLastUpdated || 'Route Analysis Updated',

    // Modal
    modalTitle: t.reportRoadIncident || 'Report Incident',
    modalAdjust: 'Adjust Pin',
    modalAttachPhoto: base.fieldPhotoLabel || 'Attach Field Photo',
    modalClickUpload: base.fieldPhotoLabel || 'Click to Upload',
    modalIncidentDetails: base.incidentsDetailsTitle || 'Incident Details',
    modalIncidentType: base.fieldHazardCatLabel || 'Hazard Type',
    modalSeverityLevel: ex.modalSeverityLevel || 'Severity Level',
    modalLow: base.weatherRiskLow || 'Low',
    modalMedium: base.weatherRiskModerate || 'Medium',
    modalHighCritical: base.weatherRiskCritical || 'Critical / High',
    modalCoordinates: base.incidentsGpsCoords || 'Coordinates',
    modalFetchGps: base.fieldUseLocationBtn || 'Fetch GPS',
    modalLandmark: base.incidentsCorridorLandmark || 'Landmark',
    modalDistrict: base.incidentsDistrictState || 'District',
    modalDescription: base.fieldObservationsLabel || 'Field Notes',
    modalRoadStatus: base.fieldPassageStatusLabel || 'Passage Status',
    modalPassable: base.statusPassable,
    modalRestricted: base.statusRestricted,
    modalClosed: base.statusBlocked,
    modalSaveDraft: 'Save Draft',
    modalSubmit: base.fieldSubmitReport || 'Submit Incident Report',

    // Settings
    settingsSwitchProfile: base.settingsSwitchTitle,
    settingsSwitchDesc: base.settingsSwitchSubtitle,
    settingsPersonalPref: base.settingsContactTitle,
    settingsEmail: base.settingsOfficialEmail,
    settingsPhone: ex.settingsPhone || 'Phone Number',
    settingsRefreshInterval: ex.settingsRefreshInterval || 'Data Refresh Interval',
    settingsSoundAlerts: ex.settingsSoundAlerts || 'Audio / Voice Alerts',
    settingsSaveChanges: base.settingsSaveBtn,

    // Sidebar
    navActiveSession: ex.navActiveSession || 'Active Session',

    // Weather
    weatherStation: base.weatherTitle || 'Weather Station',
    weatherSlopeTitle: base.weatherSaturationTitle || 'Slope Stability & Saturation Index',

    // Verification Queue
    verificationQueueSubtitle: base.queueSubtitle,
    verificationQueuePending: base.queueTabPending,
    verificationQueueVerified: base.queueTabVerified,
    verificationQueueDismissed: base.queueTabRejected,
    verificationQueueAuthorityAction: base.queueVerifyAction,
    verificationQueueOfficialStatus: base.fieldPassageStatusLabel,
    verificationQueueClearanceEta: base.fieldEstDelayLabel,
    verificationQueueOfficialNote: base.fieldObservationsLabel,
    verificationQueueVerifyBroadcast: base.queueVerifyAction,
    verificationQueueDismiss: base.queueDismissAction,
    verificationQueueSelectReport: base.queueReviewBtn,

    // Incidents
    incidentsReportNew: base.incidentsReportBtn,
    incidentsCritical: base.weatherRiskCritical,
    incidentsHigh: base.weatherRiskHigh,
    incidentsMedium: base.weatherRiskModerate,
    incidentsLow: base.weatherRiskLow,
    incidentsAllHazards: base.incidentsAllTypes,
    incidentsLandslide: ex.incidentsLandslide || 'Landslide',
    incidentsFlashFlood: ex.incidentsFlashFlood || 'Flash Flood',
    incidentsRockfall: ex.incidentsRockfall || 'Rockfall / Debris',
    incidentsCongestion: ex.incidentsCongestion || 'Traffic Congestion',
    incidentsBridgeDamage: ex.incidentsBridgeDamage || 'Bridge Damage',
    incidentsNoHazards: ex.incidentsNoHazards || 'No Hazards Found',
    incidentsSource: base.incidentsReportingSource,
    incidentsDelay: base.fieldEstDelayLabel,
    incidentsViewDetails: base.incidentsDetailsTitle,
    incidentsGpsCoordinates: base.incidentsGpsCoords,
    incidentsEstClearance: base.incidentsEstimatedClearance,
    incidentsViewOnLiveMap: base.dashViewOnMap,
    incidentsReportUpdate: base.incidentsReportBtn,
    incidentsVerificationQueue: base.navIncidentVerificationQueue,
    incidentsViewOnMap: base.dashViewOnMap,
    incidentsFindSafeDetour: base.incidentsCalculateDetour,
    incidentsNoSelectedTitle: base.incidentsTitle,
    incidentsNoSelectedSub: base.incidentsSubtitle,
    incidentsFilterAllDistricts: base.fieldDistrictLabel,
    incidentsColStatus: base.fieldPassageStatusLabel,

    // Dashboard
    dashCorridorOps: base.dashBannerTitle,
    dashCoveringArteries: base.dashCorridorSub,
    dashPlanRouteDetour: base.dashPlanRouteBtn,
    dashRoadClearance: base.dashClearanceTitle,
    dashClearanceSub: base.dashClearanceNote,
    dashCritical: base.dash2Critical,
    dashBlockagesSub: base.dashSingleLaneOpen,
    dashVehiclesDispatched: base.dashDispatchedCount,
    dashFleetSub: base.dashFleetDiversionNote,
    dashRainSub: base.dashRainBeltSaturated,
    dashShillongNH40: ex.dashShillongNH40 || 'Shillong Bypass / NH-40',
    dashNongpohNH6: ex.dashNongpohNH6 || 'Nongpoh Valley / NH-6',
    dashJowaiSilchar: ex.dashJowaiSilchar || 'Jowai–Ratacherra / Silchar Highway',
    dashBlockedLabel: base.mapStatusBlocked,
    dashRestrictedLabel: base.mapStatusRestricted,
    dashMovingLabel: base.statusMoving,
    dashViewFullscreenMap: base.dashViewOnMap,
    dashAlternativeRoute: base.routeSaferBypass,
    dashReviewBypass: base.routeBypassDesc,
    dashStateHighwayStatus: ex.dashStateHighwayStatus || 'State Highway Status',
    dashLiveClearanceScore: ex.dashLiveClearanceScore || 'Live Corridor Clearance Score',
    dashClearanceScoreHeader: ex.dashClearanceScoreHeader || 'Clearance Index',
    dashOperationalState: ex.dashOperationalState || 'Fully Operational',
    dashRestrictedState: ex.dashRestrictedState || 'Partial Delay / Warning',
    dashRegionalTransportMonitoring: ex.dashRegionalTransportMonitoring || 'Regional Transport Monitoring',
    dashRealtimeSync: ex.dashRealtimeSync || 'Connected • GPS Live',
    dashRegionalWeatherAlerts: ex.dashRegionalWeatherAlerts || 'Regional Weather Alerts',
    dashDetailedForecast: ex.dashDetailedForecast || 'View Detailed Radar',
    dashLandslideWarningFooter: ex.dashLandslideWarningFooter || 'High Landslide Hazard on NH-6 Jowai belt',
    dashActivePill: ex.dashActivePill || 'Active',

    // Field Reporting
    fieldReportingTitle: base.fieldTitle,
    fieldReportingSubtitle: base.fieldSubtitle,
    fieldReportingUseLocation: base.fieldUseLocationBtn,
    fieldReportingTransmitted: ex.fieldReportingTransmitted || 'GPS Data Acquired',
    fieldReportingState: base.fieldStateLabel,
    fieldReportingDistrict: base.fieldDistrictLabel,
    fieldReportingLandmark: base.fieldCorridorLabel,
    fieldReportingHazardCategory: base.fieldHazardCatLabel,
    fieldReportingRoadPassage: base.fieldPassageStatusLabel,
    fieldReportingDelay: base.fieldEstDelayLabel,
    fieldReportingObservations: base.fieldObservationsLabel,
    fieldReportingImageProof: base.fieldPhotoLabel,
    fieldReportingSubmit: base.fieldSubmitReport,

    // Header & verification
    headerLiveServerConnected: t.liveServerConnected || ex.headerLiveServerConnected || 'Live Server Connected',
    headerServerOffline: ex.headerServerOffline || 'Server Offline / Local Cache',
    headerReportIncident: t.reportRoadIncident || ex.headerReportIncident || 'Report Incident',
    verificationQueueTitle: base.queueTitle,
  };
}
