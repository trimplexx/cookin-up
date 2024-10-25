import PropTypes from 'prop-types';
import { FaTrash, FaPlus } from 'react-icons/fa';
import Button from '../common/Button';
import {
  addItemToBlacklist,
  removeItemFromBlacklist,
  getLobbyDetails,
} from '../../api/lobbyApi';
import { showToast } from '../../utils/toastManager';

const Blacklist = ({
  lobbyId,
  lobby,
  setLobby,
  onOpenModal,
  setOpenModal,
  onOpenConfirmationModal,
}) => {
  const handleAddItemToBlacklist = async (itemName) => {
    try {
      await addItemToBlacklist(lobbyId, itemName);
      showToast(
        'Przedmiot został pomyślnie dodany do czarnej listy.',
        'success'
      );
      const updatedLobby = await getLobbyDetails(lobbyId);
      setLobby(updatedLobby);
      setOpenModal(false);
    } catch (err) {
      showToast(
        err.message ||
          'Wystąpił błąd podczas dodawania przedmiotu do czarnej listy.',
        'error'
      );
    }
  };

  const handleRemoveItemFromBlacklist = async (itemName) => {
    try {
      await removeItemFromBlacklist(lobbyId, itemName);
      showToast('Przedmiot został usunięty z czarnej listy.', 'success');
      const updatedLobby = await getLobbyDetails(lobbyId);
      setLobby(updatedLobby);
    } catch (err) {
      showToast(
        err.message ||
          'Wystąpił błąd podczas usuwania przedmiotu z czarnej listy.',
        'error'
      );
    }
  };

  const openBlacklistConfirmationModal = (itemName) => {
    onOpenConfirmationModal(
      'Czy na pewno chcesz usunąć ten przedmiot z czarnej listy?',
      () => handleRemoveItemFromBlacklist(itemName)
    );
  };

  return (
    <div className="bg-white dark:bg-neutral-800 sm:px-6 px-4 py-6 rounded-lg shadow-lg transform transition duration-200 hover:shadow-2xl flex-col">
      <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300 mb-4 w-full flex justify-center py-4">
        Czarna lista
      </h2>
      {lobby.blacklist.length > 0 ? (
        <ul className="list-none p-0 max-h-40 overflow-y-auto">
          {lobby.blacklist.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between p-2 border-b dark:border-neutral-700"
            >
              <span className="text-gray-700 dark:text-gray-300">
                {item.name}
              </span>
              <div>
                <Button
                  onClick={() => openBlacklistConfirmationModal(item.name)}
                  styleClass="text-red-500 hover:text-red-700"
                  icon={FaTrash}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-6">
          Brak przedmiotów na czarnej liście.
        </p>
      )}
      <div className="w-full flex justify-end py-4">
        <Button
          onClick={() =>
            onOpenModal(
              'Dodawanie przedmiotu do Blacklisty',
              'Podaj nazwę przedmiotu',
              handleAddItemToBlacklist
            )
          }
          styleClass="mt-4 bg-emerald-500 text-white hover:bg-emerald-600"
          icon={FaPlus}
          text="Dodaj przedmiot"
        />
      </div>
    </div>
  );
};

Blacklist.propTypes = {
  lobbyId: PropTypes.string.isRequired,
  lobby: PropTypes.object.isRequired,
  setLobby: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  onOpenConfirmationModal: PropTypes.func.isRequired,
};

export default Blacklist;
