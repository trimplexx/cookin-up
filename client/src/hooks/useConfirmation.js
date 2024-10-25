import { useContext } from 'react';
import { ConfirmationContext } from '../context/ConfirmModalContext';

export const useConfirmation = () => useContext(ConfirmationContext);
