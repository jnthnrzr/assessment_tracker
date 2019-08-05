import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {
  checkAnswer,
  finishAssessment,
  incrementQuestion,
  loadQuestions,
  updateAssessment,
} from "../actions/assessmentsActions";

function Summary(props) {
  return (
    <div>
      <h3>Assessments</h3>
      <div>
        <h4>You scored {props.score}.</h4>
        <p>{props.correctCount}/{props.total} correct</p>
      </div>
      <button type="button" onClick={props.handleClick}>
        Done
      </button>
    </div>
  );
}

class Assessment extends Component {
  state = {
    option: null,
  };

  handleChange = event => {
    this.setState({
      option: parseInt(event.target.value, 10),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { option } = this.state;
    if (!option) return;

    const { questions, questionIdx, currentAssessment } = this.props;
    const { choices } = questions[questionIdx];
    const guess = choices.find(choice => choice.id === option);

    if (guess.correct) {
      const { updateAssessment, currentScore, user } = this.props;
      const assessment = {
        'id': currentAssessment.id,
        "user": user.id,
        "assessment": currentAssessment.assessment,
        "score": currentScore + 10,
      };
      updateAssessment(assessment);
    }

    const { incrementQuestion } = this.props;
    incrementQuestion(questionIdx);
  };

  componentDidMount() {
    const { loadQuestions, currentAssessment } = this.props;
    loadQuestions(currentAssessment.assessment);
  }

  render() {
    const { currentAssessment, questionIdx, finishAssessment } = this.props;

    if (!currentAssessment) {
      return <Redirect to="/assessments"/>;
    }

    const { title } = currentAssessment;
    const { questions } = this.props;
    const question = questions[questionIdx];

    if (!question) {
      return <Summary handleClick={finishAssessment}
                      correctCount={currentAssessment.score/10}
                      total={questions.length}
                      score={currentAssessment.score} />;
    }

    const { choices } = question;

    return (
      <div>
        <h2>{title}</h2>

        <h3>{question.text}</h3>
        <form onSubmit={this.handleSubmit}>
          {choices.map((choice) => (
            <div className="form-check" key={choice.id}>
              <label>
                <input
                  type="checkbox"
                  name="choice"
                  value={choice.id}
                  checked={this.state.option === choice.id}
                  onChange={this.handleChange}
                  className="form-check-input"
                />
                {choice.text}
              </label>
            </div>
          ))}

          <div className="form-group">
            <button className="btn btn-primary mt-2" type="submit">
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  isAuthenticated: state.authReducer.isAuthenticated,
  currentAssessment: state.assessmentsReducer.currentAssessment,
  currentScore: state.assessmentsReducer.currentScore,
  questions: state.assessmentsReducer.questions,
  questionIdx: state.assessmentsReducer.currentQuestionIdx,
});

const mapDispatchToProps = {
  checkAnswer,
  finishAssessment,
  loadQuestions,
  incrementQuestion,
  updateAssessment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Assessment);
