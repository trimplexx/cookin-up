import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLobbySummary } from '../api/ratingApi';
import SuspenseLoader from '../components/common/SuspenseLoader';
import { showToast } from '../utils/toastManager';
import RankingTable from '../components/lobby/RankingTable';

const SummaryPage = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shuffling, setShuffling] = useState(true);
  const [shuffledRatings, setShuffledRatings] = useState([]);

  const shuffleArrayWithRandomRatings = (array) => {
    return array
      .map((item) => ({
        ...item,
        shuffleIndex: Math.random(),
        totalAverageRating: parseFloat((Math.random() * 5).toFixed(2)),
        mealCategoryRatings: item.mealCategoryRatings.map((cat) => ({
          ...cat,
          averageRating: parseFloat((Math.random() * 5).toFixed(2)),
        })),
        otherCategoryRatings: item.otherCategoryRatings.map((cat) => ({
          ...cat,
          averageRating: parseFloat((Math.random() * 5).toFixed(2)),
        })),
      }))
      .sort((a, b) => a.shuffleIndex - b.shuffleIndex);
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setIsLoading(true);
        const response = await getLobbySummary(id);
        const sortedRatings = response.userRatings
          .map((user) => ({
            ...user,
            totalAverageRating: parseFloat(
              (
                [
                  ...user.mealCategoryRatings,
                  ...user.otherCategoryRatings,
                ].reduce((sum, rating) => sum + rating.averageRating, 0) /
                (user.mealCategoryRatings.length +
                  user.otherCategoryRatings.length)
              ).toFixed(2)
            ),
          }))
          .sort((a, b) => b.totalAverageRating - a.totalAverageRating);

        setSummary({ ...response, userRatings: sortedRatings });
        setShuffledRatings(shuffleArrayWithRandomRatings(sortedRatings));

        setShuffling(true);
        let shuffleInterval = setInterval(() => {
          setShuffledRatings(shuffleArrayWithRandomRatings(sortedRatings));
        }, 500);

        setTimeout(() => {
          clearInterval(shuffleInterval);
          setShuffling(false);
        }, 10000);
      } catch (err) {
        showToast(
          err.message || 'Wystąpił błąd podczas ładowania podsumowania.',
          'error'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [id]);

  if (isLoading) {
    return <SuspenseLoader />;
  }

  return (
    <div className="p-1 sm:p-4 flex flex-col items-center w-full">
      <h1 className="py-4 text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-300">
        Podsumowanie ocen
      </h1>
      {summary ? (
        <RankingTable
          userRatings={shuffling ? shuffledRatings : summary.userRatings}
          isShuffling={shuffling}
        />
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          Brak danych do wyświetlenia.
        </p>
      )}
    </div>
  );
};

export default SummaryPage;
