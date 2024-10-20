import DarkModeButton from "../components/DarkModeButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getUserName } from "../api/usersApi";
import { showToast } from "../utils/toastManager";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const { handleLogout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const fetchedUserName = await getUserName();
        setUserName(fetchedUserName);
        localStorage.setItem("userName", fetchedUserName);
      } catch (error) {
        showToast("Wystąpił błąd przy pobieraniu nazwy użytkownika.", "error");
      }
    };

    if (userName == "undefined" && isAuthenticated) {
      fetchUserName();
    }
  }, [userName, isAuthenticated]);

  const handleChangeNick = () => {
    navigate("/zmien-nick");
  };

  const handleChangePassword = () => {
    navigate("/zmien-haslo");
  };

  const onLogout = () => {
    handleLogout();
    navigate("/logowanie");
  };

  return (
    <div className="w-full justify-between flex px-1 py-6 sm:p-8 bg-emerald-300 dark:bg-emerald-900 items-center border-b-2 border-neutral-200 dark:border-neutral-500">
      <DarkModeButton />
      {isAuthenticated && (
        <UserDropdown
          userName={userName || "user"}
          onChangeNick={handleChangeNick}
          onChangePassword={handleChangePassword}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};

export default Navbar;
