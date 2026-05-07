import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(undefined);

const mockUsers = [
  { id: 'U001', name: 'Admin User', email: 'admin@smartcity.com', password: 'admin123', role: 'admin', phone: '+91-9876543210' },
  { id: 'U002', name: 'John Citizen', email: 'user@smartcity.com', password: 'user123', role: 'user', phone: '+91-9876543211' },
  { id: 'U003', name: 'Bus Operator', email: 'operator@smartcity.com', password: 'op123', role: 'operator', phone: '+91-9876543212' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    const found = mockUsers.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem('smartcity_token', `jwt_${found.id}_${Date.now()}`);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  }, []);

  const register = useCallback(async (name, email, password, phone) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    const exists = mockUsers.find(u => u.email === email);
    if (exists) {
      setIsLoading(false);
      return false;
    }
    const newUser = {
      id: `U${String(mockUsers.length + 1).padStart(3, '0')}`,
      name, email, role: 'user', phone
    };
    mockUsers.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem('smartcity_token', `jwt_${newUser.id}_${Date.now()}`);
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('smartcity_token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
