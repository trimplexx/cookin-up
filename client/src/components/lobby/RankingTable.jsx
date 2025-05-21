import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CommentsModal from './CommentsModal'; // Importujemy modal

const RankingTable = ({ userRatings, isShuffling }) => {
  const [selectedComments, setSelectedComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowComments = (comments) => {
    setSelectedComments(comments);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedComments([]);
  };

  return (
    <div className="w-full max-w-6xl overflow-x-auto text-md sm:text-lg">
      <table className="min-w-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-emerald-600 dark:bg-emerald-700 text-white">
            <th className="py-2 px-3 sm:py-3 sm:px-4 text-center">#</th>
            <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Użytkownik</th>
            <th className="py-2 px-3 sm:py-3 sm:px-6 text-right">
              Średnia ocena
            </th>
            <th className="py-2 px-3 sm:py-3 sm:px-6 text-center">
              Komentarze
            </th>
          </tr>
        </thead>
        <tbody>
          {userRatings.map((userRating, index) => (
            <tr
              key={userRating.userId}
              className={clsx(
                index % 2 === 0
                  ? 'bg-emerald-50 dark:bg-neutral-900 dark:text-gray-200'
                  : 'bg-white dark:bg-neutral-800 dark:text-gray-300',
                'hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors duration-200',
                isShuffling &&
                  'animate-pulse text-emerald-600 dark:text-emerald-400'
              )}
            >
              <td className="py-3 px-3 sm:px-4 text-center font-semibold">
                {index + 1}
              </td>
              <td className="py-3 px-3 sm:px-6 font-semibold">
                {userRating.userName}
              </td>
              <td className="py-3 px-3 sm:px-6 text-right">
                {userRating.totalAverageRating}
              </td>
              <td className="py-3 px-3 sm:px-6 text-center">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                  onClick={() =>
                    handleShowComments([
                      ...userRating.mealCategoryRatings.flatMap(
                        (cat) => cat.comments
                      ),
                      ...userRating.otherCategoryRatings.flatMap(
                        (cat) => cat.comments
                      ),
                    ])
                  }
                >
                  Pokaż
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <CommentsModal comments={selectedComments} onClose={handleCloseModal} />
      )}
    </div>
  );
};

RankingTable.propTypes = {
  userRatings: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      userName: PropTypes.string.isRequired,
      totalAverageRating: PropTypes.number.isRequired,
      mealCategoryRatings: PropTypes.arrayOf(
        PropTypes.shape({
          categoryName: PropTypes.string.isRequired,
          averageRating: PropTypes.number.isRequired,
        })
      ).isRequired,
      otherCategoryRatings: PropTypes.arrayOf(
        PropTypes.shape({
          categoryName: PropTypes.string.isRequired,
          averageRating: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  isShuffling: PropTypes.bool.isRequired,
};

export default RankingTable;
