import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import Button from './Button';

const ConfirmationModal = ({ onClose, onConfirm, message }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-start py-20 px-2 justify-center z-20"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-80 flex flex-col gap-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-300 transition-colors"
          aria-label="Close Modal"
        >
          <IoMdClose className="text-xl text-gray-700 dark:text-gray-300" />
        </button>
        <p className="text-lg font-semibold text-center dark:text-white text-gray-800">
          {message}
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={handleConfirm}
            styleClass={`bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center justify-center ${
              isLoading ? 'cursor-not-allowed opacity-70' : ''
            }`}
            text={isLoading ? 'Usuwanie...' : 'Tak'}
            isLoading={isLoading}
            disabled={isLoading}
          />
          <Button
            onClick={onClose}
            styleClass="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            text="Nie"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ConfirmationModal;
