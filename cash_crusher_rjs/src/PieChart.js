import React from "react";
import { MDBContainer } from "mdbreact";
import { Pie } from "react-chartjs-2";
//import {Chart, ArcElement} from 'chart.js'
//Chart.register(ArcElement);
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = () => {
    
    const data = {
      labels: ["Cat1", "Cat2", "Cat3"],
        datasets: [
          {
            label: "Expenditure accroding to the categories",
            data: [2, 5, 7],
            backgroundColor: ["lightgreen", "yellow", "green"],
          }
        ] 
    
    };
    const options = {
      responsive: true
    }
      
    return (
      <div 
        style={
          {
          padding: '20px',
          width: '50%'
          }
        } >
        <Pie
          data = {data}
          options = {options}
        >

        </Pie>

        </div>

      /*
      <MDBContainer>
        <Pie data={data} 
        padding={"20px"}
        width={"30%"}
        options={{ maintainAspectRatio: false }}
        />
      </MDBContainer>
      */
    );
    
  }
      
  export default PieChart;