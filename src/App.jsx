import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import BusTracking from './pages/BusTracking';
import RoutesMap from './pages/RoutesMap';
import AQIDashboard from './pages/AQIDashboard';
import EmergencyDashboard from './pages/EmergencyDashboard';
import ComplaintSystem from './pages/ComplaintSystem';
import AdminDashboard from './pages/AdminDashboard';
import './styles/neometro.css';

import { DataProvider } from './context/DataContext';


function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#030611] text-gray-200">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-[76px]' : 'ml-[260px]'}`}>
        <Header />
        <main className="pt-16 min-h-screen pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <DataProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AppLayout><Dashboard /></AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/bus-tracking" element={
            <ProtectedRoute>
              <AppLayout><BusTracking /></AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/routes" element={
            <ProtectedRoute>
              <AppLayout><RoutesMap /></AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/aqi" element={
            <ProtectedRoute>
              <AppLayout><AQIDashboard /></AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/emergency" element={
            <ProtectedRoute>
              <AppLayout><EmergencyDashboard /></AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/complaints" element={
            <ProtectedRoute>
              <AppLayout><ComplaintSystem /></AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <AppLayout><AdminDashboard /></AppLayout>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
