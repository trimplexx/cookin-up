import DarkModeButton from '../components/DarkModeButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getUserName } from '../api/usersApi';
import { showToast } from '../utils/toastManager';

const Navbar = () => {
  const { handleLogout, isAuthenticated } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const fetchedUserName = await getUserName();
        setUserName(fetchedUserName);
        localStorage.setItem('userName', fetchedUserName);
      } catch (error) {
        showToast('Wystąpił błąd przy pobieraniu nazwy użytkownika.', 'error');
      }
    };

    if (!userName && isAuthenticated) {
      fetchUserName();
    }
  }, [userName, isAuthenticated]);

  const handleChangeNick = () => {
    setMenuVisible(false);
    navigate('/zmien-nick');
  };

  const handleChangePassword = () => {
    setMenuVisible(false);
    navigate('/zmien-haslo');
  };

  const onLogout = () => {
    handleLogout();
    setMenuVisible(false);
    navigate('/logowanie');
  };

  return (
    <div className="w-full justify-between flex px-1 py-6 sm:p-8 bg-emerald-300 dark:bg-emerald-900 items-center border-b-2 border-neutral-200 dark:border-neutral-500">
      <DarkModeButton />
      {isAuthenticated && (
        <div className="relative menu-container">
          <p
            className="text-xl font-extrabold text-center dark:text-white text-emerald-900 cursor-pointer"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            {userName || 'user'}
          </p>

          {menuVisible && (
            <div className="absolute z-10 right-0 mt-2 w-48 bg-white dark:bg-neutral-800 shadow-lg rounded-lg">
              <ul className="text-center font-bold dark:text-white">
                <li
                  className="cursor-pointer px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-800 hover:rounded-t-lg"
                  onClick={handleChangeNick}
                >
                  Zmień nick
                </li>
                <li
                  className="cursor-pointer px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-800"
                  onClick={handleChangePassword}
                >
                  Zmień hasło
                </li>
                <li
                  className="cursor-pointer px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-800 text-red-600 hover:rounded-b-lg"
                  onClick={onLogout}
                >
                  Wyloguj
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
