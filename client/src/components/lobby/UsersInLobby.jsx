import PropTypes from 'prop-types';
import { FaTrash, FaPlus } from 'react-icons/fa';
import Button from '../common/Button';
import {
  addUserToLobby,
  removeUserFromLobby,
  getLobbyDetails,
} from '../../api/lobbyApi';
import { showToast } from '../../utils/toastManager';

const UsersInLobby = ({
  lobbyId,
  lobby,
  setLobby,
  onOpenModal,
  setOpenModal,
  onOpenConfirmationModal,
  isOwner,
}) => {
  const handleAddUser = async (userName) => {
    try {
      await addUserToLobby(lobbyId, userName);
      showToast('Użytkownik został pomyślnie dodany.', 'success');
      const updatedLobby = await getLobbyDetails(lobbyId);
      setLobby(updatedLobby);
      setOpenModal(false);
    } catch (err) {
      showToast(
        err.message || 'Wystąpił błąd podczas dodawania użytkownika.',
        'error'
      );
    }
  };

  const handleRemoveUser = async (userName) => {
    try {
      await removeUserFromLobby(lobbyId, userName);
      showToast('Użytkownik został usunięty.', 'success');
      const updatedLobby = await getLobbyDetails(lobbyId);
      setLobby(updatedLobby);
    } catch (err) {
      showToast(
        err.message || 'Wystąpił błąd podczas usuwania użytkownika.',
        'error'
      );
    }
  };

  const openUserConfirmationModal = (userName) => {
    onOpenConfirmationModal(
      'Czy na pewno chcesz usunąć tego użytkownika?',
      () => handleRemoveUser(userName)
    );
  };

  return (
    <div className="bg-white dark:bg-neutral-800 sm:px-6 px-4 py-6 rounded-lg shadow-lg transform transition duration-200 hover:shadow-2xl flex-col">
      <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300 mb-4 w-full flex justify-center py-4">
        Lista użytkowników
      </h2>
      {lobby.users.length > 0 ? (
        <ul className="list-none p-0 max-h-40 overflow-y-auto">
          {lobby.users.map((user) => (
            <li
              key={user.userId}
              className="flex items-center justify-between p-2 border-b dark:border-neutral-700"
            >
              <span className="text-gray-700 dark:text-gray-300">
                {user.userName}
              </span>
              {isOwner && (
                <div>
                  <Button
                    onClick={() => openUserConfirmationModal(user.userName)}
                    styleClass="text-red-500 hover:text-red-700"
                    icon={FaTrash}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-6">
          Brak użytkowników w lobby.
        </p>
      )}
      <div className="w-full flex justify-end py-4">
        <Button
          onClick={() =>
            onOpenModal(
              'Dodaj użytkownika',
              'Podaj nazwę użytkownika',
              handleAddUser
            )
          }
          styleClass="mt-4 bg-emerald-500 text-white hover:bg-emerald-600"
          icon={FaPlus}
          text="Dodaj użytkownika"
        />
      </div>
    </div>
  );
};

UsersInLobby.propTypes = {
  lobbyId: PropTypes.string.isRequired,
  lobby: PropTypes.object.isRequired,
  setLobby: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  onOpenConfirmationModal: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default UsersInLobby;
