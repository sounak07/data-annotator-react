import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../UI/input';
import { Redirect, withRouter } from 'react-router-dom';
import { create_Profile } from '../../store/actions/profileAction';

class createProfile extends Component {
  state = {
    handle: '',
    email: '',
    sex: '',
    age: '',
    location: '',
  };

  inputHandle = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const data = {
      handle: this.state.handle,
      email: this.state.email,
      age: this.state.age,
      sex: this.state.sex,
      location: this.state.location,
    };

    this.props.create_Profile(data, this.props.history);
  };

  render() {
    const { isAuth } = this.props.auth;

    return (
      <div>
        {!isAuth ? <Redirect to="/" /> : null}
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Create Your Profile</h1>
                <small className="d-block pb-3">* = required fields</small>
                <form noValidate onSubmit={this.submitHandler}>
                  <Input
                    type="text"
                    name="handle"
                    placeholder="* handle"
                    onChange={this.inputHandle}
                    // error={errors.loginhandle}
                    value={this.state.handle}
                  />
                  <Input
                    type="number"
                    name="age"
                    placeholder="age"
                    onChange={this.inputHandle}
                    value={this.state.age}
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={this.inputHandle}
                    value={this.state.email}
                  />
                  <Input
                    type="text"
                    name="sex"
                    placeholder="sex"
                    onChange={this.inputHandle}
                    value={this.state.sex}
                  />
                  <Input
                    type="text"
                    name="location"
                    placeholder="location"
                    onChange={this.inputHandle}
                    value={this.state.location}
                  />
                  <input
                    type="submit"
                    value="Submit"
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
});

export default connect(mapStateToProps, { create_Profile })(
  withRouter(createProfile)
);
