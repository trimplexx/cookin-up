import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/auth/RegisterForm';
import { showToast } from '../utils/toastManager';
import { register } from '../api/authApi';

const RegisterPage = () => {
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nick || !email || !password || !confirmPassword) {
      showToast('Wszystkie pola muszą być wypełnione', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Hasła muszą być takie same', 'error');
      return;
    }

    try {
      setIsLoading(true);
      const result = await register(nick, email, password);

      if (result) {
        showToast('Rejestracja powiodła się', 'success');
        navigate('/logowanie');
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="h-full flex items-center justify-center">
        <RegisterForm
          nick={nick}
          setNick={setNick}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          isLoading={isLoading}
          onSubmit={handleRegister}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
