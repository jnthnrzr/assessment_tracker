import {
  CLEAR_ASSESSMENTS,
  FINISH_ASSESSMENT,
  GET_ASSESSMENTS,
  INCREMENT_QUESTION,
  LOAD_QUESTIONS,
  TAKE_ASSESSMENT,
  UPDATE_ASSESSMENT,
} from '../actions/types';

const initialState = {
  assessments: [],
  currentAssessment: null,
  questions: [],
  currentQuestionIdx: null,
  currentScore: 0,
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
        currentQuestionIdx: 0,
      };
    case UPDATE_ASSESSMENT:
      return {
        ...state,
        currentAssessment: action.payload,
        currentScore: action.payload.score,
      };
    case INCREMENT_QUESTION:
      return {
        ...state,
        currentQuestionIdx: action.payload,
      };
    case LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload.questions,
      };
    case FINISH_ASSESSMENT:
      return {
        ...state,
        currentAssessment: null,
        currentQuestionIdx: null,
        currentScore: 0,
      };
    default:
      return state;
  }
};

export default assessmentsReducer;
