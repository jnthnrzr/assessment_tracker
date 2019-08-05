import axios from "axios";
import { tokenConfig } from "./authActions";
import {
  GET_ASSESSMENTS,
  FINISH_ASSESSMENT,
  INCREMENT_QUESTION,
  LOAD_QUESTIONS,
  TAKE_ASSESSMENT,
  UPDATE_ASSESSMENT
} from './types';

// GET ASSESSMENTS
export const getAssessments = () => (dispatch, getState) => {
  axios
    .get("/api/best/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ASSESSMENTS,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

// TAKE A NEW USER ASSESSMENT
export const takeAssessment = assessmentObj => (dispatch, getState) => {
  axios
    .post(`/api/userassessments/`, assessmentObj, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: TAKE_ASSESSMENT,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

// LOAD QUESTIONS
export const loadQuestions = assessmentId => (dispatch, getState) => {
  axios
    .get(`/api/assessments/${assessmentId}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOAD_QUESTIONS,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};


// CHECK ANSWER FOR ASSESSMENT QUESTION
export const checkAnswer = id => (dispatch, getState) => {
  axios
    .get(`/api/choices/${id}`, tokenConfig(getState))
    .then(res => (
      dispatch({
        type: UPDATE_ASSESSMENT,
        payload: res.data.correct,
      })
    ))
    .catch(err => console.log(err))
};

export const finishAssessment = () => {
  return {
    type: FINISH_ASSESSMENT,
  };
};

// UPDATE ASSESSMENT WITH NEW SCORE
export const updateAssessment = assessment => (dispatch, getState) => {
  axios
    .put(
      `api/userassessments/${assessment.id}/`,
      assessment,
      tokenConfig(getState)
    ).then(() => {
      dispatch({
        type: UPDATE_ASSESSMENT,
        payload: assessment
      });
    })
    .catch(err => console.log("updateAssessment "+err))
};

// INCREMENT QUESTION
export const incrementQuestion = questionIdx => {
  return {
    type: INCREMENT_QUESTION,
    payload: questionIdx + 1,
  };
};
