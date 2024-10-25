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
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userName');
      setAccessToken(null);
      setUserName(null);
      setIsAuthenticated(false);
      showToast('Pomyślnie wylogowano', 'success');
    } catch (error) {
      return null;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      const token = response.data.accessToken;
      const name = response.data.userName;

      setAccessToken(token);
      setUserName(name);
      setIsAuthenticated(true);

      localStorage.setItem('accessToken', token);
      localStorage.setItem('userName', name);

      showToast('Pomyślnie zalogowano', 'success');
    } catch (error) {
      showToast('Nie udało się zalogować', 'error');
      setIsAuthenticated(false);
    }
  };

  const updateUserName = (newUserName) => {
    setUserName(newUserName);
    localStorage.setItem('userName', newUserName);
  };

  useEffect(() => {
    setLogoutFunction(handleLogout);

    const handleStorageChange = (event) => {
      if (event.key === 'accessToken' && !event.newValue) {
        handleLogout();
      }
      if (event.key === 'userName') {
        updateUserName();
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
        userName,
        isAuthenticated,
        handleLogin,
        handleLogout,
        updateUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
