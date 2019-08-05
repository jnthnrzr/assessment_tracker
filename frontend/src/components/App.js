import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import store from '../store';
import PrivateRoute from "./PrivateRoute";
import Dashboard from './Dashboard';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import Assessment from "./Assessment";
import { loadUser } from '../actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Route exact path="/" component={Landing}/>
            <Switch>
              <PrivateRoute exact path="/assessments" component={Dashboard}/>
              <PrivateRoute exact path="/assessment/:id"
                            component={Assessment}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
