import toast from 'react-hot-toast';

const shownToasts = new Set();

export const showToast = (message, type) => {
  const toastId = `${type}-${message}`;

  if (!shownToasts.has(toastId)) {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    }

    shownToasts.add(toastId);
  }
};

export const resetToasts = () => {
  shownToasts.clear();
};
