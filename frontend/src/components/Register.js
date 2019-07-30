import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class Register extends Component {
  state = {
    email: '',
    password: '',
    password2: ''
  };

  onSubmit = e => {
    e.preventDefault();
    console.log('submit');
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

export default Register;