import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../store/actions/authActions';
import Input from '../UI/input';
import Loader from '../UI/Loader';

class Register extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    email: '',
    password: '',
    password2: '',
  };

  inputHandler = (event) => {
    const { value } = event.target;
    const { name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { email, password, password2 } = this.state;

    const {
      history, registerUser: registerCurrUser,
    } = this.props;

    const data = {
      email,
      password,
      password2,
    };

    // eslint-disable-next-line no-console
    console.log(data);

    registerCurrUser(data, history);
  };

  render() {
    const {
      auth: { isAuth }, load: { loading }, error: { errors }, history,
    } = this.props;

    const { email, password, password2 } = this.state;

    return (
      <div>
        {isAuth ? history.push('/dashboard')
          : (
            <div className="register">
              {loading ? <Loader />
                : (
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
                            error={errors.signupemail}
                            value={email}
                          />
                          <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.inputHandler}
                            error={errors.signupPassword}
                            value={password}
                          />
                          <Input
                            type="password"
                            name="password2"
                            placeholder="Confirm Password"
                            onChange={this.inputHandler}
                            error={errors.password2}
                            value={password2}
                          />
                          <input
                            type="submit"
                            className="btn btn-info btn-block mt-4"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.errors,
  load: state.load,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
