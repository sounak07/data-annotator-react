import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { storage } from '../../firebase-config';
import './index.css'

function AddImages(){

  const [imgFiles, setImgFiles] = useState([]);

  const [imgUrls, setUrl] = useState([]);

  const [buttonState, setButtonState] = useState(true);

  const [pro, setpro] = useState(0);

  useEffect(() => {

    if(imgFiles.length > 0){
      setButtonState(false);
    }
  }, [imgFiles]);

  const onChangeHandler = event => {
    const files = event.target.files;

    let fileArray = [];

    for (var x = 0; x < files.length; x++) {
      const newFile = files[x];
      newFile["id"] = Math.floor(Math.random()*1000);
      fileArray.push(newFile);
    }

    setImgFiles([...fileArray]);

  }

    const handleUpload = () => {

    const promises = [];
    imgFiles.forEach(file => {
      let uploadImage = storage.ref(`images/${file.name}`).put(file);

     uploadImage.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setpro(progress);
       },
      (error) => {
        alert(error);
      },
      async () => {
        const link = await storage.ref('images').child(file.name).getDownloadURL()
        promises.push({url:link,name:file.name});
        setUrl([...promises]);
      })
    })
  }

  
    return (
      <div>
        <div className="add-images">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Upload Images</h1>
                  <div className="form-group files">
                    <label>Upload Your Images </label>
                  <input type="file" className="form-control" multiple onChange={onChangeHandler} />
                  {pro > 0 && <span>{pro}</span>}
                  </div>  
                <button onClick={handleUpload} disabled={buttonState} className="btn btn-success">Upload Images</button>
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
  withRouter(AddImages)
);
