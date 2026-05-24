import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8787/api';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [buses, setBuses] = useState([]);
  const [emergencyReports, setEmergencyReports] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);

  // Load data on mount
  useEffect(() => {
    fetchEmergencies();
    fetchComplaints();
    fetchBuses();
    fetchUsers();
  }, []);


  const fetchBuses = async () => {
    const res = await axios.get(`${API_BASE}/buses`);
    setBuses(res.data);
  };

  const fetchComplaints = async () => {
    const res = await axios.get(`${API_BASE}/complaints`);
    setComplaints(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE}/auth/users`);
    setUsers(res.data);
  };

  const fetchEmergencies = async () => {
    const res = await axios.get(`${API_BASE}/sos`);
    setEmergencyReports(res.data);
  };
  
  const addEmergency = async (data) => {
    const res = await axios.post(`${API_BASE}/sos`, data);
  
    setEmergencyReports(prev => [res.data, ...prev]);
  };
  
  const deleteEmergency = async (id) => {
    await axios.delete(`${API_BASE}/sos/${id}`);
  
    setEmergencyReports(prev =>
      prev.filter(e => e._id !== id)
    );
  };

  const addComplaint = async (data) => {
    const res = await axios.post(`${API_BASE}/complaints`, data);
    setComplaints(prev => [res.data, ...prev]);
  };
  const deleteComplaint = async (id) => {
    await axios.delete(`${API_BASE}/complaints/${id}`);
  
    setComplaints(prev =>
      prev.filter(c => c._id !== id)
    );
  };

const addBus = async (data) => {
  const res = await axios.post(
    `${API_BASE}/buses`,
    data
  );

  setBuses(prev => [res.data, ...prev]);
};

const deleteBus = async (id) => {
  await axios.delete(`${API_BASE}/buses/${id}`);

  setBuses(prev =>
    prev.filter(bus => bus._id !== id)
  );
};

  return (
    <DataContext.Provider value={{
   users,
  fetchUsers,

  buses,
  fetchBuses,
  addBus,
  deleteBus,

  emergencyReports,
  fetchEmergencies,
  addEmergency,
  deleteEmergency,

  complaints,
  fetchComplaints,
  addComplaint,
  deleteComplaint,

}}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);