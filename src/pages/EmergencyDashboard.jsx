import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { ShieldAlert, Siren, Trash2, Plus } from 'lucide-react';
import { CITY_CENTER_COORDS } from '../data/mockData';
import { useData } from '../context/DataContext';
import '../styles/neometro.css';

export default function EmergencyDashboard() {
  const { emergencyReports, addEmergency, deleteEmergency } = useData();
  const [showSOS, setShowSOS] = useState(false);
  const [sosType, setSosType] = useState('');

  const handleSOS = () => {
    if (!sosType) return;
    
    addEmergency({
      type: sosType,
      description: `SOS triggered - ${sosType} emergency`,
      address: "Live Location"
    });
    
    setShowSOS(false);
    setSosType('');
    
    // Instant notification simulation
    alert("🚨 SOS SENT! Admin has been notified instantly.");
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="neon-cyan text-3xl font-black">CRISIS COMMAND CENTER</h1>
          <p className="text-red-400">Live Emergency Management</p>
        </div>
        <button onClick={() => setShowSOS(true)} className="btn-neon flex items-center gap-3">
          <Siren size={22} /> TRIGGER SOS
        </button>
      </div>

      {/* SOS Modal */}
      {showSOS && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
         <div className="glass p-10 !w-[300px] max-w-md min-h-[250px] rounded-3xl">
            <h3 className="text-xl font-bold mb-6">Emergency SOS</h3>
            <select 
              value={sosType} 
              onChange={(e) => setSosType(e.target.value)}
              className="glass p-10 !w-[300px] max-w-md min-h-[250px] rounded-3xl"
            >
              <option value="">Select Emergency Type</option>
              <option value="medical">Medical Emergency</option>
              <option value="fire">Fire Outbreak</option>
              <option value="accident">Road Accident</option>
              <option value="crime">Crime / Security</option>
            </select>
            <div className="flex gap-4">
              <button onClick={() => setShowSOS(false)} className="flex-1 py-4 border border-gray-600 rounded-xl">Cancel</button>
              <button onClick={handleSOS} className="flex-1 btn-neon">SEND SOS NOW</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <ShieldAlert /> Active Emergencies ({emergencyReports.length})
          </h3>
          
          <div className="space-y-4 max-h-[500px] overflow-auto custom-scrollbar">
            {emergencyReports.map(report => (
              <div key={report.id} className="glass p-6 border-l-4 border-red-500 flex justify-between items-start">
                <div>
                  <h4 className="font-bold capitalize text-lg">{report.type}</h4>
                  <p className="text-gray-300 mt-1">{report.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{report.address}</p>
                </div>
                <button 
                  onClick={() => deleteEmergency(report.id)}
                  className="text-red-400 hover:text-red-500 p-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass overflow-hidden" style={{height: '520px'}}>
          <MapContainer center={CITY_CENTER_COORDS} zoom={12} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}