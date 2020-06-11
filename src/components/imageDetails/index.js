import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Loader from '../UI/Loader'

function ImageDetail(props) {


  const [currImg, setCurrImg] = useState([]);

  useEffect(() => {
    if (props.match.params.id) {

      const Img = props.imgs.imgs.filter(f => f._id === props.match.params.id);
       
      setCurrImg([...Img]);
    }

  },[props.imgs.imgs, props.match.params.id])

    return(
    <div>
      {currImg.length > 0 && <h1>{currImg[0].name}</h1>}
      {currImg.length < 1 && <Loader />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    imgs: state.imgs
  }
}

export default connect(mapStateToProps, {})(ImageDetail);