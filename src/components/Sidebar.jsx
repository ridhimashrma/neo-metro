import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bus, Wind, ShieldAlert, MessageSquare, Settings, LogOut, Map, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/neometro.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/bus-tracking', label: 'Live Tracking', icon: Bus },
  { path: '/routes', label: 'Routes Map', icon: Map },
  { path: '/aqi', label: 'AQI Monitor', icon: Wind },
  { path: '/emergency', label: 'Emergency', icon: ShieldAlert },
  { path: '/complaints', label: 'Complaints', icon: MessageSquare },
  { path: '/admin', label: 'Admin Panel', icon: Settings, adminOnly: true },
];

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 bg-[#060b19]/95 backdrop-blur-2xl border-r border-cyan-500/20 flex flex-col ${collapsed ? 'w-[76px]' : 'w-[260px]'}`}>
      
      <div className="p-6 border-b border-cyan-500/20 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
          <span className="text-white font-black text-2xl">SC</span>
        </div>
        {!collapsed && <div className="neon-cyan font-black text-xl">NEO METRO</div>}
      </div>

      <button onClick={onToggle} className="absolute -right-3 top-24 w-7 h-7 bg-[#060b19] border border-cyan-500/40 rounded-full flex items-center justify-center text-cyan-400">
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <nav className="flex-1 p-4 space-y-2 overflow-auto custom-scrollbar">
        {navItems.map(item => {
          if (item.adminOnly && user?.role !== 'admin') return null;
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${active ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' : 'hover:bg-white/5'}`}
            >
              <Icon size={22} />
              {!collapsed && <span className="font-semibold">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-cyan-500/20">
        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl">
          <LogOut size={22} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}