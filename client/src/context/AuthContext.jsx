import { createContext, useState, useEffect } from 'react';
import { login, logout } from '../api/authApi';
import PropTypes from 'prop-types';
import { showToast } from '../utils/toastManager';
import { setLogoutFunction } from '../utils/sessionManager';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken') || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);

  const handleLogout = async () => {
    try {
      await logout();
      setAccessToken(null);
      setIsAuthenticated(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userName');
      showToast('Pomyślnie wylogowano', 'success');
    } catch (error) {
      return null;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      const token = response.data.accessToken;
      setAccessToken(token);
      localStorage.setItem('accessToken', token);
      setIsAuthenticated(true);
      localStorage.setItem('userName', response.data.userName);
      showToast('Pomyślnie zalogowano', 'success');
    } catch (error) {
      showToast('Nie udało się zalogować', 'error');
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    setLogoutFunction(handleLogout);

    const handleStorageChange = (event) => {
      if (event.key === 'accessToken' && !event.newValue) {
        handleLogout();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
