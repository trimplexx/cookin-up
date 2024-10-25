import DarkModeButton from './DarkModeButton';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getUserName } from '../../api/usersApi';
import { showToast } from '../../utils/toastManager';
import UserDropdown from './UserDropdown';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { handleLogout, isAuthenticated, userName, updateUserName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const fetchedUserName = await getUserName();
        updateUserName(fetchedUserName); 
      } catch (error) {
        showToast('Wystąpił błąd przy pobieraniu nazwy użytkownika.', 'error');
      }
    };

    if ((!userName || userName === 'undefined') && isAuthenticated) {
      fetchUserName();
    }
  }, [userName, isAuthenticated, updateUserName]);

  const handleChangeNick = () => {
    navigate('/zmien-nick');
  };

  const handleChangePassword = () => {
    navigate('/zmien-haslo');
  };

  const onLogout = () => {
    handleLogout();
    navigate('/logowanie');
  };

  return (
    <div className="w-full justify-between flex px-1 py-6 sm:p-8 bg-emerald-300 dark:bg-emerald-900 items-center border-b-2 border-neutral-200 dark:border-neutral-500">
      <DarkModeButton />
      {isAuthenticated && (
        <NavLink
          className="text-xl font-extrabold text-center dark:text-white text-emerald-900 cursor-pointer hover:underline"
          to="/"
        >
          Strona główna
        </NavLink>
      )}
      {isAuthenticated && (
        <UserDropdown
          userName={userName || 'user'}
          onChangeNick={handleChangeNick}
          onChangePassword={handleChangePassword}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};

export default Navbar;
