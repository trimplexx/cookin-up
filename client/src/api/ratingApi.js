import axios from './axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const rateCategory = async (
  categoryId,
  categoryType,
  rating,
  lobbyId,
  id,
  comment
) => {
  try {
    const response = await axios.post(`${apiUrl}/rating/rateCategory`, {
      categoryId,
      categoryType,
      rating,
      lobbyId,
      cookingDayId: id,
      comment,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data || 'Wystąpił błąd podczas oceniania kategorii'
    );
  }
};

export const getLobbySummary = async (lobbyId) => {
  try {
    const response = await axios.get(`${apiUrl}/rating/summary/${lobbyId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data ||
        'Wystąpił błąd podczas pobierania podsumowania ocen.'
    );
  }
};
