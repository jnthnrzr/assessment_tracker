import { combineReducers } from 'redux';
import authReducer from './authReducer';
import assessmentsReducer from './assessmentsReducer';

export default combineReducers({
  assessmentsReducer,
  authReducer,
});
