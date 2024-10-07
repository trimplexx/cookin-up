import axios from 'axios';
import clsx from 'clsx';
const apiUrl = import.meta.env.VITE_API_URL;

export const createLobby = async (token, lobbyName) => {
  try {
    const response = await axios.put(
      clsx(apiUrl + '/lobby/create/' + lobbyName),
      null,
      {
        headers: {
          token: token,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data || 'Tworzenie lobby nie powiodło się');
  }
};

export const getUserLobbies = async (token) => {
  try {
    const response = await axios.get(clsx(apiUrl + '/lobby'), {
      headers: {
        token: token,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data || 'Wystąpił błąd podczas pobierania lobby'
    );
  }
};

export const getLobbyDetails = async (lobbyId, token) => {
  try {
    const response = await axios.get(
      clsx(apiUrl + '/lobby/' + lobbyId + '/details'),
      {
        headers: {
          token: token,
        },
      }
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
