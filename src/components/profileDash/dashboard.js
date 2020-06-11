import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getImgs} from "../../store/actions/imageActions";

class Dash extends Component {

  componentDidMount() {
    this.props.getImgs();
  }

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
        <br/>
       <div>
         <Link to="/allImages" className="btn btn-lg btn-success">
           Go to Images to Annotate
         </Link>
       </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getImgs })(Dash);
