import PropTypes from 'prop-types';
import InputField from '../common/InputField';
import FormButton from '../common/FormButton';
import { NavLink } from 'react-router-dom';

const RegisterForm = ({
  nick,
  setNick,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  onSubmit,
}) => {
  return (
    <div className="bg-white dark:bg-neutral-800 sm:px-10 px-6 py-10 rounded-lg shadow-lg max-w-lg w-full transform transition duration-200 hover:shadow-2xl">
      <h2 className="text-3xl font-extrabold text-center text-emerald-600 dark:text-emerald-300 mb-6">
        Zarejestruj się
      </h2>
      <form className="space-y-6" onSubmit={onSubmit}>
        <InputField
          id="nick"
          label="Nick"
          placeholder="Podaj swój Nick"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
        />
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
          isPassword={true}
          autoComplete="new-password"
        />
        <InputField
          id="confirm-password"
          label="Powtórz hasło"
          placeholder="Powtórz hasło"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          isPassword={true}
          autoComplete="new-password"
        />
        <div className="flex justify-between items-center mb-6">
          <FormButton
            label={isLoading ? 'Przetwarzanie...' : 'Zarejestruj się'}
            type="submit"
            isLoading={isLoading}
          />
        </div>
      </form>
      <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
        Masz już konto?{' '}
        <NavLink
          to="/logowanie"
          className="text-emerald-600 dark:text-emerald-300 hover:underline transition-colors"
        >
          Zaloguj się
        </NavLink>
      </p>
    </div>
  );
};

RegisterForm.propTypes = {
  nick: PropTypes.string.isRequired,
  setNick: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;
