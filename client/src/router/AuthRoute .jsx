import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../api/usersApi';
import SuspenseLoader from '../components/SuspenseLoader';
import PropTypes from 'prop-types';

const AuthRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const isValid = await verifyToken(token);
      setIsAuthenticated(isValid);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <SuspenseLoader />;
  }

  return isAuthenticated ? children : <Navigate to="/logowanie" />;
};

export default AuthRoute;

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
