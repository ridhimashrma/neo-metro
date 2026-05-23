import { useState } from 'react';
import {
  Users, Bus, Shield, Globe, Server, Database,
  Plus, Trash2, CheckCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';
import '../styles/neometro.css';

export default function AdminDashboard() {
  const {
  emergencyReports = [],
  addEmergency,
  deleteEmergency,
  updateEmergencyStatus,
  complaints = [],
  deleteComplaint,
  buses = []
} = useData();

  const [activeSection, setActiveSection] = useState('overview');

  // Add New Emergency with a proper form modal instead of prompt()
  const [showAddEmergency, setShowAddEmergency] = useState(false);
  const [newEmergency, setNewEmergency] = useState({ type: 'medical', description: '', address: '' });

  const handleAddEmergency = async () => {
    if (!newEmergency.description || !newEmergency.address) return;
    await addEmergency(newEmergency);
    setShowAddEmergency(false);
    setNewEmergency({ type: 'medical', description: '', address: '' });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="glass p-8">
        <h1 className="neon-cyan text-4xl font-black">SUPERUSER CONTROL PANEL</h1>
        <p className="text-cyan-400">Matrix Core Administration • Full Control</p>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap gap-2 bg-black/30 p-2 rounded-2xl w-fit">
        {['overview', 'buses', 'emergency', 'complaints', 'system'].map(sec => (
          <button
            key={sec}
            onClick={() => setActiveSection(sec)}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeSection === sec
                ? 'bg-cyan-500 text-black shadow-lg'
                : 'hover:bg-white/10 text-gray-400'
            }`}
          >
            {sec.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Add Emergency Modal */}
      {showAddEmergency && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="glass p-10 rounded-3xl w-full max-w-md space-y-6">
            <h3 className="text-xl font-bold neon-cyan">Add Emergency</h3>
            <select
              value={newEmergency.type}
              onChange={e => setNewEmergency({ ...newEmergency, type: e.target.value })}
              className="glass w-full p-4 text-white bg-transparent"
            >
              <option value="medical">Medical Emergency</option>
              <option value="fire">Fire Outbreak</option>
              <option value="accident">Road Accident</option>
              <option value="crime">Crime / Security</option>
            </select>
            <input
              type="text"
              placeholder="Description"
              value={newEmergency.description}
              onChange={e => setNewEmergency({ ...newEmergency, description: e.target.value })}
              className="glass w-full p-4 text-white"
            />
            <input
              type="text"
              placeholder="Address / Location"
              value={newEmergency.address}
              onChange={e => setNewEmergency({ ...newEmergency, address: e.target.value })}
              className="glass w-full p-4 text-white"
            />
            <div className="flex gap-4">
              <button onClick={() => setShowAddEmergency(false)} className="flex-1 py-4 border border-gray-600 rounded-xl">Cancel</button>
              <button onClick={handleAddEmergency} className="flex-1 btn-neon">ADD EMERGENCY</button>
            </div>
          </div>
        </div>
      )}

      {/* OVERVIEW */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass p-8">
            <Users size={36} className="text-cyan-400" />
            <p className="text-5xl font-black mt-6">12.4K</p>
            <p className="text-sm uppercase tracking-widest text-gray-400">Citizens</p>
          </div>
          <div className="glass p-8">
            <Bus size={36} className="text-purple-400" />
            <p className="text-5xl font-black mt-6">{buses?.length}</p>
            <p className="text-sm uppercase tracking-widest text-gray-400">Buses</p>
          </div>
          <div className="glass p-8">
            <Shield size={36} className="text-red-400" />
            <p className="text-5xl font-black mt-6">{emergencyReports?.length}</p>
            <p className="text-sm uppercase tracking-widest text-gray-400">Emergencies</p>
          </div>
          <div className="glass p-8">
            <Globe size={36} className="text-emerald-400" />
            <p className="text-5xl font-black mt-6">24</p>
            <p className="text-sm uppercase tracking-widest text-gray-400">AQI Nodes</p>
          </div>
        </div>
      )}

      {/* BUSES SECTION */}
      {activeSection === 'buses' && (
        <div className="glass p-8">
          <div className="flex justify-between mb-6">
            <h3 className="text-2xl font-bold">Fleet Management</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Route</th>
                  <th>Driver</th>
                  <th>Status</th>
                  <th>Fuel</th>
                </tr>
              </thead>
              <tbody>
                {buses.map(bus => (
                  <tr key={bus.id}>
                    <td className="font-mono">{bus.id}</td>
                    <td>{bus.routeNumber} - {bus.routeName}</td>
                    <td>{bus.driverName}</td>
                    <td>
                      <span className={`px-4 py-1 rounded-full text-xs font-bold ${bus.status === 'on-time' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {bus.status}
                      </span>
                    </td>
                    <td>{bus.fuelLevel}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EMERGENCY SECTION - Full CRUD with real API */}
      {activeSection === 'emergency' && (
        <div className="glass p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Emergency Management</h3>
            <button onClick={() => setShowAddEmergency(true)} className="btn-neon flex items-center gap-2">
              <Plus size={20} /> Add Emergency
            </button>
          </div>

          {emergencyReports.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No emergencies on record.</p>
          ) : (
            <div className="space-y-4">
              {emergencyReports.map(report => (
                <div key={report.id} className="glass p-6 flex items-center justify-between border-l-4 border-red-500">
                  <div className="flex-1">
                    <h4 className="font-bold capitalize text-lg">{report.type}</h4>
                    <p className="text-gray-300">{report.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{report.address}</p>
                    <span className={`inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full ${
                      report.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400' :
                      report.status === 'dispatched' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {report.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <select
                      value={report.status}
                      onChange={(e) => updateEmergencyStatus(report.id, e.target.value)}
                      className="glass px-4 py-2 text-sm text-white bg-transparent"
                    >
                      <option value="in-progress">In Progress</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="resolved">Resolved</option>
                    </select>

                    <button
                      onClick={() => deleteEmergency(report.id)}
                      className="text-red-400 hover:text-red-500 p-2"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* COMPLAINTS SECTION */}
      {activeSection === 'complaints' && (
        <div className="glass p-8">
          <h3 className="text-2xl font-bold mb-6">All Registered Complaints ({complaints?.length})</h3>
          {complaints.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No complaints on record.</p>
          ) : (
            <div className="space-y-6">
              {complaints.map(c => (
                <div key={c.id} className="glass p-8 flex justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-lg">{c.subject}</h4>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        c.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    <p className="text-gray-300">{c.description}</p>
                    <p className="text-xs text-gray-500 mt-2">Category: {c.category}</p>
                  </div>
                  <button
                    onClick={() => deleteComplaint(c.id)}
                    className="text-red-400 hover:text-red-500 ml-4"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SYSTEM SECTION */}
      {activeSection === 'system' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Core Microservices', uptime: '99.98%', status: 'Operational' },
            { name: 'Decentralized Cache', uptime: '99.95%', status: 'Operational' },
            { name: 'Emergency Broadcast', uptime: '100%', status: 'Live' },
            { name: 'MongoDB Backend', uptime: '100%', status: 'Connected' },
          ].map((sys, i) => (
            <div key={i} className="glass p-8 flex items-center justify-between">
              <div>
                <p className="font-bold text-lg">{sys.name}</p>
                <p className="text-sm text-emerald-400">Uptime: {sys.uptime}</p>
              </div>
              <span className="px-6 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold">
                {sys.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}