import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import PropTypes from 'prop-types';

class Register extends Component {
  state = {
    email: '',
    password: '',
    password2: ''
  };

  static defaultProps = {
    isAuthenticated: false,
  };

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = event => {
    event.preventDefault();
    const { email, password, password2 } = this.state;
    const { registerUser } = this.props;
    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      const newUser = {
        email,
        password,
      };
      registerUser(newUser);
    }
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/assessments" />;
    }

    const { email, password, password2 } = this.state;
    return (
      <div>
        <h1>Assessments</h1>
        <h2>Register</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={this.onChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.onChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              onChange={this.onChange}
              value={password2}
            />
          </div>
          <div className="form-group">
            <button type="submit">Register</button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { registerUser })(Register);
