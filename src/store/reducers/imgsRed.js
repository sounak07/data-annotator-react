import * as actionTypes from '../actions/actionTypes';

const initialState = {
  imgs: [],
  userAnnotations: [],
  allAnnotationDetails:[]
};

const imgReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_ALL_IMGS:
      return {
        ...state,
        imgs:[...action.payload],
      };
    case actionTypes.SAVE_USER_ANNOTATIONS:
      return{
        ...state,
        userAnnotations: [...action.payload]
      };  
    case actionTypes.SAVE_ALL_ANNOTATIONS:
      return {
        ...state,
        allAnnotationDetails: [...action.payload],
      };
    default:
      return state;
  }
};

export default imgReducer;
