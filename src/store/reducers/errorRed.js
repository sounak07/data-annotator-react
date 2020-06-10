import * as actionTypes from '../actions/actionTypes';

const initialState = {
  errors: {},
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
