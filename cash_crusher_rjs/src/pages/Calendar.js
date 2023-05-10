import { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ModalComponent from './ModalComponent';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';


const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row">
      <div className="col col-start">
        <span className="text">
          <span className="text month">{format(currentMonth, 'M')}Month</span>
          {format(currentMonth, 'yyyy')}
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
            !isSameMonth(day, monthStart) ? 'disabled' : isSameDay(day, selectedDate) ? 'selected' : ''
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
  const db = getFirestore();

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
    collection(db, 'transactions').where('date', '==', selectedTimestamp)
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
    };
            
const handleEventClick = (event) => {
     setModalData(event);
     setShowModal(true);
     };
            
const handleAddEventClick = () => {
    navigate('/add-event');
    };
            
    return (
        <div className="calendar">
            <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
            <RenderDays />
            <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} />
            {showModal && <ModalComponent show={showModal} handleClose={closeModal} selectedDate={selectedDate} />}
            {showModal && (<ModalComponent modalData={modalData} closeModal={closeModal} />)}
            <div className="add-event" onClick={handleAddEventClick}>
                <Icon icon="bi:plus-circle" />
            </div>
        </div>
    );
    }; export default Calendar;