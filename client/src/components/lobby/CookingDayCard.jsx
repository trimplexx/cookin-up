import clsx from 'clsx';
import PropTypes from 'prop-types';

const CookingDayCard = ({ name, content, isCurrentUser, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg transform transition duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 mb-4 cursor-pointer"
    >
      <div className="flex flex-row justify-between items-center">
        <h3
          className={clsx(
            'text-xl font-bold mb-2',
            isCurrentUser
              ? 'text-blue-600 dark:text-blue-500'
              : 'text-emerald-600 dark:text-emerald-300'
          )}
        >
          Dzień gotowania - {name}
        </h3>
        <p
          className={clsx(
            'text-sm',
            isCurrentUser
              ? 'text-blue-600 dark:text-blue-500'
              : 'text-emerald-600 dark:text-emerald-300'
          )}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

CookingDayCard.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string,
  isCurrentUser: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default CookingDayCard;
