export type UserRole = 'public' | 'authority' | 'logistics' | 'admin' | 'dispatcher' | 'field';

export const isPublicUser = (role: UserRole): boolean => role === 'public' || role === 'field';
export const isAuthorityUser = (role: UserRole): boolean => role === 'authority' || role === 'admin';
export const isLogisticsUser = (role: UserRole): boolean => role === 'logistics' || role === 'dispatcher';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  roleTitle: string;
  roleBadge: string;
  avatar: string;
  assignedSectors: string[];
}

export type RoadStatus = 'open' | 'restricted' | 'blocked';
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type HazardType = 
  | 'Landslide' 
  | 'Flash Flood' 
  | 'Rockfall' 
  | 'Mudflow' 
  | 'Bridge/Culvert Damage' 
  | 'Commercial Congestion'
  | 'Road Subsidence';

export interface Incident {
  id: string;
  code: string;
  title: string;
  location: string;
  district: string;
  state: string;
  landmark: string;
  coordinates: [number, number]; // [lat, lng]
  status: 'PASSABLE' | 'RESTRICTED' | 'BLOCKED';
  severity: IncidentSeverity;
  timeAgo: string;
  timestamp: string;
  delayText: string;
  description: string;
  hazardType: HazardType;
  reportedBy?: string;
  photoUrl?: string;
  detourRouteId?: string;
  verificationStatus?: 'VERIFIED' | 'PENDING' | 'REJECTED';
  clearanceEta?: string;
  officialNotes?: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  modelType: string;
  tonnage: string;
  status: 'MOVING' | 'DELAYED' | 'IDLE';
  currentRoute: string;
  currentLocation: string;
  coordinates: [number, number];
  speedKmh: number;
  fuelPercent: number;
  driverName: string;
  driverPhone: string;
  alertNote?: string;
  coldChainTemp?: string;
}

export interface Shipment {
  id: string;
  code: string;
  commodity: string;
  commodityDetails: string;
  priority: 'HIGH' | 'NORMAL';
  origin: string;
  destination: string;
  assignedVehicle: string;
  driverName: string;
  eta: string;
  status: 'IN TRANSIT' | 'DELAYED' | 'PENDING' | 'DELIVERED';
  riskScore: number;
  riskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk' | 'Critical Risk';
  delayText?: string;
}

export interface OperationalAlert {
  id: string;
  type: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  title: string;
  timeAgo: string;
  message: string;
  relatedIncidentId?: string;
  isRead: boolean;
}

export interface HubWeather {
  city: string;
  hubType: string;
  temp: number;
  condition: string;
  rainProb: number;
  windSpeed: string;
  iconName: string;
}

export interface RouteOption {
  id: string;
  name: string;
  label: string;
  riskScore: number;
  riskLabel: string;
  distanceKm: number;
  estTravelTime: string;
  viaDescription: string;
  highlightNote: string;
  advisories: {
    label: string;
    text: string;
    tone?: 'warning' | 'alert' | 'success' | 'neutral';
  }[];
  waypoints: [number, number][];
}
