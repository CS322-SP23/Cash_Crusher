import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths, isSameMonth, isSameDay } from
'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from
'date-fns';
import { addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ModalComponent from './ModalComponent';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { Container } from 'react-bootstrap';
import './Calendar_Style.css';

import firebaseConfig from '../firebase';
import { initializeApp, getApp } from "firebase/app";

let firebaseApp;

try {
  firebaseApp = getApp();
} catch (error) {
  firebaseApp = initializeApp(firebaseConfig);
}

const db = getFirestore(firebaseApp);


const {inAuthenticated, user} = useAuth0();
const userDatabaseRef = user ? collection(db, "Users", user.sub, "Transactions") : null;

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
return (
<div className="header row">
<div className="col col-start">
<span className="text">
<span className="text month">{format(currentMonth, 'M')}/</span>
<span className="text year">{format(currentMonth, 'yyyy')}</span>
</span>
</div>
<div className="col col-end">
<Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
<Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
</div>
</div>
);
};
const RenderDays = () => {
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thrs', 'Fri', 'Sat'];
return (
<div className="days row">
{days.map((day, index) => (
<div className="col" key={index}>
{day}
</div>
))}
</div>
);
};
const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
const monthStart = startOfMonth(currentMonth);
const monthEnd = endOfMonth(monthStart);
const startDate = startOfWeek(monthStart);
const endDate = endOfWeek(monthEnd);
const rows = [];
let days = [];
let day = startDate;
let formattedDate = '';
while (day <= endDate) {
for (let i = 0; i < 7; i++) {
formattedDate = format(day, 'd');
const cloneDay = day;
days.push(
<div
className={`col cell ${
!isSameMonth(day, monthStart) ? 'disabled' : isSameDay(day,
selectedDate) ? 'selected' : ''
}`}
key={day}
onClick={() => onDateClick(cloneDay)}
>
<span className="number">{formattedDate}</span>
</div>
);
day = addDays(day, 1);
}
rows.push(
<div className="row" key={day}>
{days}
</div>
);
days = [];
}
return <div className="body">{rows}</div>;
};
const Calendar = () => {
const [currentMonth, setCurrentMonth] = useState(new Date());
const [selectedDate, setSelectedDate] = useState(null);
const [modalData, setModalData] = useState(null);
const [showModal, setShowModal] = useState(false);
const navigate = useNavigate();

const prevMonth = () => {
setCurrentMonth(subMonths(currentMonth, 1));
};
const nextMonth = () => {
setCurrentMonth(addMonths(currentMonth, 1));
};
const onDateClick = async (day) => {
setSelectedDate(day);
setShowModal(true);
// Convert selected date to Firebase timestamp format
const selectedTimestamp = Timestamp.fromDate(day);
// Construct Firestore query to filter transactions by date
const querySnapshot = await getDocs(
collection(db, "Users", user.sub, "Transactions").where('date', '==', selectedTimestamp)
);
// Map query snapshot to an array of transaction objects
const transactions = querySnapshot.docs.map((doc) => {
return { id: doc.id, ...doc.data() };
});
// Set the modal data to the transactions array
setModalData(transactions);
};
const closeModal = () => {
setShowModal(false);
setSelectedDate(null);
};
const handleEventClick = (event) => {
setModalData(event);
setShowModal(true);
};
return (
  <Container fluid className="vh-100 bg-light text-dark py-5">

    <div className="calendar">
    <RenderHeader currentMonth={currentMonth}
      prevMonth={prevMonth} nextMonth={nextMonth} />
    <RenderDays />
<RenderCells currentMonth={currentMonth}
selectedDate={selectedDate} onDateClick={onDateClick} />
{showModal && <ModalComponent show={showModal}
handleClose={closeModal} selectedDate={selectedDate} />}
{showModal && (<ModalComponent modalData={modalData}
closeModal={closeModal} />)}
</div>
</Container>
);
}; export default Calendar;