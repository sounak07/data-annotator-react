import * as actionTypes from '../actions/actionTypes';
import isEmpty from '../../validations/is-Empty';

const initialState = {
  isAuth: false,
  users: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER:
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        users: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
