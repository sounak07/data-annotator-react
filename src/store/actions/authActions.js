import jwtDecode from 'jwt-decode';
import * as actionTypes from './actionTypes';
import Http, { setAuthToken } from '../../services/services';

export const saveUser = (userData) => ({
  type: actionTypes.SAVE_USER,
  payload: userData,
});

export const setLoading = (data) => ({
  type: actionTypes.LOADING,
  payload: data,
});

export const errorsSet = (errors) => ({
  type: actionTypes.ALL_ERRORS,
  payload: errors,
});

export const loginUser = (data) => (dispatch) => {
  dispatch(setLoading(true));
  Http
    .post('/user/login', data)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const userD = jwtDecode(token);
      dispatch(saveUser(userD));
      dispatch(setLoading(false));
    })
    .catch((e) => {
      dispatch(setLoading(false));
      dispatch(errorsSet(e.response.data));
    });
};

export const registerUser = (data, history) => (dispatch) => {
  dispatch(setLoading(true));
  Http
    .post('/user/register', data)
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      history.push('/login');
      dispatch(setLoading(false));
    })
    .catch((e) => {
      dispatch(setLoading(false));
      dispatch(errorsSet(e.response.data));
    });
};

export const logoutHandler = () => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  return (dispatch) => {
    dispatch(saveUser({}));
    dispatch({
      type: actionTypes.SAVE_USER_ANNOTATIONS,
      payload: [],
    });
    dispatch(errorsSet({}));
  };
};

export const logout = () => (dispatch) => {
  dispatch(logoutHandler());
};

export const checkAuthState = () => (dispatch) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    setAuthToken(token);
    const decoded = jwtDecode(token);
    dispatch(saveUser(decoded));

    const currentTime = Date.now() / 1000;
    if (currentTime > decoded.exp) {
      dispatch(logout());
      window.location.href = '/login';
    }
  }
};
