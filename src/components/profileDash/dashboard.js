import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Dash extends Component {
   render() {
    const { users } = this.props.auth;

   return (
      <div>
        <div>
          <p className="lead text-muted">Welcome {users.email}</p>
        </div>
        <div>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/createprofile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {  })(Dash);
