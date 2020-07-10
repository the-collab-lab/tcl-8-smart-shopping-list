import React from 'react';
import '../styles/Modal.css';

const Modal = props => {
  const { title, message, setDisplay } = props;

  return (
    <div className="modal-wrapper">
      <div className="modal-backdrop" />
      <div className="modal-box">
        <span onClick={() => setDisplay(false)}>X</span>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
