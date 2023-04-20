
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
import { Container, Stack, Button, Table } from 'react-bootstrap';

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (date, description, category, amount) => {
    setTransactions([...transactions, { date, description, category, amount }]);
  };

  const deleteTransaction = (index) => {
    const newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const date = new Date(form.elements.date.value);
    const description = form.elements.description.value;
    const category = form.elements.category.value;
    const amount = Number(form.elements.amount.value);
    addTransaction(date, description, category, amount);
  };

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

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date.toLocaleDateString()}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td><Button onClick={() => deleteTransaction(index)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" name="date" />
        <br />
        <label>Description:</label>
        <input type="text" name="description" />
        <br />
        <label>Category:</label>
        <input type="text" name="category" />
        <br />
        <label>Amount:</label>
        <input type="number" name="amount" />
        <br />
        <button type="submit">Add Transaction</button>
      </form>
    </Container>
  );
}


export default App;
