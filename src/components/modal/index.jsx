import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("body");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "300px",
  },
};

const Modal = ({ isOpen, onClose, children }) => (
  <ReactModal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
    {children}
  </ReactModal>
);

export default Modal;
