import React, { useContext } from "react";
import '../styles/Modal.css'

const Modal = (props) => {  
  return (
    <div className='modal-wrapper'>
      <div onClick={props.setDisplay(false)} className='modal-backdrop' />
      <div className='modal-box'>
        Error
      </div>
    </div>
  )
}

export default Modal;



