import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route} from 'react-router -dom';
import { Fisettings} from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion-ej2-react-popups';


import './App.css'

function App() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Container>
      <Stack direction="horizontal" gap="2" className="mb-4 justify-content-center bg-success">
        <h1 className="text-white p-3">Transactions</h1>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
        <Button variant="primary">Refresh</Button> 
      </Stack>
    </Container>
  );
}



const App = () => {
  return(
    <div>
      <BrowserRouter>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right -4 bottom-4" style={{zIndex: '1000'}}>
          <TooltipComponent content = "Settings" position="Top">
            <button>
              <Fisettings/>
            </button>
          </TooltipComponent>
        </div>
        </div></BrowserRouter>
    </div>
  )
}
export default App;
