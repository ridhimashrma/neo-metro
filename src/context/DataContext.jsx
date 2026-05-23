import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [buses, setBuses] = useState([]);
  const [emergencyReports, setEmergencyReports] = useState([]);
  const [complaints, setComplaints] = useState([]);

  // Load data on mount
  useEffect(() => {
    fetchEmergencies();
    fetchComplaints();
  }, []);

  const fetchEmergencies = async () => {
    const res = await axios.get(`${API_BASE}/emergencies`);
    setEmergencyReports(res.data);
  };

  const fetchComplaints = async () => {
    const res = await axios.get(`${API_BASE}/complaints`);
    setComplaints(res.data);
  };

  const addEmergency = async (data) => {
    const res = await axios.post(`${API_BASE}/emergencies`, data);
    setEmergencyReports(prev => [res.data, ...prev]);
  };

  const deleteEmergency = async (id) => {
    await axios.delete(`${API_BASE}/emergencies/${id}`);
    setEmergencyReports(prev => prev.filter(e => e._id !== id));
  };

  const addComplaint = async (data) => {
    const res = await axios.post(`${API_BASE}/complaints`, data);
    setComplaints(prev => [res.data, ...prev]);
  };

  const deleteComplaint = async (id) => {
    await axios.delete(`${API_BASE}/complaints/${id}`);
    setComplaints(prev => prev.filter(c => c._id !== id));
  };

  return (
    <DataContext.Provider value={{
      emergencyReports,
      complaints,
      addEmergency,
      deleteEmergency,
      addComplaint,
      deleteComplaint,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);