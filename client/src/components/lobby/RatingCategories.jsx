import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import Button from '../common/Button';

const RatingCategories = ({
  mealCategories = [],
  otherCategories = [],
  onAddCategoryClick,
}) => {
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
              onClick={() => onAddCategoryClick('meal')}
              styleClass="bg-emerald-500 text-white hover:bg-emerald-600 flex items-center justify-center"
              icon={FaPlus}
            />
          </div>
        </div>
        {mealCategories.length > 0 ? (
          <ul className="list-none p-0 max-h-40 overflow-y-auto">
            {mealCategories.map((category) => (
              <li
                key={category.id}
                className="flex items-center justify-between p-2 border-b dark:border-neutral-700"
              >
                <span className="text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-2">
            Brak kategorii posiłków.
          </p>
        )}
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center border-b-2 my-4">
          <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300 w-full flex mb-2">
            Inne
          </h3>
          <div className="w-10">
            <Button
              onClick={() => onAddCategoryClick('other')}
              styleClass="bg-emerald-500 text-white hover:bg-emerald-600 flex items-center justify-center"
              icon={FaPlus}
            />
          </div>
        </div>
        {otherCategories.length > 0 ? (
          <ul className="list-none p-0 max-h-40 overflow-y-auto">
            {otherCategories.map((category) => (
              <li
                key={category.id}
                className="flex items-center justify-between p-2 border-b dark:border-neutral-700"
              >
                <span className="text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            Brak innych kategorii.
          </p>
        )}
      </div>
    </div>
  );
};

RatingCategories.propTypes = {
  mealCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  otherCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onAddCategoryClick: PropTypes.func.isRequired,
};

export default RatingCategories;
