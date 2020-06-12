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
          //TODO: loop through the res.data array
          dispatch(saveGetImgs(res.data[0].images));
        }
      })
      .catch((e) => {
        dispatch(errorsSet(e.response.data));
      });
  };
}

export const saveAnnotations = (data ,history) => {
  return (dispatch) => {
    axios
      .post('/api/annotation/add', data)
      .then((res) => {
        console.log(res.data);
        history.push('/dashboard');
      })
      .catch((e) => {
        dispatch(errorsSet(e.response.data));
      });
  };
}

export const getUserAnnotations = () => {
  return (dispatch) => {
    axios
      .get('/api/annotation/')
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: actionTypes.SAVE_USER_ANNOTATIONS,
          payload: res.data
        })
      })
      .catch((e) => {
        dispatch(errorsSet(e.response.data));
      });
  };
}

export const getAllAnnotations = () => {
  return (dispatch) => {
    axios
      .get('/api/annotation/all')
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: actionTypes.SAVE_ALL_ANNOTATIONS,
          payload: res.data
        })
      })
      .catch((e) => {
        dispatch(errorsSet(e.response.data));
      });
  };
}