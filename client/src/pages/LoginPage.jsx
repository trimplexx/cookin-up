import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import InputField from '../components/InputField';
import FormButton from '../components/FormButton';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin, isAuthenticated } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleLogin(email, password);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full p-4">
      <div className="h-3/4 flex items-center justify-center">
        <div className="bg-white dark:bg-neutral-800 sm:px-10 px-6 py-10 rounded-lg shadow-lg max-w-lg w-full transform transition duration-200 hover:shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-emerald-600 dark:text-emerald-300 mb-6">
            Zaloguj się
          </h2>
          <form className="space-y-6" onSubmit={onSubmit}>
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Podaj email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              id="password"
              label="Hasło"
              placeholder="Podaj hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isPassword
            />
            <div className="flex justify-between items-center mb-6">
              <FormButton
                label={isLoading ? 'Przetwarzanie...' : 'Zaloguj się'}
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </form>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Nie masz konta?{' '}
            <NavLink
              to="/rejestracja"
              className="text-emerald-600 dark:text-emerald-300 hover:underline transition-colors"
            >
              Zarejestruj się
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
