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
import AddImages from './components/admin-panel';
// eslint-disable-next-line import/no-named-as-default
import AllImages from './components/allImages/index';
import ProtectedRoute from './components/ProtectedRoutes';
import ImageDetail from './components/imageDetails';

class App extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
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
              <ProtectedRoute exact path="/admin" component={AddImages} />
              <ProtectedRoute exact path="/allImages" component={AllImages} />
              <ProtectedRoute exact path="/img/:id" component={ImageDetail} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { checkAuthState })(App);
