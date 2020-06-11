import React from "react";
import "./index.css";

const Loader = () => {
  return (
    <div className="spinner">
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  );
};

export default Loader;