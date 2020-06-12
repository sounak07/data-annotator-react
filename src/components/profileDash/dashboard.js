import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from "../UI/Loader";
import { getImgs, getUserAnnotations } from "../../store/actions/imageActions";
import AnnotationList from '../annotationList'

class Dash extends Component {

  componentDidMount() {
    this.props.getImgs();
    this.props.getUserAnnotations();
  }

  render() {
    const { users } = this.props.auth;

    const { userAnnotations } = this.props.imgs;

    const { isAdmin } = users;

    const { loading } = this.props.load;

    return (
      <div>
        <div>
          <p className="lead text-muted">Welcome {users.email}</p>
        </div>
        <div>
          {isAdmin && <Link to="/addImages" className="btn btn-lg btn-info">
            Admin Panel
          </Link>}
        </div>
        <br />
        <div>
          <Link to="/allImages" className="btn btn-lg btn-success">
            Go to Images to Annotate
         </Link>
        </div>
        {loading ? <Loader /> : 
        <div className="annotation-table" style={{ marginTop: '30px' }}>
          {userAnnotations.length < 1 ?
            <h3>No Entries yet!</h3> :
            <AnnotationList text="My" userAnnotations={userAnnotations} />
          }
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  imgs: state.imgs,
  load: state.load
});

export default connect(mapStateToProps, { getImgs, getUserAnnotations })(Dash);
