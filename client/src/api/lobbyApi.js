import axios from './axios';
import clsx from 'clsx';
const apiUrl = import.meta.env.VITE_API_URL;

export const createLobby = async (lobbyName) => {
  try {
    const response = await axios.put(
      clsx(apiUrl + '/lobby/create/' + lobbyName)
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data || 'Tworzenie lobby nie powiodło się');
  }
};

export const getUserLobbies = async () => {
  try {
    const response = await axios.get(clsx(apiUrl + '/lobby'));

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data || 'Wystąpił błąd podczas pobierania lobby'
    );
  }
};

export const getLobbyDetails = async (lobbyId) => {
  try {
    const response = await axios.get(
      clsx(apiUrl + `/lobby/${lobbyId}/details`)
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data ||
        'Wystąpił błąd podczas pobierania szczegółów lobby'
    );
  }
};
