import { NavLink } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";
import { useState } from "react";
const RootPage = () => {
  useAuthCheck();

  const [lobbies] = useState([
    { id: 1, name: "Lobby 1", players: 5 },
    { id: 2, name: "Lobby 2", players: 3 },
  ]);

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-center mb-6">
        <NavLink
          className="cursor-pointer bg-white dark:bg-neutral-800 py-6 rounded-lg shadow-lg max-w-72 w-full transform transition duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 active:bg-emerald-100 dark:active:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-700"
          to="/tworzenie-lobby"
        >
          <h2 className="text-3xl font-extrabold text-center text-emerald-600 dark:text-emerald-300 mb-2">
            Utwórz lobby
          </h2>
          <h2 className="text-4xl font-extrabold text-center text-emerald-600 dark:text-emerald-300">
            +
          </h2>
        </NavLink>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {lobbies.map((lobby) => (
          <div
            key={lobby.id}
            className="cursor-pointer bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg transform transition duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 active:bg-emerald-100 dark:active:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-700 flex-grow min-w-[250px] max-w-[300px]"
            role="button"
            tabIndex="0"
          >
            <h3 className="text-2xl font-extrabold text-center text-emerald-600 dark:text-emerald-300 mb-3">
              {lobby.name}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400">
              {lobby.players} graczy
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RootPage;
