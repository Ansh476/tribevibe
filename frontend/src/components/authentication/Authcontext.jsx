import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for a stored token and userId when the app starts
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setUserId(storedUserId); // Set userId from localStorage
    }
  }, []);

  const login = (id, authToken) => {
    localStorage.setItem('token', authToken);
    localStorage.setItem('userId', id);
    setIsLoggedIn(true);
    setUserId(id);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserId(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId, token }}>
      {children}
    </AuthContext.Provider>
  );
};
