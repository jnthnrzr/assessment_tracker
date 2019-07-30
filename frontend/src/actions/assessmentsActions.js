import axios from "axios";
import { tokenConfig } from "./authActions";
import { GET_ASSESSMENTS } from './types';

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
    .catch(err =>
      console.log(err)
    );
};
