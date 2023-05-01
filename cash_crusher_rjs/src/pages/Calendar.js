import React, { Component } from "react";
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
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

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedData, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  return (
    <div className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <div className="days">Days</div>
      <div className="body">Cells</div>
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