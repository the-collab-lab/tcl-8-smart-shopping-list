import React from 'react';
import '../styles/Modal.css';

const Modal = props => {
  return (
    <div className="modal-wrapper">
      <div className="modal-backdrop" />
      <div className="modal-box">
        <span onClick={() => props.setDisplay(false)}>X</span>
        <h1> Error </h1>
        <p> The item you've entered already exists. </p>
      </div>
    </div>
  );
};

export default Modal;
