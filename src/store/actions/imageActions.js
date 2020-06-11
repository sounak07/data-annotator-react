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
        console.log(res.data);
        history.push('/dashboard');
      })
      .catch((e) => {
        dispatch(errorsSet(e.response.data));
      });
  };
}

export const saveGetImgs = (data) =>{
  return {
    type:actionTypes.SAVE_ALL_IMGS,
    payload: data,
  }
}

export const getImgs = () => {
  return (dispatch) => {
    axios
      .get('/api/user/uploadbase')
      .then((res) => {
        if(res.data.length > 0){
          console.log(res.data[0].images);
          dispatch(saveGetImgs(res.data[0].images));
        }
      })
      .catch((e) => {
        dispatch(errorsSet(e.response.data));
      });
  };
}