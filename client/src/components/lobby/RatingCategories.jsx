import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../common/Button';
import CategoryList from './CategoryList ';
import {
  addCategory,
  removeCategory,
  getLobbyDetails,
} from '../../api/lobbyApi';
import { showToast } from '../../utils/toastManager';
const RatingCategories = ({
  lobbyId,
  lobby,
  setLobby,
  onOpenModal,
  setOpenModal,
  onOpenConfirmationModal,
}) => {
  const [categoryToRemove, setCategoryToRemove] = useState(null);

  const handleAddCategory = async (categoryName, categoryType) => {
    try {
      await addCategory(lobbyId, categoryName, categoryType);
      showToast('Kategoria została pomyślnie dodana.', 'success');
      const updatedLobby = await getLobbyDetails(lobbyId);
      setLobby(updatedLobby);
      setOpenModal(false);
    } catch (err) {
      showToast(
        err.message || 'Wystąpił błąd podczas dodawania kategorii.',
        'error'
      );
    }
  };

  const handleRemoveCategory = async () => {
    if (!categoryToRemove) return;
    const { id, type } = categoryToRemove;
    try {
      await removeCategory(lobbyId, id, type);
      showToast('Kategoria została usunięta.', 'success');
      const updatedLobby = await getLobbyDetails(lobbyId);
      setLobby(updatedLobby);
    } catch (err) {
      showToast(
        err.message || 'Wystąpił błąd podczas usuwania kategorii.',
        'error'
      );
    } finally {
      setCategoryToRemove(null);
    }
  };

  const openConfirmationModal = (categoryId, categoryType) => {
    setCategoryToRemove({ id: categoryId, type: categoryType });
    onOpenConfirmationModal(
      'Czy na pewno chcesz usunąć tę kategorię?',
      handleRemoveCategory
    );
  };

  const mealCategories = lobby.mealCategories || [];
  const otherCategories = lobby.otherCategories || [];

  return (
    <div className="bg-white dark:bg-neutral-800 sm:px-6 px-4 py-6 rounded-lg shadow-lg transform transition duration-200 hover:shadow-2xl flex-col">
      <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300 mb-4 w-full flex justify-center py-4">
        Kategorie Ocen
      </h2>

      <div className="mb-4">
        <div className="flex justify-between items-center border-b-2 my-4">
          <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300 w-full flex mb-2">
            Posiłki
          </h3>
          <div className="w-10">
            <Button
              onClick={() =>
                onOpenModal(
                  'Dodawanie kategorii posiłków',
                  'Podaj nazwę kategorii posiłków',
                  (categoryName) => handleAddCategory(categoryName, 'meal')
                )
              }
              styleClass="bg-emerald-500 text-white hover:bg-emerald-600 flex items-center justify-center"
              icon={FaPlus}
            />
          </div>
        </div>
        <CategoryList
          categories={mealCategories}
          onRemoveCategory={(id) => openConfirmationModal(id, 'meal')}
          categoryType="meal"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center border-b-2 my-4">
          <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300 w-full flex mb-2">
            Inne
          </h3>
          <div className="w-10">
            <Button
              onClick={() =>
                onOpenModal(
                  'Dodawanie innych kategorii',
                  'Podaj nazwę kategorii',
                  (categoryName) => handleAddCategory(categoryName, 'other')
                )
              }
              styleClass="bg-emerald-500 text-white hover:bg-emerald-600 flex items-center justify-center"
              icon={FaPlus}
            />
          </div>
        </div>
        <CategoryList
          categories={otherCategories}
          onRemoveCategory={(id) => openConfirmationModal(id, 'other')}
          categoryType="other"
        />
      </div>
    </div>
  );
};

RatingCategories.propTypes = {
  lobbyId: PropTypes.number.isRequired,
  lobby: PropTypes.object.isRequired,
  setLobby: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  onOpenConfirmationModal: PropTypes.func.isRequired,
};

export default RatingCategories;
