import { useEffect, useState } from "react";
import { getUserLobbies } from "../api/lobbyApi";
import { showToast } from "../utils/toastManager";
import SuspenseLoader from "../components/SuspenseLoader";
import RootPageLobbies from "../components/RootPageLobbies";
import clsx from "clsx";

const RootPage = () => {
  const [lobbies, setLobbies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const userLobbies = await getUserLobbies();
        setLobbies(userLobbies);
      } catch (error) {
        showToast(
          error.message || "Wystąpił błąd podczas ładowania lobby.",
          "error"
        );
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
        <RootPageLobbies
          to="/tworzenie-lobby"
          title="Utwórz lobby"
          isCreateLobby={true}
        />
      </div>

      {lobbies.length === 0 ? (
        <div />
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {lobbies.map((lobby) => (
            <RootPageLobbies
              key={lobby.id}
              to={clsx("/lobby/" + lobby.id)}
              title={lobby.name}
              subtitle={`${lobby.playersCount} graczy`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RootPage;
