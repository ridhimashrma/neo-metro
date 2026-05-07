import { useState, useEffect } from 'react';
import { Bell, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { disasterAlerts } from '../data/mockData';
import '../styles/neometro.css';

export default function Header() {
  const { user } = useAuth();
  const [time, setTime] = useState(new Date());
  const [showAlerts, setShowAlerts] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeAlerts = disasterAlerts.filter(a => new Date(a.expiresAt) > new Date());

  return (
    <header className="header h-16 fixed top-0 right-0 left-0 z-40 flex items-center justify-between px-8">
      {/* <div className="font-mono text-sm text-cyan-400">NEO-METRO OS • LIVE  </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-30 text-cyan-400 font-mono text-sm">
          <Clock size={18} />
          {time.toLocaleTimeString()}
        </div> */}

        {/* <button onClick={() => setShowAlerts(!showAlerts)} className="relative p-3 hover:bg-white/10 rounded-xl transition-all">
          <Bell size={22} />
          {activeAlerts.length > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
              {activeAlerts.length}
            </span>
          )}
        </button> */}

        {/* <div className="flex items-center gap-4 pl-6 border-l border-cyan-500/20">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold">
            {user?.name?.[0] || 'U'}
          </div>
          <div>
            <p className="font-semibold text-sm">{user?.name}</p>
            <p className="text-xs text-cyan-400 uppercase tracking-widest">{user?.role}</p>
          </div>
        </div> */}
      {/* </div> */}
    </header>
  );
}

