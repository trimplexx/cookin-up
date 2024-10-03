import axios from 'axios';
import clsx from 'clsx';
const apiUrl = import.meta.env.VITE_API_URL;

export const verifyToken = async (token) => {
  try {
    const response = await axios.head(clsx(apiUrl + '/user/tokenVerify'), {
      headers: {
        jwtToken: token,
      },
    });
    return response.status === 200;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return false;
    }
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(clsx(apiUrl + '/user/register'), {
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
    const response = await axios.post(`${apiUrl}/user/login`, {
      email,
      password,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data || 'Logowanie nie powiodło się');
  }
};
