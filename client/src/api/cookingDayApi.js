import axios from './axios';
import clsx from 'clsx';
const apiUrl = import.meta.env.VITE_API_URL;

export const getCookingDayDetails = async (cookingDayId, userId) => {
  try {
    const response = await axios.get(
      clsx(apiUrl + '/cookingDay/details/' + cookingDayId),
      {
        params: { userId },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data ||
        'Wystąpił błąd podczas pobierania szczegółów dnia gotowania'
    );
  }
};

export const updateCookingDay = async (cookingDayId, updateData) => {
  try {
    const response = await axios.put(
      `${apiUrl}/cookingDay/update/${cookingDayId}`,
      updateData
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data ||
        'Wystąpił błąd podczas aktualizacji dnia gotowania'
    );
  }
};
