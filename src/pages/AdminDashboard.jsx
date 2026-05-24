import { useState } from 'react';
import {
  Users, Bus, Shield, Globe, Server, Database,
  Plus, Trash2, Edit2, CheckCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';
import '../styles/neometro.css';

export default function AdminDashboard() {
  const { 
    users,
    emergencyReports, addEmergency, deleteEmergency,
    complaints, deleteComplaint,
    buses,
    addBus,
    deleteBus
  } = useData();

  const [activeSection, setActiveSection] = useState('overview');
  const [editingEmergency, setEditingEmergency] = useState(null);

  // Add New Emergency
  const handleAddEmergency = () => {
    const type = prompt("Enter Emergency Type (medical/fire/accident/crime):");
    if (!type) return;
    const description = prompt("Enter Description:");
    if (!description) return;

    addEmergency({
      type: type.toLowerCase(),
      description: description,
      address: "Admin Added Location"
    });
    alert("Emergency added successfully!");
  };

  // Update Emergency Status
  const updateEmergencyStatus = (id, newStatus) => {
    // For demo - we'll just alert (you can enhance DataContext later)
    alert(`Emergency ${id} status updated to: ${newStatus}`);
  };

  
  const handleAddBus = () => {
  const routeNumber = prompt("Enter Route Number:");
  if (!routeNumber) return;

  const routeName = prompt("Enter Route Name:");
  if (!routeName) return;

  const driverName = prompt("Enter Driver Name:");
  if (!driverName) return;

  addBus({
    routeNumber,
    routeName,
    driverName,
    status: "on-time",
    fuelLevel: 100
  });

  alert("Bus Added Successfully");
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
        {['overview', 'buses', 'emergency', 'complaints', 'users', 'system'].map(sec => (
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
            <p className="text-5xl font-black mt-6">{buses?.length || 0}</p>
            <p className="text-sm uppercase tracking-widest text-gray-400">Buses</p>
          </div>
          <div className="glass p-8">
            <Shield size={36} className="text-red-400" />
            <p className="text-5xl font-black mt-6">{emergencyReports?.length || 0}</p>
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
            <button
  onClick={handleAddBus}
  className="btn-neon flex items-center gap-2"
>
              <Plus size={20} /> Add New Bus
            </button>
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {buses?.map(bus => (
                  <tr key={bus._id}>
                    <td className="font-mono">{bus.routeNumber}</td>
                    <td>{bus.routeNumber} - {bus.routeName}</td>
                    <td>{bus.driverName}</td>
                    <td>
                      <span className={`px-4 py-1 rounded-full text-xs font-bold ${bus.status === 'on-time' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {bus.status}
                      </span>
                    </td>
                    <td>{bus.fuelLevel}%</td>
                    <td>
                      <button
  onClick={() => deleteBus(bus._id)}
  className="text-red-400 hover:text-red-500"
>
  <Trash2 size={18} />
</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EMERGENCY SECTION - Full CRUD */}
      {activeSection === 'emergency' && (
        <div className="glass p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Emergency Management</h3>
            <button onClick={handleAddEmergency} className="btn-neon flex items-center gap-2">
              <Plus size={20} /> Add Emergency
            </button>
          </div>

          <div className="space-y-4">
            {emergencyReports?.map(report => (
              <div key={report._id} className="glass p-6 flex items-center justify-between border-l-4 border-red-500">
                <div className="flex-1">
                  <h4 className="font-bold capitalize text-lg">{report.type}</h4>
                  <p className="text-gray-300">{report.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{report.address}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <select 
                    onChange={(e) => updateEmergencyStatus(report._id, e.target.value)}
                    className="glass px-4 py-2 text-sm"
                  >
                    <option value="in-progress">In Progress</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  
                  <button
  onClick={() => deleteEmergency(report._id)}
  className="text-red-400 hover:text-red-500 p-2"
>
  <Trash2 size={20} />
</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPLAINTS SECTION */}
      {activeSection === 'complaints' && (
        <div className="glass p-8">
          <h3 className="text-2xl font-bold mb-6">All Registered Complaints</h3>
          <div className="space-y-6">
            {complaints?.map(c => (
              <div key={c._id} className="glass p-8 flex justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{c.subject}</h4>
                  <p className="text-gray-300 mt-3">{c.description}</p>
                </div>
                <button 
                  onClick={() => deleteComplaint(c._id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* USERS SECTION */}
{activeSection === 'users' && (
  <div className="glass p-8">
    
    <h3 className="text-2xl font-bold mb-6">
      Registered Users
    </h3>

    <div className="space-y-4">

      {users?.map(user => (

        <div
          key={user._id}
          className="glass p-6 flex justify-between items-center"
        >

          <div>
            <h4 className="font-bold text-lg">
              {user.name}
            </h4>

            <p className="text-gray-400">
              {user.email}
            </p>

            <p className="text-sm text-cyan-400 capitalize">
              {user.role}
            </p>
          </div>

          <div className="text-right">
            <p>{user.phone}</p>
          </div>

        </div>

      ))}

    </div>
  </div>
)}

      {/* SYSTEM SECTION */}
      {activeSection === 'system' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Core Microservices', uptime: '99.98%', status: 'Operational' },
            { name: 'Decentralized Cache', uptime: '99.95%', status: 'Operational' },
            { name: 'Emergency Broadcast', uptime: '100%', status: 'Live' },
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