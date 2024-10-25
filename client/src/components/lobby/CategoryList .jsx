import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import Button from '../common/Button';

const CategoryList = ({ categories, onRemoveCategory, categoryType }) => {
  return (
    <ul className="list-none p-0 max-h-40 overflow-y-auto">
      {categories.length > 0 ? (
        categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center justify-between p-2 border-b dark:border-neutral-700"
          >
            <span className="text-gray-700 dark:text-gray-300">
              {category.name}
            </span>
            <div>
              <Button
                onClick={() => onRemoveCategory(category.id, categoryType)}
                styleClass="text-red-500 hover:text-red-700"
                icon={FaTrash}
              />
            </div>
          </li>
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-2">
          Brak kategorii.
        </p>
      )}
    </ul>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  onRemoveCategory: PropTypes.func.isRequired,
  categoryType: PropTypes.string.isRequired,
};

export default CategoryList;
