import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../store/actions/authActions';
import Input from '../UI/input';
import Loader from '../UI/Loader'

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(data);
  };

  render() {
    const { isAuth } = this.props.auth;

    const { loading } = this.props.load;

    const { errors } = this.props.error;

    return (
      <div>
        {isAuth ? this.props.history.push('/dashboard') : <div className="login">
          {loading ? <Loader /> :
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your account</p>
                  <form noValidate onSubmit={this.submitHandler}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="email number"
                      onChange={this.inputHandler}
                      error={errors.loginemail}
                      value={this.state.email}
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.inputHandler}
                      error={errors.loginPassword}
                      value={this.state.password}
                    />
                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                    />
                  </form>
                </div>
              </div>
            </div>}
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.errors,
  load: state.load
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
