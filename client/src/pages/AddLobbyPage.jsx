import { useState } from 'react';
import InputField from '../components/InputField';
import FormButton from '../components/FormButton';
import { createLobby } from '../api/lobbyApi';
import { showToast } from '../utils/toastManager';
import { useNavigate } from 'react-router-dom';

const AddLobbyPage = () => {
  const navigate = useNavigate();
  const [lobbyName, setLobbyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateLobby = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await createLobby(lobbyName);
      showToast.success('Lobby zostało pomyślnie utworzone.', '');
      navigate('/');
    } catch (error) {
      showToast(
        error.message || 'Wystąpił błąd podczas tworzenia lobby.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="h-3/4 flex items-center justify-center">
        <div className="bg-white dark:bg-neutral-800 sm:px-10 px-6 py-10 rounded-lg shadow-lg max-w-lg w-full transform transition duration-200 hover:shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-emerald-600 dark:text-emerald-300 mb-6">
            Stwórz nowe lobby
          </h2>
          <form className="space-y-6" onSubmit={handleCreateLobby}>
            <InputField
              id="lobbyName"
              label="Nazwa lobby"
              type="text"
              placeholder="Podaj nazwę lobby"
              value={lobbyName}
              onChange={(e) => setLobbyName(e.target.value)}
            />
            <div className="flex justify-between items-center mb-6">
              <FormButton
                label={isLoading ? 'Tworzenie...' : 'Stwórz lobby'}
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLobbyPage;
