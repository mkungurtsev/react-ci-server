import React from "react";
import Footer from "../../components/footer";
import "./index.css";

const Root = ({ children }) => {
  return (
    <div className="root">
      <div className="content">{children}</div>

      <div id="modal" />

      <Footer />
    </div>
  );
};

export default Root;
