import axios from './axios';
import clsx from 'clsx';

const apiUrl = import.meta.env.VITE_API_URL;

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(clsx(apiUrl + '/auth/register'), {
      name: name,
      email: email,
      password: password,
    });

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    const errorMessage = error.response?.data || 'Rejestracja nie powiodła się';
    throw new Error(errorMessage);
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(apiUrl + '/auth/login', {
      email,
      password,
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw new Error(error.response?.data || 'Logowanie nie powiodło się');
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(clsx(apiUrl + '/auth/refresh-token'));

    if (response.status === 200) {
      return response.data.accessToken;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(clsx(apiUrl + '/auth/logout'));

    if (response.status === 200) {
      localStorage.removeItem('accessToken');
      return true;
    }
  } catch (error) {
    throw new Error(error.response?.data || 'Wylogowanie nie powiodło się');
  }
};
