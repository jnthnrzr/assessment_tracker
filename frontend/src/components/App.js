import React, { Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from './Dashboard';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Router>
      <Fragment>
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/assessments" component={Dashboard} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
