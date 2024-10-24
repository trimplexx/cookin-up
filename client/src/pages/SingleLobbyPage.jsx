import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';
import {
  getLobbyDetails,
  addUserToLobby,
  addItemToBlacklist,
  removeItemFromBlacklist,
  removeUserFromLobby,
  deleteLobby,
} from '../api/lobbyApi';
import Blacklist from '../components/Blacklist';
import UsersInLobby from '../components/UsersInLobby';
import { showToast } from '../utils/toastManager';
import ToggleButton from '../components/ToggleButton';
import AddItemModal from '../components/AddItemModal';
import { FaTrash } from 'react-icons/fa';

const SingleLobbyPage = () => {
  const { id } = useParams();
  const [lobby, setLobby] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalPlaceholder, setModalPlaceholder] = useState('');
  const [title, setTitle] = useState('');
  const [onAddFunction, setOnAddFunction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLobbyDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getLobbyDetails(id);
        setLobby(response);
      } catch (err) {
        showToast(
          err.message || 'Wystąpił błąd podczas ładowania lobby.',
          'error'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLobbyDetails();
  }, [id]);

  const handleTabClick = (tab) => {
    setActiveTab((prevTab) => (prevTab === tab ? null : tab));
  };

  const handleOpenModal = (title, placeholder, addFunction) => {
    setTitle(title);
    setModalPlaceholder(placeholder);
    setOnAddFunction(() => addFunction);
    setModalOpen(true);
  };

  const handleAddUser = async (userName) => {
    try {
      await addUserToLobby(id, userName);
      showToast('Użytkownik został pomyślnie dodany do lobby.', 'success');
      const updatedLobby = await getLobbyDetails(id);
      setLobby(updatedLobby);
      setModalOpen(false);
    } catch (err) {
      showToast(
        err.message || 'Wystąpił błąd podczas dodawania użytkownika do lobby.',
        'error'
      );
    }
  };

  const handleAddItemToBlacklist = async (itemName) => {
    try {
      await addItemToBlacklist(lobby.lobbyId, itemName);
      showToast(
        'Przedmiot został pomyślnie dodany do czarnej listy.',
        'success'
      );
      const updatedLobby = await getLobbyDetails(id);
      setLobby(updatedLobby);
      setModalOpen(false);
    } catch (err) {
      showToast(
        err.message ||
          'Wystąpił błąd podczas dodawania przedmiotu do czarnej listy.',
        'error'
      );
    }
  };

  const handleRemoveUser = async (userName) => {
    try {
      setIsLoading(true);
      await removeUserFromLobby(lobby.lobbyId, userName);
      showToast('Użytkownik został usunięty z lobby.', 'success');
      const updatedLobby = await getLobbyDetails(id);
      setLobby(updatedLobby);
    } catch (err) {
      showToast(
        err.message || 'Wystąpił błąd podczas usuwania użytkownika z lobby.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItemFromBlacklist = async (itemName) => {
    try {
      setIsLoading(true);
      await removeItemFromBlacklist(lobby.lobbyId, itemName);
      showToast('Przedmiot został usunięty z czarnej listy.', 'success');
      const updatedLobby = await getLobbyDetails(id);
      setLobby(updatedLobby);
    } catch (err) {
      showToast(
        err.message ||
          'Wystąpił błąd podczas usuwania przedmiotu z czarnej listy.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLobby = async () => {
    try {
      setIsLoading(true);
      await deleteLobby(lobby.lobbyId);
      showToast('Lobby zostało usunięte.', 'success');
      navigate('/');
    } catch (err) {
      showToast(
        err.message || 'Wystąpił błąd podczas usuwania lobby.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SuspenseLoader />;
  }

  return (
    <div className="p-4 flex flex-col items-center w-full">
      <div className="flex justify-center mb-4 space-x-4">
        <ToggleButton
          label="Lista użytkowników"
          onClick={() => handleTabClick('users')}
          isActive={activeTab === 'users'}
        />
        <ToggleButton
          label="Blacklist"
          onClick={() => handleTabClick('blacklist')}
          isActive={activeTab === 'blacklist'}
        />

        {lobby.isOwner && (
          <ToggleButton
            onClick={handleDeleteLobby}
            isActive={false}
            label="Usuń lobby"
          >
            <FaTrash className="w-6 h-6 text-red-600" />
          </ToggleButton>
        )}
      </div>

      <div className="w-full max-w-3xl">
        {activeTab === 'users' && (
          <UsersInLobby
            users={lobby.users}
            onRemoveUser={(userName) => handleRemoveUser(userName)}
            onAddUserClick={() =>
              handleOpenModal(
                'Dodawanie użytkownika do lobby',
                'Podaj nazwę użytkownika',
                handleAddUser
              )
            }
          />
        )}
        {activeTab === 'blacklist' && (
          <Blacklist
            blacklist={lobby.blacklist}
            onRemoveItem={(itemName) => handleRemoveItemFromBlacklist(itemName)}
            onAddItemClick={() =>
              handleOpenModal(
                'Dodawanie przedmiotu do Blacklisty',
                'Podaj nazwę przedmiotu',
                handleAddItemToBlacklist
              )
            }
          />
        )}
      </div>

      {isModalOpen && (
        <AddItemModal
          title={title}
          onClose={() => setModalOpen(false)}
          onAdd={onAddFunction}
          placeholder={modalPlaceholder}
        />
      )}
    </div>
  );
};

export default SingleLobbyPage;
