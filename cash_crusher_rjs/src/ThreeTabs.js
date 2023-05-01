import React, { Component } from "react";
import Daily from './Daily';
import Calendar from './Calendar';
import Summary from './Summary';

const tabList = {
  0: <Daily />,
  1: <Calendar />,
  2: <Summary />
};

class ThreeTabs extends React.Component{
  constructor(props) {
    super();

    this.state = {
      tab: 0,
    };
  }

  changeTab = (tabIndex) =>{
    this.setState({tab : tabIndex});
  }

  render(){
    return(
      <div style={{ width: '30%'}}>
      <div className="wrap">
        <div className="menuBar">
          <ul className="tabs">
            <li className={`${this.state.tab === 0? 'active': ''}`} onClick={() => this.changeTab(0)}>Daily</li>
            <li className={`${this.state.tab === 1? 'active': ''}`} onClick={() => this.changeTab(1)}>Calendar</li>
            <li className={`${this.state.tab === 2? 'active': ''}`} onClick={() => this.changeTab(2)}>Summary</li>
          </ul>
        </div>
        <div className="contentArea">
          {tabList[this.state.tab]}
        </div>
      </div>
      </div>
    )
  }
}


export default ThreeTabs;