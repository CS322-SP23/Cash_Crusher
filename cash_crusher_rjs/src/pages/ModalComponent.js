import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns';
import { getFirestore, collection, query, where, getDocs } from
'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
const ModalComponent = ({ handleClose, show, selectedDate }) => {
const [modalData, setModalData] = useState(null);
useEffect(() => {
if (selectedDate) {
const startDate = Timestamp.fromDate(selectedDate);
const endDate = Timestamp.fromMillis(selectedDate.getTime() + 24 *
60 * 60 * 1000);
const db = getFirestore();
const q = query(
collection(db, 'Transactions'),
where('date', '>=', startDate),
where('date', '<', endDate)
);
getDocs(q).then((querySnapshot) => {
const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id:
doc.id }));
setModalData(data);
});
}
}, [selectedDate]);

// calculate the total amount of transactions
const totalAmount = modalData ? modalData.reduce((acc, transaction) => acc + transaction.amount, 0) : 0;


return (
<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>
{selectedDate ? `Transaction History ${format(selectedDate,
'(MMMM do, yyyy)')}` : 'Popup page'}
</Modal.Title>
</Modal.Header>
<Modal.Body>
{modalData && modalData.length > 0 ? (
<div>
<table style={{ borderCollapse: 'separate', borderSpacing: '14px' }}>
<thead>
<tr>
<th>Date</th>
<th>Category</th>
<th>Description</th>
<th>Amount</th>
</tr>
</thead>
<tbody>
{modalData.map((transaction) => (
<tr key={transaction.id}>
<td>{format(transaction.date.toDate(),
'yyyy-MM-dd')}</td>
<td>{transaction.category}</td>
<td>{transaction.description}</td>
<td>{transaction.amount}</td>
</tr>
))}
</tbody>
</table>
 <p>Total amount: {totalAmount}</p>
 </div>
) : (
<p>No transactions found for this date.</p>
)}
</Modal.Body>
<Modal.Footer>
<Button variant="success" onClick={handleClose}>
Close
</Button>
</Modal.Footer>
</Modal>
);
};
export default ModalComponent;