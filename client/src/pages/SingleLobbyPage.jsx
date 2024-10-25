import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SuspenseLoader from '../components/common/SuspenseLoader';
import { getLobbyDetails, deleteLobby } from '../api/lobbyApi';
import Blacklist from '../components/lobby/Blacklist';
import UsersInLobby from '../components/lobby/UsersInLobby';
import { showToast } from '../utils/toastManager';
import ToggleButton from '../components/common/ToggleButton';
import AddItemModal from '../components/lobby/AddItemModal';
import { FaTrash } from 'react-icons/fa';
import RatingCategories from '../components/lobby/RatingCategories';
import { useConfirmation } from '../hooks/useConfirmation';

const SingleLobbyPage = () => {
  const { id } = useParams();
  const [lobby, setLobby] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalPlaceholder, setModalPlaceholder] = useState('');
  const [title, setTitle] = useState('');
  const [onAddFunction, setOnAddFunction] = useState(null);
  const openConfirmationModal = useConfirmation();

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
        navigate('/');
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

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteLobby = () => {
    openConfirmationModal('Czy na pewno chcesz usunąć to lobby?', async () => {
      try {
        setIsLoading(true);
        await deleteLobby(lobby.lobbyId);
        showToast('Lobby zostało usunięte.', 'success');
        navigate('/');
      } catch (err) {
        showToast(err.message || 'Błąd podczas usuwania lobby.', 'error');
      } finally {
        setIsLoading(false);
      }
    });
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
        <ToggleButton
          label="Kategorie ocen"
          onClick={() => handleTabClick('ratingCategories')}
          isActive={activeTab === 'ratingCategories'}
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
            lobbyId={id}
            lobby={lobby}
            setLobby={setLobby}
            onOpenModal={handleOpenModal}
            setOpenModal={setModalOpen}
            onOpenConfirmationModal={openConfirmationModal}
          />
        )}
        {activeTab === 'blacklist' && (
          <Blacklist
            lobbyId={id}
            lobby={lobby}
            setLobby={setLobby}
            onOpenModal={handleOpenModal}
            setOpenModal={setModalOpen}
            onOpenConfirmationModal={openConfirmationModal}
          />
        )}
        {activeTab === 'ratingCategories' && (
          <RatingCategories
            lobbyId={id}
            lobby={lobby}
            setLobby={setLobby}
            onOpenModal={handleOpenModal}
            setOpenModal={setModalOpen}
            onOpenConfirmationModal={openConfirmationModal}
          />
        )}
      </div>

      {isModalOpen && (
        <AddItemModal
          title={title}
          onClose={handleCloseModal}
          onAdd={onAddFunction}
          placeholder={modalPlaceholder}
        />
      )}
    </div>
  );
};

export default SingleLobbyPage;
