import axios from "axios";
import { tokenConfig } from "./authActions";
import { GET_ASSESSMENTS, TAKE_ASSESSMENT } from './types';

// GET ASSESSMENTS
export const getAssessments = () => (dispatch, getState) => {
  axios
    .get("/api/userassessments/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ASSESSMENTS,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

// TAKE ASSESSMENT
export const takeAssessment = id => (dispatch, getState) => {
  axios
    .get(`/api/assessments/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: TAKE_ASSESSMENT,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};
