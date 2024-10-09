import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';
import { getLobbyDetails } from '../api/lobbyApi';

const SingleLobbyPage = () => {
  const { id } = useParams();
  const [lobby, setLobby] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLobbyDetails = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('jwtToken');
        const response = await getLobbyDetails(id, token);
        setLobby(response);
      } catch (err) {
        setError(
          err.message || 'Wystąpił błąd podczas pobierania szczegółów lobby'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLobbyDetails();
  }, [id]);

  if (isLoading) {
    return <SuspenseLoader />;
  }

  if (error) {
    return <div className="p-4">Błąd: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lobby: {lobby.name}</h1>
      <h2 className="text-xl font-semibold mb-2">Użytkownicy:</h2>
      <ul className="list-disc pl-6">
        {lobby.users.map((user) => (
          <li key={user.userId}>{user.userName}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4 mb-2">Czarna Lista:</h2>
      {lobby.blacklist.length > 0 ? (
        <ul className="list-disc pl-6">
          {lobby.blacklist.map((blacklisted) => (
            <li key={blacklisted.id}>{blacklisted.name}</li>
          ))}
        </ul>
      ) : (
        <p>Brak użytkowników na czarnej liście.</p>
      )}
    </div>
  );
};

export default SingleLobbyPage;
