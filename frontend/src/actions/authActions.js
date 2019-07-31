import axios from "axios";

import {
  CLEAR_ASSESSMENTS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
  .get("/api/auth/user", tokenConfig(getState))
  .then(res => {
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  })
  .catch(err => console.log(err));
};

// LOGIN USER
export const loginUser = (email, password) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ email, password });

  axios
  .post("/api/auth/login", body, config)
  .then(res => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  })
  .catch(err => {
    dispatch({
      type: LOGIN_FAIL
    });
  });
};

// REGISTER USER
export const registerUser = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ email, password });

  axios
  .post("/api/auth/register", body, config)
  .then(res => {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  })
  .catch(err => {
    dispatch({
      type: REGISTER_FAIL
    });
  });
};

// LOGOUT USER
export const logoutUser = () => (dispatch, getState) => {
  axios
  .post("/api/auth/logout/", null, tokenConfig(getState))
  .then(() => {
    dispatch({ type: CLEAR_ASSESSMENTS });
    dispatch({ type: LOGOUT_SUCCESS });
  })
  .catch(err => console.log(err));
};

// Setup config with token - helper function
export const tokenConfig = getState => {
  // Get token from state
  const token = getState().authReducer.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
