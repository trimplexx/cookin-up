import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserLobbies } from '../api/lobbyApi';
import { toast } from 'react-hot-toast';
import SuspenseLoader from '../components/SuspenseLoader';
import clsx from 'clsx';

const RootPage = () => {
  const [lobbies, setLobbies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          return;
        }
        const userLobbies = await getUserLobbies(token);
        setLobbies(userLobbies);
      } catch (error) {
        toast.error(error.message || 'Wystąpił błąd podczas ładowania lobby.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLobbies();
  }, []);

  if (isLoading) {
    return <SuspenseLoader />;
  }

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

      {lobbies.length === 0 ? (
        <div />
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {lobbies.map((lobby) => (
            <NavLink
              key={lobby.id}
              to={clsx('/lobby/' + lobby.id)}
              className="cursor-pointer bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg transform transition duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 active:bg-emerald-100 dark:active:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-700 flex-grow min-w-[250px] max-w-[300px]"
            >
              <h3 className="text-2xl font-extrabold text-center text-emerald-600 dark:text-emerald-300 mb-3">
                {lobby.name}
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-400">
                {lobby.playersCount} graczy
              </p>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default RootPage;
