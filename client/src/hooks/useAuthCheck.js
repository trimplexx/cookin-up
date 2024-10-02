import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../api/usersApi';

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        navigate('/logowanie');
        return;
      }

      const isValid = await verifyToken(token);
      if (!isValid) {
        navigate('/logowanie');
      }
    };

    checkAuth();
  }, [navigate]);
};

export default useAuthCheck;
