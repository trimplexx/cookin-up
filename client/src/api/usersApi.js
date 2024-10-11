import axios from './axios';
import clsx from 'clsx';

const apiUrl = import.meta.env.VITE_API_URL;

export const getUserName = async () => {
  try {
    const response = await axios.get(clsx(apiUrl + '/user/name'));
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data || 'Nie udało się pobrać nazwy użytkownika'
    );
  }
};
