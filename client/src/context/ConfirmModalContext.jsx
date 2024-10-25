import { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ConfirmationModal from '../components/common/ConfirmationModal';

export const ConfirmationContext = createContext();

export const ConfirmationProvider = ({ children }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [onConfirmAction, setOnConfirmAction] = useState(null);

  const openConfirmationModal = useCallback((message, onConfirm) => {
    const handleConfirm = async () => {
      try {
        await onConfirm(); // Wywołaj akcję przekazaną jako onConfirm
        setIsConfirmationOpen(false); // Zamknij modal po sukcesie
      } catch (error) {
        console.error('Błąd podczas wykonywania akcji potwierdzenia:', error);
      }
    };

    setConfirmationMessage(message);
    setOnConfirmAction(() => handleConfirm); // Przypisz zmodyfikowaną akcję
    setIsConfirmationOpen(true);
  }, []);

  const closeConfirmationModal = useCallback(() => {
    setIsConfirmationOpen(false);
    setOnConfirmAction(null);
  }, []);

  return (
    <ConfirmationContext.Provider value={openConfirmationModal}>
      {children}
      {isConfirmationOpen && (
        <ConfirmationModal
          message={confirmationMessage}
          onConfirm={onConfirmAction}
          onClose={closeConfirmationModal}
        />
      )}
    </ConfirmationContext.Provider>
  );
};

ConfirmationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
