import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); 
  const [token, setToken] = useState(null); 

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
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
