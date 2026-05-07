import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Wind, Shield, Users } from 'lucide-react';
import { buses, aqiStations, emergencyReports } from '../data/mockData';
import '../styles/neometro.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeBuses = buses.filter(b => b.driverStatus === 'active').length;
  const avgAQI = Math.round(aqiStations.reduce((s, a) => s + a.aqi, 0) / aqiStations.length);
  const activeEmergencies = emergencyReports.filter(e => e.status !== 'resolved').length;

  return (
    <div className="p-8 space-y-8">
      <div className="glass p-8">
        <h1 className="neon-cyan text-4xl font-black tracking-tighter">COMMAND TELEMETRY OVERVIEW</h1>
        <p className="text-cyan-400 mt-2">{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass p-8 cursor-pointer" onClick={() => navigate('/bus-tracking')}>
          <Bus size={36} style={{color: '#00f5ff'}} />
          <p className="text-5xl font-black mt-6">{activeBuses}</p>
          <p className="text-sm uppercase tracking-widest text-gray-400 mt-2">Active Fleet</p>
        </div>

        <div className="glass p-8 cursor-pointer" onClick={() => navigate('/aqi')}>
          <Wind size={36} style={{color: '#10b981'}} />
          <p className="text-5xl font-black mt-6">{avgAQI}</p>
          <p className="text-sm uppercase tracking-widest text-gray-400 mt-2">Average AQI</p>
        </div>

        <div className="glass p-8 cursor-pointer" onClick={() => navigate('/emergency')}>
          <Shield size={36} style={{color: '#ef4444'}} />
          <p className="text-5xl font-black mt-6">{activeEmergencies}</p>
          <p className="text-sm uppercase tracking-widest text-gray-400 mt-2">Active Emergencies</p>
        </div>

        <div className="glass p-8">
          <Users size={36} style={{color: '#a855f7'}} />
          <p className="text-5xl font-black mt-6">48.2K</p>
          <p className="text-sm uppercase tracking-widest text-gray-400 mt-2">Passengers Today</p>
        </div>
      </div>
    </div>
  );
}