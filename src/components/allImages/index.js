import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.css';

export function AllImages({ imgs }) {
  return (
    <div className="container">
      <h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">Images Gallery</h1>
      <hr className="mt-2 mb-5" />
      <div className="row text-center text-lg-left allImgGallery">
        {imgs.imgs && imgs.imgs.length > 0 && imgs.imgs.map((img) => (
          <div className="col-lg-4 col-md-4 col-6" key={img._id}>
            <div className="card">
              <Link to={`img/${img._id}`} className="d-block mb-4 h-100">
                <img id={img._id} className="card-img-top" src={img.url || 'http://via.placeholder.com/400x300'} alt="" />
                <div className="card-body text-white rgba-black-light p-2">
                  {img.name}
                </div>
              </Link>
            </div>
          </div>
        ))}
        {imgs.imgs.length < 1 && <h1 className="font-weight-light no-img-indicate text-center text-lg-left mt-4 mb-0">No Image Uploaded yet!</h1>}
      </div>
    </div>
  );
}

AllImages.defaultProps = {
  imgs: {},
};

const mapStateToProps = (state) => ({
  imgs: state.imgs,
});

export default connect(mapStateToProps, {})(AllImages);
