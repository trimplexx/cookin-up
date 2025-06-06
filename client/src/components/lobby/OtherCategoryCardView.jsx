import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const OtherCategoryCardView = ({
  category,
  onRate,
  initialRating,
  initialComment,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(initialComment || '');

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    onRate(category.id, rating, 'other', comment);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
      <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300 mb-2">
        {category.name}
      </h3>

      <div className="flex items-center space-x-1">
        {[...Array(10)].map((_, index) => {
          const starRating = index + 1;
          return (
            <FaStar
              key={starRating}
              onClick={() => handleRating(starRating)}
              onMouseEnter={() => setHoverRating(starRating)}
              onMouseLeave={() => setHoverRating(0)}
              className={clsx(
                'cursor-pointer',
                starRating <= (hoverRating || rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              )}
            />
          );
        })}
      </div>

      <textarea
        className="w-full mt-2 p-2 border border-gray-300 rounded text-neutral-800  dark:bg-neutral-700 dark:text-white"
        placeholder="Dodaj komentarz..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 "
      >
        Wyślij ocenę i komentarz za kategorię
      </button>
    </div>
  );
};

OtherCategoryCardView.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onRate: PropTypes.func.isRequired,
  initialRating: PropTypes.number.isRequired,
  initialComment: PropTypes.string,
};

export default OtherCategoryCardView;
