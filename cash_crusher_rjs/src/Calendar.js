import React, { Component } from "react";
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { addDays, parse } from 'date-fns';
import { initializeApp, getApp } from "firebase/app";
import firebaseConfig from '../firebase';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "firebase/auth";

let firebaseApp;

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row">
      <div className="col col-start">
        <span className="text">
          <span className="text month">
            {format(currentMonth, 'M')}Month
          </span>
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
  const days = [];
  const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thrs', 'Fri', 'Sat'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>,
    );
  }

  return <div className="days row">{days}</div>;
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
          className={`col cell ${!isSameMonth(day, monthStart)
              ? 'disabled'
              : isSameDay(day, selectedDate)
                ? 'selected'
                : format(currentMonth, 'M') !== format(day, 'M')
                  ? 'not-valie'
                  : 'valid'
            }`}
          key={day}
          onClick={() => onDateClick(parse(cloneDay, 'yyyy-MM-dd', new Date()))}
        >
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : ''
            }
          >
            {formattedDate}
          </span>
        </div>,
      );

      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day.getTime()}>
        {days}
      </div>,

    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };
  return (
    <div className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </div>
  );

}
export default Calendar;

/*
class Calendar extends React.Component{
    constructor(props) {
      super();
  
      this.state = {
        tab: 0,
      };
    }
    render(){
        return(
            <div>Calendar Page</div>
        )
    }
  }
  
  export default Calendar;
  */