import React, { Component } from 'react';
import { connect } from "react-redux";

class Assessment extends Component {
  state = {
    option: "",
  };

  handleChange = event => {
    this.setState({
      option: event.target.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("You have submitted:", this.state.option);
  };

  render() {
    const { assessment, questionIdx } = this.props;
    const { title, questions } = assessment;
    const question = questions[questionIdx];
    const { choices } = question;

    return (
      <div>
        <h2>{title}</h2>
        <h4>{this.state.option}</h4>

        <h3>{question.text}</h3>
        <form onSubmit={this.handleSubmit}>
          {choices.map(choice => (
            <div className="form-check" key={choice.id}>
              <label>
                <input
                  type="radio"
                  name="choice"
                  value={choice.text}
                  checked={this.state.option === choice.text.toLowerCase()}
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
  assessment: state.assessmentsReducer.currentAssessment,
  questionIdx: state.assessmentsReducer.currentQuestionIdx,
});

export default connect(mapStateToProps)(Assessment);
