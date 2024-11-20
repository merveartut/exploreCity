import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-bootstrap/Modal';

function CustomModal({show,handleClose, children}) {
  console.log(show)
  return (
    <Modal show={show} onHide={() => handleClose()} size="lg" centered>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {children}
    </Modal.Body>
    
  </Modal>
  )
}

export default CustomModal