import axios from 'axios';
import clsx from 'clsx';
const apiUrl = import.meta.env.VITE_API_URL;

export const verifyToken = async (token) => {
  try {
    const response = await axios.head(clsx(apiUrl + '/user/tokenVerify'), {
      headers: {
        jwtToken: token
      }
    });
    return response.status === 200;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return false;
    }
    throw error;
  }
};