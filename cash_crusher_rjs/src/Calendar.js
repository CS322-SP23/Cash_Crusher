import React, { Component } from "react";
import Monthly from "./Monthly";

class Calendar extends React.Component{
    constructor(props) {
      super();
  
      this.state = {
        tab: 0,
      };
    }

    render(){
        return(
            <div><Monthly /></div>
        )
    }
  }
  
  export default Calendar;