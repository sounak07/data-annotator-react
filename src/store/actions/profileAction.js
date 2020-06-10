import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setErrors = (errors) => {
  return {
    type: actionTypes.ALL_ERRORS,
    payload: errors,
  };
};

export const create_Profile = (data, history) => {
  return (dispatch) => {
    axios
      .post('/api/profile', data)
      .then((res) => {
        history.push('/dashboard');
      })
      .catch((e) => {
        dispatch(setErrors(e.response.data));
      });
  };
};

export const setProfile = (data) => {
  return {
    type: actionTypes.GET_PROFILE,
    payload: data,
  };
};

export const clearProfile = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_PROFILE,
  };
};

export const getProfile = () => {
  return (dispatch) => {
    axios
      .get('/api/profile')
      .then((res) => {
        dispatch(setProfile(res.data));
      })
      .catch((e) => {
        dispatch(setProfile({}));
      });
  };
};
