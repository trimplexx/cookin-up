import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DishCardEdit from '../components/lobby/DishCardEdit';
import Button from '../components/common/Button';
import SuspenseLoader from '../components/common/SuspenseLoader';
import { showToast } from '../utils/toastManager';
import { getCookingDayDetails, updateCookingDay } from '../api/cookingDayApi';
import { convertToBase64 } from '../utils/imageUtils';

const CookingDayEditPage = () => {
  const { id } = useParams();
  const [cookingDay, setCookingDay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCookingDayDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getCookingDayDetails(id);
        if (!response.isCurrentUser) navigate('/');
        setCookingDay(response);
        setSelectedDate(new Date(response.date) || new Date());

        const fetchedDishes = response.mealCategories.flatMap((category) =>
          category.dishes.map((dish) => ({
            ...dish,
            mealCategoryName: category.name,
          }))
        );
        setDishes(fetchedDishes);
      } catch (err) {
        showToast(
          err.message || 'Błąd ładowania szczegółów dnia gotowania.',
          'error'
        );
        navigate('/lobby/' + id);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCookingDayDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDateChange = (date) => setSelectedDate(date);

  const handleDishChange = (index, updatedDish) => {
    const newDishes = [...dishes];
    newDishes[index] = { ...newDishes[index], ...updatedDish };
    setDishes(newDishes);
  };

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);

      const updatedDishes = await Promise.all(
        dishes.map(async ({ id, name, image, mealCategoryName }) => {
          let base64Image = null;

          if (image instanceof File) {
            base64Image = await convertToBase64(image);
          } else if (
            typeof image === 'string' &&
            image.startsWith('data:image')
          ) {
            base64Image = image.split(',')[1];
          }

          return {
            id,
            name: name || null,
            image: base64Image,
            mealCategoryName: mealCategoryName || null,
          };
        })
      );

      const updateData = {
        newDate: selectedDate,
        dishes: updatedDishes,
      };

      await updateCookingDay(id, updateData);
      showToast('Zaktualizowano dzień gotowania.', 'success');
      setEditMode(false);
    } catch (err) {
      showToast(
        err.message || 'Błąd podczas aktualizacji dnia gotowania.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedDate(cookingDay.date ? new Date(cookingDay.date) : new Date());

    const resetDishes = cookingDay.mealCategories.flatMap((category) =>
      category.dishes.map((dish) => ({
        ...dish,
        mealCategoryName: category.name,
      }))
    );
    setDishes(resetDishes);
  };

  if (isLoading) return <SuspenseLoader />;

  return (
    <div className="p-4 flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Dzień Gotowania - {cookingDay.userName}
      </h2>

      {editMode ? (
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className="text-gray-700 p-2 border rounded-lg dark:bg-neutral-700 dark:text-gray-300"
        />
      ) : (
        <p className="text-gray-700 dark:text-gray-300">
          {selectedDate.toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </p>
      )}

      <div className="flex flex-col sm:flex-row justify-center mt-6 sm:space-x-4 space-y-4 sm:space-y-0">
        <Button
          text={editMode ? 'Zapisz zmiany' : 'Edytuj'}
          onClick={editMode ? handleSaveChanges : () => setEditMode(true)}
          styleClass="bg-emerald-500 text-white hover:bg-emerald-600"
        />
        {editMode && (
          <Button
            text="Anuluj"
            onClick={handleCancelEdit}
            styleClass="bg-gray-500 text-white hover:bg-gray-600"
          />
        )}
      </div>

      <div className="mt-6">
        {dishes.map((dish, index) => (
          <DishCardEdit
            key={dish.id || index}
            dish={dish}
            editMode={editMode}
            onChange={(updatedDish) => handleDishChange(index, updatedDish)}
          />
        ))}
      </div>
    </div>
  );
};

export default CookingDayEditPage;
