import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false
};

const loadingRed = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default loadingRed;
