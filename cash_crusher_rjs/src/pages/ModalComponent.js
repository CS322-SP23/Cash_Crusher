import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CustomModal from './CustomModal';
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns';

const ModalComponent = ({ modalData, handleClose, show, selectedDate }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>{selectedDate ? `Transaction History ${format(selectedDate, '(MMMM do, yyyy)')}` : 'Popup page'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalData && modalData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {modalData.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{format(transaction.date.toDate(), 'yyyy-MM-dd')}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found for this date.</p>
        )}
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
*/