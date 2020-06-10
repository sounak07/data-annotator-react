import * as actionTypes from './actionTypes';
import axios from 'axios';
import setAuthToken from '../../util/setAuthToken';
import jwt_decode from 'jwt-decode';

export const saveUser = (userData) => {
  return {
    type: actionTypes.SAVE_USER,
    payload: userData,
  };
};

export const errorsSet = (errors) => {
  return {
    type: actionTypes.ALL_ERRORS,
    payload: errors,
  };
};

export const loginUser = (data) => {
  return (dispatch) => {
    axios
      .post('/api/user/login', data)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const userD = jwt_decode(token);
        dispatch(saveUser(userD));
      })
      .catch((e) => {
        dispatch(errorsSet(e.response.data));
      });
  };
};

export const registerUser = (data, history) => {
  return (dispatch) => {
    axios
      .post('/api/user/register', data)
      .then((res) => {
        history.push('/login');
      })
      .catch((e) => {
        dispatch(errorsSet(e.response.data));
      });
  };
};

export const logoutHandler = () => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  return (dispatch) => {
    dispatch(saveUser({}));
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutHandler());
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(saveUser(decoded));

      const currentTime = Date.now() / 1000;
      if (currentTime > decoded.exp) {
        dispatch(logout());
        window.location.href = '/login';
      }
    }
  };
};
