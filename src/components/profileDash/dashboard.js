import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getProfile } from '../../store/actions/profileAction';

class Dash extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { isAuth, users } = this.props.auth;

    const { profile } = this.props.profileDate;

    let dashContent;

    if (Object.keys(profile).length > 0) {
      dashContent = (
        <div>
          <h6>Username :</h6> <p>{profile.handle}</p>
          <h6>Age :</h6> <p>{profile.age}</p>
          <h6>Email :</h6> <p>{profile.email}</p>
          <h6>Sex :</h6> <p>{profile.sex}</p>
          <h6>Location :</h6> <p>{profile.location}</p>
          <Link to="/editprofile" className="btn btn-lg btn-danger">
            Edit Profile
          </Link>
        </div>
      );
    } else {
      dashContent = (
        <div>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/createprofile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }

    return (
      <div>
        {!isAuth ? <Redirect to="/" /> : null}
        <div>
          <p className="lead text-muted">Welcome {users.name}</p>
        </div>
        {dashContent}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profileDate: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Dash);
