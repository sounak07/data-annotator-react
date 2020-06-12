/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { storage } from '../../firebase-config';
import ProgressBar from '../UI/progress';
import { saveImgs } from "../../store/actions/imageActions";
import {getAllAnnotations} from "../../store/actions/imageActions";
import AllAnnotationList from '../allAnnotationList';
import Loader from '../UI/Loader'
import './index.css'

function AddImages(props){

  const [imgFiles, setImgFiles] = useState([]);

  const [imgUrls, setUrl] = useState([]);

  const [buttonState, setButtonState] = useState(true);

  const [saveButtonState, setSaveButtonState] = useState(true);

  const [pro, setpro] = useState(0);

  const history = useHistory();

  const { allAnnotationDetails } = props.imgs;

  useEffect(() => {
    props.getAllAnnotations();
  }, []);

  useEffect(() => {

    if(imgFiles.length > 0){
      setButtonState(false);
    }

    if(imgUrls.length > 0){
      setSaveButtonState(false);
    }
  }, [imgFiles, imgUrls]);

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

  const handleSave = () => {
     props.saveImgs(imgUrls, history);
  }

  return (
      <div className="add-images">
        <div className="row">
          <div className="col-12">
            <h2 className="display-4 text-center">Admin Panel</h2>
              <div className="form-group files">
              <label>Upload Your Images </label>
              <small className="d-block pb-3">Select Multiple Images with Shift+Click</small>
              <input type="file" className="form-control" multiple onChange={onChangeHandler} />
              </div>
            {pro > 0 && <ProgressBar percentage={pro} />}
            <br/>
            <button onClick={handleUpload} disabled={buttonState} className="btn btn-success">Upload Images</button>
            <button style={{marginLeft: '8px'}} onClick={handleSave} disabled={saveButtonState} className="btn btn-info">Save</button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            { allAnnotationDetails.length < 1 && <Loader /> }
            { allAnnotationDetails.length > 0 && <AllAnnotationList allAnnotations={allAnnotationDetails} />}
          </div>
        </div>
      </div>
  );
  
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  imgs: state.imgs,
});

export default connect(mapStateToProps, { saveImgs, getAllAnnotations })(
  withRouter(AddImages)
);
