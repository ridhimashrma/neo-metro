// ==========================================
// Mock Data for Smart City Transport & Emergency System
// Plain JavaScript Version with enhanced details
// ==========================================

const CITY_CENTER = [12.9716, 77.5946];

export const buses = [
  {
    id: 'BUS001', routeNumber: '335E', routeName: 'Koramangala - Majestic',
    driverName: 'Rajesh Kumar', driverStatus: 'active',
    currentLocation: [12.9352, 77.6245], speed: 35, nextStop: 'HSR Layout',
    eta: 8, capacity: 50, occupancy: 32, status: 'on-time', delayMinutes: 0,
    fuelLevel: 78, lastUpdated: '2026-01-15T10:30:00Z'
  },
  {
    id: 'BUS002', routeNumber: '500A', routeName: 'Whitefield - Silk Board',
    driverName: 'Suresh Patel', driverStatus: 'active',
    currentLocation: [12.9698, 77.7499], speed: 28, nextStop: 'Marathahalli',
    eta: 12, capacity: 55, occupancy: 48, status: 'delayed', delayMinutes: 15,
    fuelLevel: 45, lastUpdated: '2026-01-15T10:28:00Z'
  },
  {
    id: 'BUS003', routeNumber: '210N', routeName: 'Yelahanka - Kempegowda',
    driverName: 'Anil Sharma', driverStatus: 'active',
    currentLocation: [13.1007, 77.5963], speed: 42, nextStop: 'Hebbal',
    eta: 5, capacity: 45, occupancy: 20, status: 'ahead', delayMinutes: 0,
    fuelLevel: 92, lastUpdated: '2026-01-15T10:31:00Z'
  },
  {
    id: 'BUS004', routeNumber: '411D', routeName: 'Banashankari - Shivajinagar',
    driverName: 'Mohammed Irfan', driverStatus: 'break',
    currentLocation: [12.9250, 77.5870], speed: 0, nextStop: 'Jayanagar',
    eta: 20, capacity: 50, occupancy: 15, status: 'delayed', delayMinutes: 20,
    fuelLevel: 60, lastUpdated: '2026-01-15T10:15:00Z'
  },
  {
    id: 'BUS005', routeNumber: '600F', routeName: 'Electronic City - KR Market',
    driverName: 'Venkat Rao', driverStatus: 'active',
    currentLocation: [12.8452, 77.6602], speed: 38, nextStop: 'Bommasandra',
    eta: 6, capacity: 55, occupancy: 40, status: 'on-time', delayMinutes: 0,
    fuelLevel: 85, lastUpdated: '2026-01-15T10:29:00Z'
  },
  {
    id: 'BUS006', routeNumber: '114B', routeName: 'Indiranagar - KR Puram',
    driverName: 'Lakshmi Devi', driverStatus: 'active',
    currentLocation: [12.9719, 77.6412], speed: 30, nextStop: 'Indiranagar Metro',
    eta: 3, capacity: 40, occupancy: 35, status: 'on-time', delayMinutes: 0,
    fuelLevel: 67, lastUpdated: '2026-01-15T10:30:30Z'
  },
];

export const busStops = [
  { id: 'BS001', name: 'Majestic Bus Station', location: [12.9767, 77.5709], routes: ['335E', '210N', '411D', '600F'], shelter: true, wheelchairAccess: true, nextBuses: [{ route: '335E', eta: 5 }, { route: '210N', eta: 12 }] },
  { id: 'BS002', name: 'Koramangala Water Tank', location: [12.9352, 77.6245], routes: ['335E', '411D'], shelter: true, wheelchairAccess: false, nextBuses: [{ route: '335E', eta: 3 }, { route: '411D', eta: 18 }] },
  { id: 'BS003', name: 'HSR Layout BDA Complex', location: [12.9116, 77.6389], routes: ['335E', '500A'], shelter: true, wheelchairAccess: true, nextBuses: [{ route: '500A', eta: 8 }, { route: '335E', eta: 15 }] },
  { id: 'BS004', name: 'Silk Board Junction', location: [12.9157, 77.6208], routes: ['500A', '600F'], shelter: true, wheelchairAccess: true, nextBuses: [{ route: '500A', eta: 6 }, { route: '600F', eta: 10 }] },
  { id: 'BS005', name: 'Hebbal Flyover', location: [13.0358, 77.5970], routes: ['210N'], shelter: true, wheelchairAccess: false, nextBuses: [{ route: '210N', eta: 4 }] },
];

export const busRoutes = [
  {
    id: 'R001', number: '335E', name: 'Koramangala - Majestic', color: '#00d4ff',
    stops: ['Majestic', 'Town Hall', 'Richmond Circle', 'Koramangala Water Tank', 'BTM Layout', 'HSR Layout'],
    coordinates: [[12.9767, 77.5709], [12.9680, 77.5750], [12.9580, 77.5900], [12.9352, 77.6245], [12.9250, 77.6200], [12.9116, 77.6389]],
    totalDistance: 18.5, avgTime: 45
  },
  {
    id: 'R002', number: '500A', name: 'Whitefield - Silk Board', color: '#ff6b35',
    stops: ['Whitefield', 'Marathahalli', 'Bellandur', 'HSR Layout', 'Silk Board'],
    coordinates: [[12.9698, 77.7499], [12.9590, 77.6970], [12.9390, 77.6680], [12.9116, 77.6389], [12.9157, 77.6208]],
    totalDistance: 22.3, avgTime: 55
  },
  {
    id: 'R003', number: '210N', name: 'Yelahanka - Kempegowda', color: '#7c3aed',
    stops: ['Yelahanka', 'Hebbal', 'Mekhri Circle', 'Malleshwaram', 'Kempegowda'],
    coordinates: [[13.1007, 77.5963], [13.0358, 77.5970], [13.0100, 77.5900], [12.9920, 77.5700], [12.9767, 77.5709]],
    totalDistance: 16.8, avgTime: 40
  },
];

export const aqiStations = [
  { id: 'AQI001', name: 'Silk Board', location: [12.9157, 77.6208], aqi: 156, pm25: 82.3, pm10: 145.6, co2: 412, no2: 45.2, so2: 12.8, o3: 38.5, temperature: 28, humidity: 65, windSpeed: 8.5, lastUpdated: '2026-01-15T10:30:00Z' },
  { id: 'AQI002', name: 'Whitefield', location: [12.9698, 77.7499], aqi: 89, pm25: 35.1, pm10: 78.2, co2: 395, no2: 28.6, so2: 8.4, o3: 42.1, temperature: 27, humidity: 62, windSpeed: 12.3, lastUpdated: '2026-01-15T10:30:00Z' },
  { id: 'AQI003', name: 'Hebbal', location: [13.0358, 77.5970], aqi: 112, pm25: 55.8, pm10: 102.3, co2: 405, no2: 38.9, so2: 10.2, o3: 35.7, temperature: 26, humidity: 70, windSpeed: 6.8, lastUpdated: '2026-01-15T10:30:00Z' },
  { id: 'AQI004', name: 'Koramangala', location: [12.9352, 77.6245], aqi: 134, pm25: 68.5, pm10: 125.8, co2: 418, no2: 42.1, so2: 11.5, o3: 40.2, temperature: 29, humidity: 58, windSpeed: 9.1, lastUpdated: '2026-01-15T10:30:00Z' },
];

export const hospitals = [
  { id: 'H001', name: 'Apollo Hospital', location: [12.9500, 77.6300], phone: '+91-80-2630-4050', beds: 500, availableBeds: 45, type: 'private', emergency: true, distance: 2.3 },
  { id: 'H002', name: 'Manipal Hospital', location: [12.9590, 77.6420], phone: '+91-80-2502-4444', beds: 600, availableBeds: 78, type: 'private', emergency: true, distance: 3.8 },
  { id: 'H003', name: 'Victoria Hospital', location: [12.9620, 77.5730], phone: '+91-80-2670-1150', beds: 800, availableBeds: 120, type: 'government', emergency: true, distance: 1.5 },
];

export const policeStations = [
  { id: 'P001', name: 'Central Police Station', location: [12.9750, 77.5800], phone: '+91-80-2294-2100', officers: 45, type: 'station', distance: 1.2 },
  { id: 'P002', name: 'Koramangala Police Station', location: [12.9380, 77.6250], phone: '+91-80-2553-4100', officers: 30, type: 'station', distance: 2.5 },
];

export const ambulances = [
  { id: 'AMB001', vehicleNumber: 'KA-01-AB-1234', driverName: 'Ramesh', paramedicName: 'Dr. Priya', location: [12.9500, 77.6300], status: 'available', hospital: 'Apollo Hospital', eta: 0 },
  { id: 'AMB002', vehicleNumber: 'KA-01-CD-5678', driverName: 'Suresh', paramedicName: 'Dr. Anita', location: [12.9620, 77.5730], status: 'dispatched', hospital: 'Victoria Hospital', eta: 8 },
  { id: 'AMB003', vehicleNumber: 'KA-01-EF-9012', driverName: 'Mahesh', paramedicName: 'Dr. Kiran', location: [12.9590, 77.6420], status: 'en-route', hospital: 'Manipal Hospital', eta: 12 },
];

export const emergencyReports = [
  { id: 'ER001', type: 'accident', description: 'Two-wheeler accident near Silk Board junction', location: [12.9157, 77.6208], address: 'Silk Board Junction, HSR Layout', reportedBy: 'Citizen', reportedAt: '2026-01-15T10:15:00Z', status: 'dispatched', priority: 'high', assignedUnit: 'AMB002', responseTime: 8 },
  { id: 'ER002', type: 'fire', description: 'Small fire in commercial building', location: [12.9352, 77.6245], address: '80ft Road, Koramangala', reportedBy: 'Fire Alarm System', reportedAt: '2026-01-15T09:45:00Z', status: 'in-progress', priority: 'critical', assignedUnit: 'Fire Unit 3', responseTime: 5 },
  { id: 'ER003', type: 'medical', description: 'Elderly person collapsed at bus stop', location: [12.9767, 77.5709], address: 'Majestic Bus Station', reportedBy: 'Bus Driver', reportedAt: '2026-01-15T10:25:00Z', status: 'pending', priority: 'high', assignedUnit: 'AMB001', responseTime: 12 },
];

export const complaints = [
  { id: 'C001', category: 'Bus Service', subject: 'Bus 500A always delayed', description: 'The 500A bus from Whitefield is consistently 15-20 minutes late during morning rush hours.', submittedBy: 'Amit Singh', submittedAt: '2026-01-14T08:30:00Z', status: 'in-progress', priority: 'medium', assignedTo: 'Route Manager', resolution: '', rating: 0 },
  { id: 'C002', category: 'Infrastructure', subject: 'Broken shelter at bus stop', description: 'The bus shelter at Banashankari Temple stop is damaged and needs repair.', submittedBy: 'Lakshmi N', submittedAt: '2026-01-13T14:20:00Z', status: 'open', priority: 'low', assignedTo: 'Maintenance', resolution: '', rating: 0 },
];

export const reviews = [
  { id: 'RV001', userName: 'Ankit Sharma', rating: 4, comment: 'Real-time tracking is very accurate. Helped me plan my commute better.', service: 'Bus Tracking', date: '2026-01-14' },
  { id: 'RV002', userName: 'Meera Joshi', rating: 5, comment: 'SOS feature saved my life! Quick response from emergency services.', service: 'Emergency', date: '2026-01-13' },
];

export const disasterAlerts = [
  {
    id: 'DA001', type: 'Flood', severity: 'warning', title: 'Urban Flooding Alert - South Bangalore',
    description: 'Heavy rainfall expected in South Bangalore areas. Low-lying areas may experience waterlogging.',
    affectedAreas: ['Silk Board', 'BTM Layout', 'Jayanagar'],
    issuedAt: '2026-01-15T06:00:00Z', expiresAt: '2026-01-15T18:00:00Z',
    instructions: ['Avoid low-lying areas', 'Keep emergency contacts handy', 'Do not drive through flooded roads']
  }
];

export const aqiHistory = [
  { time: '00:00', silkBoard: 145, whitefield: 78, majestic: 165, koramangala: 128 },
  { time: '04:00', silkBoard: 130, whitefield: 65, majestic: 150, koramangala: 115 },
  { time: '08:00', silkBoard: 165, whitefield: 92, majestic: 185, koramangala: 140 },
  { time: '12:00', silkBoard: 148, whitefield: 85, majestic: 170, koramangala: 130 },
];

export const ridershipData = [
  { day: 'Mon', riders: 45200, onTime: 82 },
  { day: 'Tue', riders: 48500, onTime: 78 },
  { day: 'Wed', riders: 47800, onTime: 80 },
  { day: 'Thu', riders: 49200, onTime: 76 },
];

export const emergencyStats = [
  { month: 'Oct', medical: 55, fire: 10, crime: 22, accident: 42, disaster: 4 },
  { month: 'Nov', medical: 50, fire: 18, crime: 35, accident: 45, disaster: 2 },
  { month: 'Dec', medical: 58, fire: 14, crime: 28, accident: 38, disaster: 6 },
];

export const CITY_CENTER_COORDS = CITY_CENTER;

export function getAQICategory(aqi) {
  if (aqi <= 50) return { label: 'Good', color: '#10b981', bg: 'rgba(16,185,129,0.12)' };
  if (aqi <= 100) return { label: 'Moderate', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' };
  if (aqi <= 150) return { label: 'Unhealthy (SG)', color: '#f97316', bg: 'rgba(249,115,22,0.12)' };
  return { label: 'Unhealthy', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' };
}

export function getEmergencyTypeIcon(type) {
  switch (type) {
    case 'medical': return '🏥';
    case 'fire': return '🔥';
    case 'crime': return '🚔';
    case 'accident': return '💥';
    default: return '⚠️';
  }
}
