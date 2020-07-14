import React from 'react';
import '../styles/Modal.css';

const Modal = props => {
  const { children, setDisplay } = props;

  return (
    <div className="modal-wrapper">
      <div className="modal-backdrop" />
      <div className="modal-box">
        <span onClick={() => setDisplay(false)}>X</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
