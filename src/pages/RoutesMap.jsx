import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Route, Clock } from 'lucide-react';
import { busRoutes, busStops, CITY_CENTER_COORDS } from '../data/mockData';
import '../styles/neometro.css';

const stopIcon = L.divIcon({
  html: '<div style="background:#0b1227;width:16px;height:16px;border-radius:50%;border:3px solid #00d4ff;box-shadow:0 0 12px #00d4ff;"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export default function RoutesMap() {
  const [selectedRoute, setSelectedRoute] = useState(null);

  return (
    <div className="p-8 space-y-8">
      <div className="glass p-8">
        <h1 className="neon-cyan text-3xl font-black">ROUTE NETWORK VISUALIZER</h1>
        <p className="text-cyan-400">Complete Transit Topology</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Route List */}
        <div className="space-y-4">
          {busRoutes.map(route => (
            <div
              key={route.id}
              onClick={() => setSelectedRoute(route.id === selectedRoute ? null : route.id)}
              className={`glass p-6 cursor-pointer transition-all ${selectedRoute === route.id ? 'ring-2 ring-cyan-400' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: route.color }}></div>
                <div>
                  <p className="font-bold text-lg">{route.number}</p>
                  <p className="text-sm text-gray-400">{route.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="lg:col-span-3 glass overflow-hidden" style={{ height: '620px' }}>
          <MapContainer center={CITY_CENTER_COORDS} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            
            {busRoutes.map(route => (
              <Polyline
                key={route.id}
                positions={route.coordinates}
                color={route.color}
                weight={selectedRoute === route.id ? 6 : 3}
                opacity={selectedRoute && selectedRoute !== route.id ? 0.3 : 0.9}
              />
            ))}

            {busStops.map(stop => (
              <Marker key={stop.id} position={stop.location} icon={stopIcon}>
                <Popup>
                  <strong>{stop.name}</strong>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}