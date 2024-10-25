import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const UserDropdown = ({
  userName,
  onChangeNick,
  onChangePassword,
  onLogout,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuVisible]);

  return (
    <div className="relative menu-container" ref={menuRef}>
      <p
        className="text-xl font-extrabold text-center dark:text-white text-emerald-900 cursor-pointer hover:underline"
        onClick={toggleMenu}
      >
        {userName}
      </p>

      {menuVisible && (
        <div className="absolute z-10 right-0 mt-2 w-48 bg-white dark:bg-neutral-800 shadow-lg rounded-lg">
          <ul className="text-center font-bold dark:text-white">
            <li
              className="cursor-pointer px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-800 hover:rounded-t-lg"
              onClick={() => {
                onChangeNick();
                closeMenu();
              }}
            >
              Zmień nick
            </li>
            <li
              className="cursor-pointer px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-800"
              onClick={() => {
                onChangePassword();
                closeMenu();
              }}
            >
              Zmień hasło
            </li>
            <li
              className="cursor-pointer px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-800 text-red-600 hover:rounded-b-lg"
              onClick={() => {
                onLogout();
                closeMenu();
              }}
            >
              Wyloguj
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

UserDropdown.propTypes = {
  userName: PropTypes.string.isRequired,
  onChangeNick: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default UserDropdown;
