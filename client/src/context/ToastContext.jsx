import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [shownToasts, setShownToasts] = useState(new Set());

  const showToast = (message, type) => {
    const toastId = `${type}-${message}`;

    if (!shownToasts.has(toastId)) {
      if (type === 'success') {
        toast.success(message);
      } else if (type === 'error') {
        toast.error(message);
      }

      setShownToasts((prev) => new Set(prev).add(toastId));
    }
  };

  return (
    <ToastContext.Provider value={showToast}>{children}</ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
