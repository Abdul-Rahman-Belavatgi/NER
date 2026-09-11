import { UserProfile, Incident, Vehicle, Shipment, OperationalAlert, HubWeather, RouteOption } from '../types';

export const OPERATOR_PROFILES: Record<string, UserProfile> = {
  public: {
    id: 'public',
    name: 'General Public & Drivers',
    email: 'public.traveler@nertravel.gov.in',
    phone: '+91 94350 00000',
    role: 'public',
    roleTitle: 'General Public & Drivers (Unauthenticated / Public View)',
    roleBadge: 'Public View',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    assignedSectors: ['All Regional Corridors']
  },
  authority: {
    id: 'authority',
    name: 'Capt. Arjun Das',
    email: 'a.das@bro.gov.in',
    phone: '+91 94350 11200',
    role: 'authority',
    roleTitle: 'Government & Disaster Authority (BRO / SDMA / Police)',
    roleBadge: 'Govt & Disaster Authority',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    assignedSectors: ['Kamrup Metropolitan', 'East Khasi Hills', 'Cachar (Silchar)', 'East Jaintia Hills']
  },
  logistics: {
    id: 'logistics',
    name: 'B. Borah',
    email: 'b.borah@nerlogistics.in',
    phone: '+91 98111 22334',
    role: 'logistics',
    roleTitle: 'Logistics & Fleet Operator (Transporter / Dispatcher)',
    roleBadge: 'Logistics & Fleet Operator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    assignedSectors: ['East Khasi Hills', 'Ri-Bhoi', 'Guwahati-Silchar Corridor']
  },
  // Backward compatibility aliases
  admin: {
    id: 'authority',
    name: 'Capt. Arjun Das',
    email: 'a.das@bro.gov.in',
    phone: '+91 94350 11200',
    role: 'authority',
    roleTitle: 'Government & Disaster Authority (BRO / SDMA / Police)',
    roleBadge: 'Govt & Disaster Authority',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    assignedSectors: ['Kamrup Metropolitan', 'East Khasi Hills', 'Cachar (Silchar)', 'East Jaintia Hills']
  },
  dispatcher: {
    id: 'logistics',
    name: 'B. Borah',
    email: 'b.borah@nerlogistics.in',
    phone: '+91 98111 22334',
    role: 'logistics',
    roleTitle: 'Logistics & Fleet Operator (Transporter / Dispatcher)',
    roleBadge: 'Logistics & Fleet Operator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    assignedSectors: ['East Khasi Hills', 'Ri-Bhoi', 'Guwahati-Silchar Corridor']
  },
  field: {
    id: 'public',
    name: 'Public Traveler / Driver',
    email: 'traveler@nertravel.org',
    phone: '+91 94350 00000',
    role: 'public',
    roleTitle: 'General Public & Commercial Drivers (Public View)',
    roleBadge: 'Public Traveler',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    assignedSectors: ['All Regional Corridors']
  }
};

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'inc-1',
    code: 'INC-8921',
    title: 'Major Landslide near Sonapur Tunnel',
    location: 'East Jaintia Hills, Meghalaya',
    district: 'East Jaintia Hills',
    state: 'Meghalaya',
    landmark: 'NH-44 / NH-6 Sonapur Corridor',
    coordinates: [25.132, 92.355],
    status: 'BLOCKED',
    severity: 'critical',
    timeAgo: '15 mins ago',
    timestamp: 'Today, 06:45',
    delayText: '> 4 Hours',
    hazardType: 'Landslide',
    reportedBy: 'BRO 44 Task Force',
    description: 'NH-44 / NH-6 blocked near Sonapur. Heavy debris flow reported following intense monsoon rains. Clearance team and excavators dispatched.',
    photoUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'VERIFIED',
    clearanceEta: '4 - 6 Hours (Estimated 14:00)',
    officialNotes: 'Excavators operating on-site. Heavy traffic halted at Ladrymbai.'
  },
  {
    id: 'inc-2',
    code: 'INC-8922',
    title: 'Lowland Inundation & Flash Flooding',
    location: 'Cachar, Assam',
    district: 'Cachar',
    state: 'Assam',
    landmark: 'Lowland Route B Silchar District',
    coordinates: [24.833, 92.779],
    status: 'RESTRICTED',
    severity: 'medium',
    timeAgo: '2 hours ago',
    timestamp: 'Today, 05:00',
    delayText: '2 - 3 Hours',
    hazardType: 'Flash Flood',
    reportedBy: 'District Disaster Authority (DDMA)',
    description: 'Lowland Route B Silchar District inundated by 1.2m overflow. Waterlogging slowing down freight movement severely.',
    photoUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'VERIFIED',
    clearanceEta: 'Receding slowly, 2 - 3 Hours',
    officialNotes: 'Passable for high-clearance 6-axle and multi-axle trucks only.'
  },
  {
    id: 'inc-3',
    code: 'INC-8923',
    title: 'River Crossing Bridge Structural Repair',
    location: 'Kamrup Metropolitan, Assam',
    district: 'Kamrup Metropolitan',
    state: 'Assam',
    landmark: 'River Crossing 4 in Guwahati outskirts',
    coordinates: [26.144, 91.736],
    status: 'PASSABLE',
    severity: 'low',
    timeAgo: 'Yesterday, 14:30',
    timestamp: 'Yesterday, 14:30',
    delayText: '15 mins',
    hazardType: 'Bridge/Culvert Damage',
    reportedBy: 'PWD Road Inspection Team',
    description: 'River Crossing 4 in Guwahati outskirts under single-lane maintenance. Structural sensors show stable conditions.',
    verificationStatus: 'VERIFIED',
    clearanceEta: 'Scheduled completion 18:00',
    officialNotes: 'Single lane alternate pilot convoy management active.'
  },
  {
    id: 'inc-4',
    code: 'INC-8924',
    title: 'Unstable Slopes & Rockfall Warning near Umiam',
    location: 'Ri-Bhoi, Meghalaya',
    district: 'Ri-Bhoi',
    state: 'Meghalaya',
    landmark: 'NH-6 Umiam Lake Gradient',
    coordinates: [25.666, 91.895],
    status: 'RESTRICTED',
    severity: 'medium',
    timeAgo: '45 mins ago',
    timestamp: 'Today, 06:15',
    delayText: '45 mins',
    hazardType: 'Rockfall',
    reportedBy: 'Meghalaya Highway Patrol',
    description: 'Boulders falling across northbound lane near Umiam Lake gradient. Warning signage posted; speed limited to 20 km/h.',
    photoUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'VERIFIED',
    clearanceEta: 'Active patrol on-site',
    officialNotes: 'Loose scree clearing in progress.'
  },
  // Pending Citizen Submissions for Authority Verification Queue
  {
    id: 'inc-pending-1',
    code: 'INC-CIT-7021',
    title: 'Citizen Report: Fallen Boulders & Mudslide near Umtyngar',
    location: 'East Khasi Hills, Meghalaya',
    district: 'East Khasi Hills',
    state: 'Meghalaya',
    landmark: 'SH-5 Cherrapunji-Shillong Junction',
    coordinates: [25.412, 91.821],
    status: 'RESTRICTED',
    severity: 'high',
    timeAgo: '12 mins ago',
    timestamp: 'Today, 07:15',
    delayText: '45 - 60 mins',
    hazardType: 'Rockfall',
    reportedBy: 'Citizen Traveler (R. Marbaniang — Verified Mobile +91 94361 22819)',
    description: 'Massive pine tree snapped and two car-sized boulders rolled onto the lane. Light vehicles navigating via mud shoulder with extreme difficulty.',
    photoUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'PENDING',
    clearanceEta: 'Awaiting Patrol Confirmation',
    officialNotes: 'Pending SDMA / Police verification. Patrol vehicle Dispur-04 dispatched to inspect.'
  },
  {
    id: 'inc-pending-2',
    code: 'INC-CIT-7022',
    title: 'Citizen Report: Flash Mudflow & Water Accumulation near Umkiang',
    location: 'East Jaintia Hills, Meghalaya',
    district: 'East Jaintia Hills',
    state: 'Meghalaya',
    landmark: 'NH-6 Umkiang Bazaar Stretch',
    coordinates: [25.045, 92.382],
    status: 'BLOCKED',
    severity: 'critical',
    timeAgo: '28 mins ago',
    timestamp: 'Today, 06:58',
    delayText: '> 3 Hours',
    hazardType: 'Mudflow',
    reportedBy: 'Freight Driver (S. Lyngdoh — Vehicle AS-01-GC-4122)',
    description: 'Slurry mud overflowed from the hill slope cutting off both lanes for heavy commercial trucks. 14 trucks queued up.',
    photoUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'PENDING',
    clearanceEta: 'Pending Earthmover Deployment',
    officialNotes: 'Requires BRO clearance validation before publishing officially to national map.'
  },
  {
    id: 'inc-5',
    code: 'INC-8925',
    title: 'Guwahati Depot Heavy Commercial Congestion',
    location: 'Kamrup Metropolitan, Assam',
    district: 'Kamrup Metropolitan',
    state: 'Assam',
    landmark: 'Beltola logistics hub',
    coordinates: [26.121, 91.791],
    status: 'RESTRICTED',
    severity: 'medium',
    timeAgo: '1 hour ago',
    timestamp: 'Today, 06:00',
    delayText: '30 mins',
    hazardType: 'Commercial Congestion',
    reportedBy: 'Assam Police Traffic Unit',
    description: 'Heavy container transport tailback entering Beltola logistics hub due to customs checkpoint.'
  }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'v-1',
    plate: 'AS-01-AB-1234',
    modelType: 'Heavy Duty Truck',
    tonnage: '18T',
    status: 'MOVING',
    currentRoute: 'Guwahati to Shillong Corridor',
    currentLocation: 'NH-6 near Nongpoh',
    coordinates: [25.901, 91.881],
    speedKmh: 65,
    fuelPercent: 45,
    driverName: 'Ramesh Kumar',
    driverPhone: '+91 98765 43210'
  },
  {
    id: 'v-2',
    plate: 'AS-01-XY-9876',
    modelType: 'Refrigerated Van • 5T (Vaccines & Insulin)',
    tonnage: '5T',
    status: 'DELAYED',
    currentRoute: 'Shillong to Silchar Civil Depot',
    currentLocation: 'Halted before Sonapur Tunnel',
    coordinates: [25.138, 92.348],
    speedKmh: 0,
    fuelPercent: 82,
    driverName: 'Bikash Das',
    driverPhone: '+91 94350 11223',
    alertNote: 'Cold chain temp spike (+8.4°C). Max storage limit: +4.0°C. Temperature exceeded by 4.4°C.',
    coldChainTemp: '+8.4°C'
  },
  {
    id: 'v-3',
    plate: 'ML-05-CD-4567',
    modelType: 'Standard Truck',
    tonnage: '10T',
    status: 'IDLE',
    currentRoute: 'Guwahati Hub Staging Area',
    currentLocation: 'Guwahati Depot Loading Bay 4',
    coordinates: [26.152, 91.725],
    speedKmh: 0,
    fuelPercent: 95,
    driverName: 'Sunil Chettri',
    driverPhone: '+91 98540 66778'
  },
  {
    id: 'v-4',
    plate: 'AS-12-BC-9087',
    modelType: 'Heavy Lorry',
    tonnage: '24T',
    status: 'MOVING',
    currentRoute: 'Guwahati to Tezpur Food Depot',
    currentLocation: 'NH-27 near Nagaon Bypass',
    coordinates: [26.347, 92.684],
    speedKmh: 52,
    fuelPercent: 68,
    driverName: 'Manabendra Roy',
    driverPhone: '+91 97060 44556'
  },
  {
    id: 'v-5',
    plate: 'TR-01-MN-7722',
    modelType: 'Light Cargo Truck',
    tonnage: '7.5T',
    status: 'MOVING',
    currentRoute: 'Tezpur to Jorhat Distribution Center',
    currentLocation: 'Approaching Jorhat Distribution Center',
    coordinates: [26.750, 94.216],
    speedKmh: 58,
    fuelPercent: 74,
    driverName: 'Debojit Borah',
    driverPhone: '+91 98640 99887'
  }
];

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'shp-1',
    code: '#SHP-8921',
    commodity: 'Medical Supplies',
    commodityDetails: 'Emergency vaccines & trauma kits (450 kg)',
    priority: 'HIGH',
    origin: 'Guwahati Central Depot',
    destination: 'Guwahati Medical College / Shillong Civil',
    assignedVehicle: 'Truck AS-01-HC-1234',
    driverName: 'Ramesh Kumar',
    eta: 'Arriving in 2h 15m',
    status: 'IN TRANSIT',
    riskScore: 45,
    riskLevel: 'Medium Risk'
  },
  {
    id: 'shp-2',
    code: '#SHP-8922',
    commodity: 'Rice & Grains',
    commodityDetails: 'Rice (500 bags • 25 metric tons)',
    priority: 'NORMAL',
    origin: 'FCI Depot Guwahati',
    destination: 'Tezpur Supply Depot',
    assignedVehicle: 'Lorry AS-12-BC-9087',
    driverName: 'Manabendra Roy',
    eta: 'Arriving in 4h 30m',
    status: 'IN TRANSIT',
    riskScore: 12,
    riskLevel: 'Low Risk'
  },
  {
    id: 'shp-3',
    code: '#SHP-8915',
    commodity: 'Diesel Fuel',
    commodityDetails: 'Generator Fuel (12,000 Liters)',
    priority: 'HIGH',
    origin: 'Numaligarh Refinery Depot',
    destination: 'Silchar District Supply Depot',
    assignedVehicle: 'Tanker AS-11-XX-4455',
    driverName: 'Bikash Das',
    eta: '⚠️ Delayed by 3h',
    delayText: 'Delayed by 3h',
    status: 'DELAYED',
    riskScore: 88,
    riskLevel: 'Critical Risk'
  },
  {
    id: 'shp-4',
    code: '#SHP-8925',
    commodity: 'Camp Equipment',
    commodityDetails: 'Shelter tents & solar power inverters (3.2T)',
    priority: 'NORMAL',
    origin: 'Tezpur Logistics Depot',
    destination: 'Jorhat Distribution Center',
    assignedVehicle: 'Truck TR-01-MN-7722',
    driverName: 'Debojit Borah',
    eta: 'Arriving in 1h 10m',
    status: 'IN TRANSIT',
    riskScore: 18,
    riskLevel: 'Low Risk'
  },
  {
    id: 'shp-5',
    code: '#SHP-8930',
    commodity: 'Relief Kits',
    commodityDetails: 'Water purification tablets & rations (800 units)',
    priority: 'HIGH',
    origin: 'State Medical Stores (Shillong)',
    destination: 'Jowai District Hospital',
    assignedVehicle: 'Truck ML-05-CD-4567',
    driverName: 'Sunil Chettri',
    eta: 'Standby for Departure',
    status: 'PENDING',
    riskScore: 32,
    riskLevel: 'Medium Risk'
  }
];

export const INITIAL_ALERTS: OperationalAlert[] = [
  {
    id: 'alt-1',
    type: 'CRITICAL',
    title: 'Vehicles Halted: Landslide on NH-6 (Near Sonapur)',
    timeAgo: '2m ago',
    message: 'Major landslide reported blocking North-South corridor near Shillong / Sonapur. 3 vehicles halted. Re-routing required.',
    relatedIncidentId: 'inc-1',
    isRead: false
  },
  {
    id: 'alt-2',
    type: 'HIGH',
    title: 'Severe Weather Warning',
    timeAgo: '15m ago',
    message: 'Heavy rainfall (>65mm) predicted across East Jaintia Hills and Jowai belt over next 4 hours. High flash flood and slope slip risk.',
    isRead: false
  },
  {
    id: 'alt-3',
    type: 'MEDIUM',
    title: 'Temperature Alert: Truck AS-01-XY-9876',
    timeAgo: '1h ago',
    message: 'Refrigerated van carrying vaccines reported temperature spike (+8.4°C) while halted at Sonapur bypass.',
    isRead: false
  },
  {
    id: 'alt-4',
    type: 'INFO',
    title: 'Guwahati Depot Traffic Clearance',
    timeAgo: '2h ago',
    message: 'NH-27 River Crossing 4 lane reopened for two-way freight traffic following successful bridge joint maintenance.',
    isRead: false
  }
];

export const INITIAL_WEATHER_HUBS: HubWeather[] = [
  {
    city: 'Shillong',
    hubType: 'Shillong (Meghalaya)',
    temp: 18,
    condition: 'Heavy Rain & Mountain Mist',
    rainProb: 92,
    windSpeed: '24 km/h wind',
    iconName: 'CloudRain'
  },
  {
    city: 'Guwahati',
    hubType: 'Guwahati (Assam Hub)',
    temp: 28,
    condition: 'Humid & Passing Clouds',
    rainProb: 35,
    windSpeed: '14 km/h wind',
    iconName: 'CloudSun'
  },
  {
    city: 'Silchar',
    hubType: 'Silchar (Barak Valley)',
    temp: 24,
    condition: 'Monsoon Downpours',
    rainProb: 88,
    windSpeed: '22 km/h wind',
    iconName: 'CloudLightning'
  },
  {
    city: 'Kohima',
    hubType: 'Kohima (Nagaland Hub)',
    temp: 20,
    condition: 'Overcast & Mountain Mist',
    rainProb: 65,
    windSpeed: '16 km/h wind',
    iconName: 'CloudRain'
  }
];

export const ROUTE_OPTIONS: Record<string, RouteOption> = {
  routeB: {
    id: 'routeB',
    name: 'RECOMMENDED SAFER ROUTE (Route B)',
    label: 'Route B (Recommended)',
    riskScore: 57,
    riskLabel: 'High Risk',
    distanceKm: 196,
    estTravelTime: 'est. 4h 15m',
    viaDescription: 'Via: NH-6 via Nongpoh 4-Lane Expressway',
    highlightNote: 'Bypasses active mountain landslides and blocked tunnel segments.',
    advisories: [
      { label: 'Moderate Advisory', text: 'Minor delay expected near River Crossing 4, Guwahati District', tone: 'neutral' },
      { label: 'Hazard Proximity', text: 'Restricted flow near Beltola Logistics Hub, Guwahati', tone: 'warning' },
      { label: 'Scattered Rainfall', text: 'Steady showers expected (22mm)', tone: 'neutral' },
      { label: 'Clear Segment', text: 'Road inspected and marked open by regional transport center', tone: 'success' }
    ],
    waypoints: [
      [26.144, 91.736], // Guwahati
      [26.050, 91.820],
      [25.901, 91.881], // Nongpoh
      [25.750, 91.900],
      [25.578, 91.893]  // Shillong
    ]
  },
  routeA: {
    id: 'routeA',
    name: 'DIRECT ROUTE (Route A)',
    label: 'Route A',
    riskScore: 94,
    riskLabel: 'Critical Risk',
    distanceKm: 182,
    estTravelTime: 'est. 3h 45m',
    viaDescription: 'Via: NH-6 via Old Umiam Alignment',
    highlightNote: 'Rockfall warning at Umiam Lake Viewpoint Pass',
    advisories: [
      { label: 'Moderate Advisory', text: 'Minor delay expected near River Crossing 4, Guwahati District', tone: 'neutral' },
      { label: 'Hazard Proximity', text: 'Restricted flow near Umiam Lake Viewpoint Pass', tone: 'alert' },
      { label: 'Hazard Proximity', text: 'Restricted flow near Beltola Logistics Hub, Guwahati', tone: 'alert' },
      { label: 'Heavy Rainfall', text: 'Monsoon downpour >65mm across hill sectors', tone: 'alert' },
      { label: 'Open Corridor', text: 'No active full closures reported along this route', tone: 'neutral' }
    ],
    waypoints: [
      [26.144, 91.736], // Guwahati
      [25.800, 91.850],
      [25.666, 91.895], // Umiam pass
      [25.578, 91.893], // Shillong
      [25.132, 92.355]  // Towards Sonapur (blocked)
    ]
  }
};

export const ACCESSIBILITY_SCORES = [
  { state: 'Assam Network', score: 88, color: 'bg-emerald-500', status: 'Operational' },
  { state: 'Meghalaya Network', score: 68, color: 'bg-amber-500', status: 'Restricted' },
  { state: 'Tripura Highways', score: 92, color: 'bg-emerald-500', status: 'Operational' },
  { state: 'Nagaland Routes', score: 74, color: 'bg-amber-500', status: 'Operational' },
  { state: 'Arunachal Highway', score: 70, color: 'bg-amber-500', status: 'Operational' },
  { state: 'Manipur Highways', score: 62, color: 'bg-rose-500', status: 'Restricted' }
];
