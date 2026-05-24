import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(undefined);

// const mockUsers = [
//   { id: 'U001', name: 'Admin User', email: 'admin@smartcity.com', password: 'admin123', role: 'admin', phone: '+91-9876543210' },
//   { id: 'U002', name: 'John Citizen', email: 'user@smartcity.com', password: 'user123', role: 'user', phone: '+91-9876543211' },
//   { id: 'U003', name: 'Bus Operator', email: 'operator@smartcity.com', password: 'op123', role: 'operator', phone: '+91-9876543212' },
// ];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
  
    try {
      const response = await fetch('http://localhost:8787/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setUser(data.user);
  
        localStorage.setItem('smartcity_token', data.token);
        localStorage.setItem('smartcity_user', JSON.stringify(data.user));
  
        setIsLoading(false);
        return true;
      }
  
      setIsLoading(false);
      return false;
  
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return false;
    }
  }, []);

  const register = useCallback(async (name, email, password, phone) => {
    setIsLoading(true);
  
    try {
      const response = await fetch('http://localhost:8787/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setUser(data.user);
  
        localStorage.setItem('smartcity_token', data.token);
        localStorage.setItem('smartcity_user', JSON.stringify(data.user));
  
        setIsLoading(false);
        return true;
      }
  
      setIsLoading(false);
      return data.message;
  
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return data.message;
    }
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('smartcity_user');
    const token = localStorage.getItem('smartcity_token');
  
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('smartcity_token');
    localStorage.removeItem('smartcity_user');
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
