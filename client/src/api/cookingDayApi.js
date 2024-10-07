import axios from 'axios';
import clsx from 'clsx';
const apiUrl = import.meta.env.VITE_API_URL;

export const getCookingDaysForLobby = async (token, lobbyId) => {
  try {
    const response = await axios.get(clsx(apiUrl + '/cookingDays/' + lobbyId), {
      headers: {
        token: token,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data || 'Wystąpił błąd podczas pobierania dni gotowania'
    );
  }
};
