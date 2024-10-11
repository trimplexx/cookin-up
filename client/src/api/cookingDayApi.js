import axios from './axios';
import clsx from 'clsx';
const apiUrl = import.meta.env.VITE_API_URL;

export const getCookingDaysForLobby = async (lobbyId) => {
  try {
    const response = await axios.get(clsx(apiUrl + `/cookingDay/${lobbyId}`));

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data || 'Wystąpił błąd podczas pobierania dni gotowania'
    );
  }
};
