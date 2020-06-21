import * as actionTypes from './actionTypes';
import Http from '../../services/services';

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

export const saveImgs = (data, history) => (dispatch) => {
  dispatch(setLoading(true));
  Http
    .post('/user/uploadbase', data)
    .then((res) => {
      console.log(res.data);
      dispatch(setLoading(false));
      history.push('/dashboard');
    })
    .catch((e) => {
      dispatch(errorsSet(e.response.data));
    });
};

export const saveGetImgs = (data) => ({
  type: actionTypes.SAVE_ALL_IMGS,
  payload: data,
});

export const getImgs = () => (dispatch) => {
  Http
    .get('/user/uploadbase')
    .then((res) => {
      if (res.data.length > 0) {
        // TODO: loop through the res.data array
        dispatch(saveGetImgs(res.data[0].images));
      }
    })
    .catch((e) => {
      dispatch(errorsSet(e.response.data));
    });
};

export const saveAnnotations = (data, history) => (dispatch) => {
  dispatch(setLoading(true));
  Http
    .post('/annotation/add', data)
    .then((res) => {
      console.log(res.data);
      dispatch(setLoading(false));
      alert('Submission Success, Thank You!');
      history.push('/dashboard');
    })
    .catch((e) => {
      dispatch(setLoading(false));
      dispatch(errorsSet(e.response.data));
    });
};

export const getUserAnnotations = () => (dispatch) => {
  dispatch(setLoading(true));
  Http
    .get('/annotation/')
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: actionTypes.SAVE_USER_ANNOTATIONS,
        payload: res.data,
      });
      dispatch(setLoading(false));
    })
    .catch((e) => {
      dispatch(setLoading(false));
      dispatch(errorsSet(e.response.data));
    });
};

export const getAllAnnotations = () => (dispatch) => {
  Http
    .get('/annotation/all')
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: actionTypes.SAVE_ALL_ANNOTATIONS,
        payload: res.data,
      });
    })
    .catch((e) => {
      dispatch(errorsSet(e.response.data));
    });
};
