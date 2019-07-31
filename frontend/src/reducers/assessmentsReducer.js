import {
  CLEAR_ASSESSMENTS,
  GET_ASSESSMENTS,
  TAKE_ASSESSMENT,
  UPDATE_ASSESSMENT,
} from '../actions/types';

const initialState = {
  assessments: [],
  currentAssessment: null,
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
    case TAKE_ASSESSMENT:
      return {
        ...state,
        currentAssessment: action.payload,
      };
    case UPDATE_ASSESSMENT:
      return state;
    default:
      return state;
  }
};

export default assessmentsReducer;
