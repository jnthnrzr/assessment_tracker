import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";
import { getAssessments, takeAssessment } from '../actions/assessmentsActions';

class Dashboard extends Component {
  static defaultProps = {
    user: {},
    isAuthenticated: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
    }),
    getAssessments: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getAssessments } = this.props;
    getAssessments();
  }

  handleStart = assessmentId => {
    const { takeAssessment, user } = this.props;
    const assessmentObj = {
      user: user.id,
      assessment: assessmentId,
      score: 0,
    };
    takeAssessment(assessmentObj);
  };

  render() {
    const {
      assessments,
      currentAssessment,
      logoutUser,
    } = this.props;

    if (currentAssessment) {
      const { id } = currentAssessment;
      return <Redirect to={`/assessment/${id}`} />;
    }

    return (
      <div>
        <h1>Assessments</h1>
        <ul>
          {assessments.map((assessment, idx) => (
            <li key={idx}>
              <div>
                Assessment ID: {assessment.assessment}
              </div>
              <div>Score: {assessment.score}</div>
              <button type="button"
                      onClick={
                        () => this.handleStart(assessment.assessment)}
              >
                Start
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={logoutUser}
          className="nav-link btn btn-danger btn-md text-light"
        >
          Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  isAuthenticated: state.authReducer.isAuthenticated,
  assessments: state.assessmentsReducer.assessments,
  currentAssessment: state.assessmentsReducer.currentAssessment,
});

const mapDispatchToProps = {
  getAssessments,
  logoutUser,
  takeAssessment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
