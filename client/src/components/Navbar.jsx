import DarkModeButton from "../components/DarkModeButton";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState();
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodeToken = jwtDecode(token);
      setUserName(decodeToken.Name);
    }
  }, []);

  const handleChangeNick = () => {
    navigate("/zmien-nick");
  };

  const handleChangePassword = () => {
    navigate("/zmien-haslo");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/logowanie");
  };

  return (
    <div className="w-full justify-between flex px-1 py-6 sm:p-8 bg-emerald-300 dark:bg-emerald-900 items-center border-b-2 border-neutral-200 dark:border-neutral-500">
      <DarkModeButton />
      <div className="relative">
        <p
          className="text-xl font-extrabold text-center dark:text-white text-emerald-900 cursor-pointer"
          onClick={() => setMenuVisible(!menuVisible)}
        >
          {userName}
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
                onClick={handleLogout}
              >
                Wyloguj
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
