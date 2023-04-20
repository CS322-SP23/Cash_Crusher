import React, { Component } from "react";
import PieChart from './PieChart';


class Summary extends React.Component{
    constructor(props) {
      super();
  
      this.state = {
        tab: 0,
      };
    }

    render(){
        return(
            <div><PieChart /></div>
        )
    }
  }
  
  export default Summary;