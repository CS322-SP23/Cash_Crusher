import React, { Component } from "react";


class Calendar extends React.Component{
    constructor(props) {
      super();
  
      this.state = {
        tab: 0,
      };
    }

    render(){
        return(
          <div>This is a Calendar page</div>
        )
    }
  }
  
  export default Calendar;