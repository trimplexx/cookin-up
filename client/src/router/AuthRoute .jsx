import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SuspenseLoader from '../components/SuspenseLoader';
import PropTypes from 'prop-types';

const AuthRoute = ({ children }) => {
  const { isAuthenticated, accessToken, refreshToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated && accessToken) {
        try {
          await refreshToken();
        } catch (error) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, accessToken, refreshToken]);

  if (loading) {
    return <SuspenseLoader />;
  }

  return isAuthenticated ? children : <Navigate to="/logowanie" />;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
