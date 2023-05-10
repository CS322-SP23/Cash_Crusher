import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns';

const CustomModal = ({ show, onHide, selectedDate }) => {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Date selected: {selectedDate ? format(selectedDate, 'MMMM do, yyyy') : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Add your modal content here</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };  
export default CustomModal;



/*
const CustomModal = ({ selectedDate, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>Date selected: {selectedDate}</p>
      </div>
    </div>
  );
};

export default CustomModal;
*/