import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from '../Constants/UserConstants';

// LOGIN
export const login = (username, password) => async (dispatch) => {
  console.log(username);
  console.log(password);
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      'https://projectonline.mobitel.lk/projonline/login',
      { username, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userToken', JSON.stringify(data.accessToken));
    console.log(data.accessToken);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
