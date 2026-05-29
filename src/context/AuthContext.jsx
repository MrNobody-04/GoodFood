import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem('goodfood_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password, correctPassword) => {
    const correctEmail = 'admin@goodfood.com';
    if (email === correctEmail && password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('goodfood_admin_session', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('goodfood_admin_session');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
