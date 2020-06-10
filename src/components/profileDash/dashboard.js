import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Dash extends Component {
   render() {
    const { users} = this.props.auth;

    const { isAdmin } = users;

   return (
      <div>
        <div>
          <p className="lead text-muted">Welcome {users.email}</p>
        </div>
        <div>
         {isAdmin && <Link to="/addImages" className="btn btn-lg btn-info">
           Add Images
          </Link>}
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {  })(Dash);
