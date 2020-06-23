import React, { PureComponent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends PureComponent {
  render() {
    const { auth: { isAuth } } = this.props;

    return (
      <div>
        {isAuth ? <Redirect to="/dashboard" />
          : (
            <div className="landing">
              <div className="dark-overlay landing-inner text-light">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h2 className="display-3 mb-4">Welcome to Coolest Annotator, called Grip!</h2>
                      <hr />
                      <Link to="/register" className="btn btn-lg btn-primary">
                        Sign Up
                      </Link>
                      <Link to="/login" className="btn btn-lg btn-success">
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
