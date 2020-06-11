import * as actionTypes from '../actions/actionTypes';

const initialState = {
  imgs: [],
};

const imgReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_ALL_IMGS:
      return {
        ...state,
        imgs:[...action.payload],
      };
    default:
      return state;
  }
};

export default imgReducer;
