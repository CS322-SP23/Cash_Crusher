import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CustomModal from './CustomModal';
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns';

const ModalComponent = ({ show, handleClose, selectedDate }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDate ? `Transaction History ${format(selectedDate, '(MMMM do, yyyy)')}` : 'Popup page'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This is the content of the popup page.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };  

export default ModalComponent;

/*
const ModalComponent = ({ selectedDate, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <CustomModal selectedDate={selectedDate} onClose={handleClose} />
    </Modal>
  );
};

export default ModalComponent;
*/