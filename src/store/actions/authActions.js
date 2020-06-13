import * as actionTypes from './actionTypes';
import Http from '../../services/services'
import {setAuthToken} from '../../services/services';
import jwt_decode from 'jwt-decode';

export const saveUser = (userData) => {
  return {
    type: actionTypes.SAVE_USER,
    payload: userData,
  };
};

export const setLoading = (data) =>{
  return {
    type: actionTypes.LOADING,
    payload: data,
  };
}

export const errorsSet = (errors) => {
  return {
    type: actionTypes.ALL_ERRORS,
    payload: errors,
  };
};

export const loginUser = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    Http
      .post('/user/login', data)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const userD = jwt_decode(token);
        dispatch(saveUser(userD));
        dispatch(setLoading(false));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        dispatch(errorsSet(e.response.data));
      });
  };
};

export const registerUser = (data, history) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    Http
      .post('/user/register', data)
      .then((res) => {
        history.push('/login');
        dispatch(setLoading(false));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        dispatch(errorsSet(e.response.data));
      });
  };
};

export const logoutHandler = () => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  return (dispatch) => {
    dispatch(saveUser({}));
    dispatch({
      type: actionTypes.SAVE_USER_ANNOTATIONS,
      payload: []
    })
    dispatch(errorsSet({}));
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
