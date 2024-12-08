import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { allAPIs } from '../Utils/allAPIs';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  const refreshTimeoutId = React.useRef(null);

  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch {
      return null;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuth(null);
    if (refreshTimeoutId.current) {
      clearTimeout(refreshTimeoutId.current);
    }
    navigate('/signin');
  }, [navigate]);

  const login = useCallback((tokens) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    setAuth({ accessToken: tokens.accessToken });
  }, []);

  const refreshToken = useCallback(async () => {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      try {
        const response = await allAPIs.refreshToken({ token });
        if (response.status === 200) {
          login(response.data.token);
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        logout();
      }
    }
  }, [login, logout]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setAuth({ accessToken: token });

        if (!refreshTimeoutId.current) {
          const refreshTime = decoded.exp * 1000 - Date.now() - 60000;
          refreshTimeoutId.current = setTimeout(() => {
            refreshToken();
            refreshTimeoutId.current = null;
          }, refreshTime);
        }
      } else {
        logout();
      }
    }

    return () => {
      if (refreshTimeoutId.current) {
        clearTimeout(refreshTimeoutId.current);
      }
    };
  }, [refreshToken, logout]);

  return (
    <AuthContext.Provider value={{ auth, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
