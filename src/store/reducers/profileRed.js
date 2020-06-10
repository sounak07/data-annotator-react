import * as actionTypes from '../actions/actionTypes';

const initialState = {
  profile: {},
  errors: {},
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case actionTypes.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
};

export default profileReducer;
