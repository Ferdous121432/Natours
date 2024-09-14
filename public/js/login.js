/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login', // relative URL
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'You are logged in');
      window.setTimeout(() => {
        console.log('redirecting to home page');
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      location.reload(true);
    }
    showAlert('success', 'Logged out successfully');
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
