import React from "react";
import "./style.css";

const Loader = ({ size = 16 }) => (
  <div className="loader" style={{ width: size, height: size }} />
);

export default Loader;
