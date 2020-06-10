import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './index.css'

function addImages(){
  
    return (
      <div>
        <div className="add-images">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Upload Images</h1>
                  <div class="form-group files">
                    <label>Upload Your Images </label>
                    <input type="file" class="form-control"/>
                  </div>       
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { })(
  withRouter(addImages)
);
