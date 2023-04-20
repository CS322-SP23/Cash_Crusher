import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";

function App() {
  const [startDate, setStartDate] = useState(new Date());

  const [data, setData] = useState([{}])

  // retrieve data from flask
  
    useEffect(() => {
      fetch("https://selynlee-bug-free-happiness-5rw9j9jw59rc4w7w-5000.preview.app.github.dev/hello").then(
        res => res.json()).then(
          data => {
            setData(data)
            console.log(data)
          })
    }, [])

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
