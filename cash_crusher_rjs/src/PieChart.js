import React from "react";
import { MDBContainer } from "mdbreact";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const PieChart = ({ data, selectedCategories, summaryData }) => {
  const filteredData = selectedCategories && selectedCategories.length > 0
  ? data.filter((item) =>
    selectedCategories.includes(item.category)
  )
  : data;


  const chartData = {
    labels: filteredData.map((item) => item.category),
    datasets: [
      {
        label: "Budget Categories Spent",
        data: filteredData.map((item) => item.amount),
        backgroundColor: ["blue", "blueviolet", "cornflowerBlue", "cadetblue", "dodgerblue","navy","royalblue"],
      },
    ],
  };

  if (summaryData && summaryData.length > 0) {
    const totalAmount = summaryData.reduce((acc, item) => acc + item.amount, 0);
    const updatedChartData = {
      labels: summaryData.map((item) => item.category),
      datasets: [
        {
          label: "Budget Categories Spent",
          data: summaryData.map((item) => item.amount),
          backgroundColor: ["blue", "green", "yellow", "pink", "orange"],
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed) {
                label += context.parsed.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
              }
              return label;
            }
          }
        }
      }
    }

    return (
      <MDBContainer style={{ height: "500px", width: "500px" }}>
        <Pie data={updatedChartData} options={options} />
      </MDBContainer>
    );
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed) {
              label += context.parsed.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
            }
            return label;
          }
        }
      }
    }
  }

  return (
    <MDBContainer style={{ height: "500px", width: "500px" }}>
      <Pie data={chartData} options={options} />
    </MDBContainer>
  );
};

export default PieChart;
