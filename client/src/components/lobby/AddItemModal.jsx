import { useState } from 'react';
import PropTypes from 'prop-types';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { IoMdClose } from 'react-icons/io';

const AddItemModal = ({ onClose, onAdd, placeholder, title }) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (value.trim()) {
      setIsLoading(true);
      try {
        await onAdd(value);
        setValue('');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-start py-20 px-2 justify-center z-20"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg h-70 w-96 flex flex-col gap-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-300 transition-colors"
          aria-label="Close Modal"
        >
          <IoMdClose className="text-xl text-gray-700 dark:text-gray-300" />
        </button>
        <h3 className="text-lg font-bold mb-4 dark:text-white text-emerald-500 text-center">
          {title}
        </h3>
        <InputField
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex w-full justify-center gap-2 h-12">
          <Button
            onClick={handleAdd}
            styleClass="bg-emerald-500 text-white mr-2 hover:bg-emerald-600"
            text="Dodaj"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

AddItemModal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default AddItemModal;
