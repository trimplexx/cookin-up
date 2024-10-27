import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SuspenseLoader from '../components/common/SuspenseLoader';
import { showToast } from '../utils/toastManager';
import { getCookingDayDetails } from '../api/cookingDayApi';
import { rateCategory } from '../api/ratingApi';
import OtherCategoryTile from '../components/lobby/OtherCategoryCardView';
import DishCardView from '../components/lobby/DishCardView';

const CookingDayViewPage = () => {
  const { id, lobbyId } = useParams();
  const [cookingDay, setCookingDay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCookingDayDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getCookingDayDetails(id);
        setCookingDay(response);
        setCategories(
          (response.otherCategories || []).map((category) => ({
            ...category,
            rating:
              response.userReviews?.find(
                (review) =>
                  review.categoryId === category.id &&
                  review.categoryType === 'OtherCategory'
              )?.rating || 0,
          }))
        );

        setDishes(
          response.mealCategories.flatMap((category) =>
            category.dishes.map((dish) => ({
              ...dish,
              mealCategoryId: category.id,
              rating:
                response.userReviews?.find(
                  (review) =>
                    review.categoryId === category.id &&
                    review.categoryType === 'MealCategory'
                )?.rating || 0,
            }))
          )
        );
      } catch (err) {
        showToast(
          err.message || 'Błąd ładowania szczegółów dnia gotowania.',
          'error'
        );
        navigate('/lobby/' + lobbyId);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCookingDayDetails();
  }, [id, navigate, lobbyId]);

  const handleRateCategory = async (categoryId, rating, categoryType) => {
    try {
      await rateCategory(categoryId, categoryType, rating, lobbyId, id);
      showToast('Oceniono kategorię na ' + rating, 'success');
    } catch (err) {
      showToast('Błąd podczas oceniania kategorii.', 'error');
    }
  };

  if (isLoading) return <SuspenseLoader />;

  return (
    <div className="p-4 flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Ocena Dnia Gotowania - {cookingDay.userName}
      </h2>

      <p className="text-gray-700 dark:text-gray-300">
        {new Date(cookingDay.date).toLocaleDateString('pl-PL', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}
      </p>

      <div className="mt-6 w-full max-w-3xl space-y-4">
        <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300 mb-4">
          Kategorie Posiłków
        </h3>
        {dishes.map((dish) => (
          <DishCardView
            key={dish.id}
            dish={dish}
            mealCategoryId={dish.mealCategoryId}
            onRate={handleRateCategory}
            initialRating={dish.rating}
          />
        ))}
      </div>

      <div className="mt-6 w-full max-w-3xl space-y-4">
        <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300 mb-4">
          Inne Kategorie
        </h3>
        {categories.map((category) => (
          <OtherCategoryTile
            key={category.id}
            category={category}
            onRate={handleRateCategory}
            initialRating={category.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default CookingDayViewPage;
