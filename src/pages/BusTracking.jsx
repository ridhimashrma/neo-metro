import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Bus, Clock, Users, Fuel, Search } from 'lucide-react';
import { buses, busStops, busRoutes, CITY_CENTER_COORDS } from '../data/mockData';
import '../styles/neometro.css';

export default function BusTracking() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredBuses = buses.filter(b => {
    const matchesSearch = !searchQuery || 
      b.routeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.routeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="neon-cyan text-3xl font-black">LIVE FLEET TRACKER</h1>
          <p className="text-cyan-400">Real-time Bus Monitoring</p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass pl-12 py-3 w-72"
              style={{ border: 'none', color: 'white' }}
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Map */}
        <div className="lg:col-span-2 glass overflow-hidden" style={{ height: '560px' }}>
          <MapContainer center={CITY_CENTER_COORDS} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            {busRoutes.map(route => (
              <Polyline key={route.id} positions={route.coordinates} color={route.color} weight={4} />
            ))}
            {/* Add bus markers here */}
          </MapContainer>
        </div>

        {/* Bus List */}
        <div className="space-y-4 max-h-[560px] overflow-auto custom-scrollbar">
          {filteredBuses.map(bus => (
            <div key={bus.id} className="glass p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-xl">{bus.routeNumber}</h3>
                  <p className="text-gray-400">{bus.routeName}</p>
                </div>
                <span className="px-4 py-1 rounded-full text-sm font-bold" style={{
                  background: bus.status === 'on-time' ? '#10b98120' : '#f59e0b20',
                  color: bus.status === 'on-time' ? '#10b981' : '#f59e0b'
                }}>
                  {bus.status}
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>Speed: <span className="font-mono">{bus.speed} km/h</span></div>
                <div>ETA: <span className="font-mono">{bus.eta} min</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}