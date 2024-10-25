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
      clsx(apiUrl + '/lobby/' + lobbyId + '/details')
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

export const addUserToLobby = async (lobbyId, userName) => {
  try {
    const response = await axios.post(clsx(apiUrl + '/lobby/addUser'), {
      lobbyId,
      userName,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data ||
        'Wystąpił błąd podczas dodawania użytkownika do lobby'
    );
  }
};

export const addItemToBlacklist = async (lobbyId, itemName) => {
  try {
    const response = await axios.post(
      clsx(apiUrl + '/lobby/addItemToBlacklist'),
      {
        lobbyId,
        itemName,
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data ||
        'Wystąpił błąd podczas dodawania przedmiotu do czarnej listy'
    );
  }
};

export const removeItemFromBlacklist = async (lobbyId, itemName) => {
  try {
    const response = await axios.delete(
      clsx(apiUrl + '/lobby/itemFromBlacklist'),
      {
        data: { lobbyId, itemName },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data ||
        'Wystąpił błąd podczas usuwania przedmiotu z czarnej listy'
    );
  }
};

export const deleteLobby = async (lobbyId) => {
  try {
    const response = await axios.delete(clsx(apiUrl + '/lobby/' + lobbyId));

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data || 'Wystąpił błąd podczas usuwania lobby'
    );
  }
};

export const removeUserFromLobby = async (lobbyId, userName) => {
  try {
    const response = await axios.delete(clsx(apiUrl + '/lobby/userFromLobby'), {
      data: { lobbyId, userName },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data ||
        'Wystąpił błąd podczas usuwania użytkownika z lobby'
    );
  }
};

export const addCategory = async (lobbyId, categoryName, categoryType) => {
  try {
    const response = await axios.post(clsx(apiUrl + '/lobby/addCategory'), {
      lobbyId,
      categoryName,
      categoryType,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data || 'Wystąpił błąd podczas dodawania kategorii'
    );
  }
};

export const removeCategory = async (lobbyId, categoryId, categoryType) => {
  try {
    const response = await axios.delete(clsx(apiUrl + '/lobby/category'), {
      data: { lobbyId, categoryId, categoryType },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(
      error.response?.data || 'Wystąpił błąd podczas usuwania kategorii'
    );
  }
};
