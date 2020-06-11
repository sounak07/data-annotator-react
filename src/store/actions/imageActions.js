import * as actionTypes from './actionTypes';
import axios from 'axios';


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

export const saveImgs = (data, history) => {
  return (dispatch) => {
    axios
      .post('/api/user/uploadbase', data)
      .then((res) => {
        console.log(res.response.data);
        history.push('/dashboard');
      })
      .catch((e) => {
        dispatch(errorsSet(e.response.data));
      });
  };
}