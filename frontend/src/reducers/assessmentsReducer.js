import {
  CLEAR_ASSESSMENTS,
  GET_ASSESSMENTS,
  UPDATE_ASSESSMENT
} from '../actions/types';

const initialState = {
  assessments: [],
};

const assessmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ASSESSMENTS:
      return {
        ...state,
        assessments: action.payload,
      };
    case CLEAR_ASSESSMENTS:
      return {
        ...state,
        assessments: [],
      };
    case UPDATE_ASSESSMENT:
      return state;
    default:
      return state;
  }
};

export default assessmentsReducer;
