import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";

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


export default App;
