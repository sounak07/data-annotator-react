import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom"
import { connect } from "react-redux";
import Loader from '../UI/Loader';
import Input from '../UI/input';
import TextArea from '../UI/textArea';
import './index.css';

function ImageDetail(props) {

  const history = useHistory();

  const [currImg, setCurrImg] = useState([]);

  const [currpostion, setCurrpostion] = useState(0);

  const [grid, setgrid] = useState("col-12");

  const handleGoBack = () => {
    history.push('/allImages');
  }

  useEffect(() => {
    if (props.match.params.id) {

      const Img = props.imgs.imgs.filter(f => f._id === props.match.params.id);
       
      setCurrImg([...Img]);
    }

  },[props.imgs.imgs, props.match.params.id])

  const rotateClockWise = () => {
    let newRotation = currpostion + 90;
    if (newRotation >= 360) {
      newRotation =- 360;
    }

    setCurrpostion(newRotation);
  }

  const rotateAntiClockWise = () => {
    let newRotation = currpostion - 90;
    if (newRotation >= 360) {
      newRotation =- 360;
    }

    setCurrpostion(newRotation);
  }

  const handleFillAnnotation = () => {
    setgrid("col-12 col-md-7");
  }

  const handleCancel = () => {
    setgrid("col-12");
  }

  return(
    <div className="image-view">
      <div className="" style={{ marginBottom: '10px' }}>
        <button onClick={handleGoBack} className="btn btn-info">Go back</button>
      </div>
       <div className="row">
          <div className={grid}>
            {currImg.length < 1 && <Loader />}
            {currImg.length > 0 && <div className="row">
              <div className="col-12">
                <figure className="figure figure-div">
                  <img style={{ transform: `rotate(${currpostion}deg)` }} src={currImg[0].url} alt="view" className="figure-img img-fluid rounded" />
                  <figcaption className="figure-caption">{currImg[0].name}</figcaption>
                </figure>
              </div>
              <div className="col-12 rotate-button-div">
                <button onClick={rotateClockWise} className="col-12 col-md-4 btn btn-outline-info">Rotate Clockwise</button>
                <button onClick={rotateAntiClockWise} className="col-12 col-md-4 btn btn-outline-info">Rotate Anti-Clockwise</button>
              </div>
              <div className="col-12 annatation-button-div">
                <button onClick={handleFillAnnotation} className="col-12 col-md-4 btn btn-outline-success">Fill Annotation</button>
              </div>
            </div>}
          </div>
        {grid === 'col-12 col-md-7' && <div className="col-12 col-md-5 form-annotation">
          <h4 className="">Fill Annotation</h4>
          <Input
            type="text"
            name="Annotattion"
            placeholder="Enter type"
          // onChange={this.inputHandler}
          // error={errors.loginemail}
          // value={this.state.email}
          />
          <TextArea
            placeholder="Enter Annotation Details"
            name="Details"
            rows="5"
          // value={this.state.website}
          // onChange={this.onChange}
          // error={errors.website}
          />
          <button className="btn btn-outline-primary">Submit Annotation</button>
          <button onClick={handleCancel} style={{marginLeft: '8px'}} className="btn btn-outline-danger">Cancel</button>
        </div>}
       </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    imgs: state.imgs
  }
}

export default connect(mapStateToProps, {})(ImageDetail);