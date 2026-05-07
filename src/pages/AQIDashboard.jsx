import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Wind, AlertTriangle, TrendingDown, Gauge } from 'lucide-react';
import { aqiStations, aqiHistory, getAQICategory, CITY_CENTER_COORDS } from '../data/mockData';
import '../styles/neometro.css';

function createAQIIcon(aqi) {
  const cat = getAQICategory(aqi);
  return L.divIcon({
    html: `<div style="background:${cat.color};width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;color:white;font-weight:bold;">${aqi}</div>`,
    className: 'custom-aqi-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

export default function AQIDashboard() {
  const avgAQI = Math.round(aqiStations.reduce((s, a) => s + a.aqi, 0) / aqiStations.length);
  const avgCat = getAQICategory(avgAQI);
  const worst = aqiStations.reduce((a, b) => a.aqi > b.aqi ? a : b);
  const best = aqiStations.reduce((a, b) => a.aqi < b.aqi ? a : b);

  return (
    <div className="p-8 space-y-8">
      <div className="glass p-8">
        <h1 className="neon-cyan text-3xl font-black">ATMOSPHERIC SURVEILLANCE</h1>
        <p className="text-cyan-400">Live Air Quality Network</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass p-8 text-center">
          <Wind size={40} className="mx-auto mb-4 text-cyan-400" />
          <p className="text-6xl font-black">{avgAQI}</p>
          <p className="text-sm uppercase tracking-widest mt-2" style={{color: avgCat.color}}>{avgCat.label}</p>
        </div>
        <div className="glass p-8 text-center">
          <AlertTriangle size={40} className="mx-auto mb-4 text-red-400" />
          <p className="text-6xl font-black">{worst.aqi}</p>
          <p className="text-sm text-red-400">Worst: {worst.name}</p>
        </div>
        <div className="glass p-8 text-center">
          <TrendingDown size={40} className="mx-auto mb-4 text-emerald-400" />
          <p className="text-6xl font-black">{best.aqi}</p>
          <p className="text-sm text-emerald-400">Best: {best.name}</p>
        </div>
        <div className="glass p-8 text-center">
          <Gauge size={40} className="mx-auto mb-4 text-purple-400" />
          <p className="text-6xl font-black">{aqiStations.length}</p>
          <p className="text-sm uppercase tracking-widest">Active Sensors</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass p-8">
          <h3 className="text-xl font-bold mb-6">Sensor Grid</h3>
          <div className="grid grid-cols-2 gap-4">
            {aqiStations.map(station => {
              const cat = getAQICategory(station.aqi);
              return (
                <div key={station.id} className="glass p-6 text-center">
                  <div style={{color: cat.color, fontSize: '2.5rem', fontWeight: '900'}}>{station.aqi}</div>
                  <p className="text-sm mt-2">{station.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass overflow-hidden" style={{height: '420px'}}>
          <MapContainer center={CITY_CENTER_COORDS} zoom={12} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            {aqiStations.map(station => (
              <Marker key={station.id} position={station.location} icon={createAQIIcon(station.aqi)}>
                <Popup>{station.name} - AQI {station.aqi}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}