import PropTypes from 'prop-types';
import { FaTrash, FaPlus } from 'react-icons/fa';
import Button from '../common/Button';

const Blacklist = ({ blacklist, onRemoveItem, onAddItemClick }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 sm:px-6 px-4 py-6 rounded-lg shadow-lg transform transition duration-200 hover:shadow-2xl flex-col">
      <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300 mb-4 w-full flex justify-center py-4">
        Czarna lista
      </h2>
      {blacklist.length > 0 ? (
        <ul className="list-none p-0 max-h-40 overflow-y-auto">
          {blacklist.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between p-2 border-b dark:border-neutral-700"
            >
              <span className="text-gray-700 dark:text-gray-300">
                {item.name}
              </span>
              <div>
                <Button
                  onClick={() => onRemoveItem(item.name)}
                  styleClass="text-red-500 hover:text-red-700"
                  icon={FaTrash}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-6">
          Brak przedmiotów na czarnej liście.
        </p>
      )}
      <div className="w-full flex justify-end py-4">
        <Button
          onClick={onAddItemClick}
          styleClass="mt-4 bg-emerald-500 text-white hover:bg-emerald-600"
          icon={FaPlus}
          text="Dodaj przedmiot"
        />
      </div>
    </div>
  );
};

Blacklist.propTypes = {
  blacklist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onAddItemClick: PropTypes.func.isRequired,
};

export default Blacklist;
