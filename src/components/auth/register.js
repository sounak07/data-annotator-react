import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../store/actions/authActions';
import Input from '../UI/input';

class Register extends Component {
  state = {
    email: '',
    password: '',
    password2: '',
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
      password2: this.state.password2,
    };

    console.log(data);

    this.props.registerUser(data, this.props.history);
  };

  render() {
    const { isAuth } = this.props.auth;

    return (
      <div>
        {isAuth ? this.props.history.push('/dashboard') : null}
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your account</p>
                <form noValidate onSubmit={this.submitHandler}>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={this.inputHandler}
                    // error={errors.signupemail}
                    value={this.state.email}
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.inputHandler}
                    // error={errors.signupPassword}
                    value={this.state.password}
                  />
                  <Input
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    onChange={this.inputHandler}
                    // error={errors.password2}
                    value={this.state.password2}
                  />
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
