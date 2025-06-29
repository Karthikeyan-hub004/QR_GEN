import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Determine backend base URL
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Log the current base URL (optional: helpful for debugging in Netlify logs)
console.log('✅ Axios Base URL:', BASE_URL);

// Create a reusable Axios instance
const api = axios.create({ baseURL: BASE_URL });

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/api/auth/me');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      console.error('Failed to fetch user:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);

      return response.data;
    } catch (error) {
      console.error('Login failed:', error.message);
      throw error;
    }
  };
const register = async (username, email, password) => {
  const response = await api.post(
    '/api/auth/register',
    { username, email, password },
    { withCredentials: true }  // 🔥 This is the key
  );

  const { token, user } = response.data;

  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  setUser(user);

  return response.data;
 
    } catch (error) {
      console.error('Registration failed:', error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
