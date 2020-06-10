import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthState } from './store/actions/authActions';

import './App.css';

import NavBar from './components/layouts/navbar';
import Landing from './components/layouts/landing';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Dashboard from './components/profileDash/dashboard';
import AddImages from './components/addImages';
import ProtectedRoute from './components/ProtectedRoutes'

class App extends Component {
  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              <ProtectedRoute exact path="/addImages" component={AddImages} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { checkAuthState })(App);
