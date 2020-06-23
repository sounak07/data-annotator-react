import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../UI/Loader';
import Input from '../UI/input';
import TextArea from '../UI/textArea';
import { saveAnnotations } from '../../store/actions/imageActions';
import './index.css';

function ImageDetail(props) {
  const history = useHistory();

  const [currImg, setCurrImg] = useState([]);

  const [currpostion, setCurrpostion] = useState(0);

  const [error, setError] = useState(true);

  const [fields, setFields] = useState({
    type: '',
    details: '',
  });

  const [grid, setgrid] = useState('col-12');

  const handleGoBack = () => {
    history.push('/allImages');
  };

  useEffect(() => {
    const { imgs, match } = props;
    if (props.match.params.id) {
      const Img = imgs.imgs.filter((f) => f._id === match.params.id);

      setCurrImg([...Img]);
    }
  }, [props]);

  useEffect(() => {
    const isValid = () => Object.keys(fields).find((f) => !fields[f]);

    if (!isValid()) {
      setError(false);
    } else {
      setError(true);
    }
  }, [fields]);

  const rotateClockWise = () => {
    let newRotation = currpostion + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }

    setCurrpostion(newRotation);
  };

  const rotateAntiClockWise = () => {
    let newRotation = currpostion - 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }

    setCurrpostion(newRotation);
  };

  const handleFillAnnotation = () => {
    setgrid('col-12 col-md-7');
  };

  const handleCancel = () => {
    setgrid('col-12');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = () => {
    props.saveAnnotations({ ...fields, imageId: props.match.params.id }, history);
  };

  const { load: { loading } } = props;

  return (
    <div className="image-view">
      <div className="" style={{ marginBottom: '10px' }}>
        <button type="button" onClick={handleGoBack} className="btn btn-info">Go to Images List</button>
      </div>
      <div className="row">
        <div className={grid}>
          {currImg.length < 1 && <Loader />}
          {currImg.length > 0 && (
          <div className="row">
            <div className="col-12">
              <figure className="figure figure-div">
                <img style={{ transform: `rotate(${currpostion}deg)` }} src={currImg[0].url || 'http://via.placeholder.com/400x300'} alt="view" className="figure-img img-fluid rounded" />
                <figcaption className="figure-caption">{currImg[0].name}</figcaption>
              </figure>
            </div>
            <div className="col-12 rotate-button-div">
              <button type="button" onClick={rotateClockWise} className="col-12 col-md-4 btn btn-outline-info">Rotate Clockwise</button>
              <button type="button" onClick={rotateAntiClockWise} className="col-12 col-md-4 btn btn-outline-info">Rotate Anti-Clockwise</button>
            </div>
            <div className="col-12 annatation-button-div">
              <button type="button" onClick={handleFillAnnotation} className="col-12 col-md-4 btn btn-outline-success">Fill Annotation</button>
            </div>
          </div>
          )}
        </div>
        {grid === 'col-12 col-md-7' && (
        <div className="col-12 col-md-5 form-annotation">
          <h4 className="">Fill Annotation</h4>
          {loading ? <Loader />
            : (
              <div>
                <Input
                  type="text"
                  name="type"
                  placeholder="Enter type"
                  value={fields.type}
                  onChange={handleChange}
                />
                <TextArea
                  placeholder="Enter Annotation Details"
                  name="details"
                  rows="5"
                  value={fields.details}
                  onChange={handleChange}
                />
                <button type="button" onClick={handleSubmit} disabled={error} className="btn btn-outline-primary">Submit Annotation</button>
                <button type="button" onClick={handleCancel} style={{ marginLeft: '8px' }} className="btn btn-outline-danger">Cancel</button>
              </div>
            )}
        </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  imgs: state.imgs,
  load: state.load,
});

export default connect(mapStateToProps, { saveAnnotations })(ImageDetail);
