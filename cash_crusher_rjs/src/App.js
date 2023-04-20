import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "date") {
      setDate(event.target.value);
    } else if (event.target.name === "description") {
      setDescription(event.target.value);
    } else if (event.target.name === "category") {
      setCategory(event.target.value);
    } else if (event.target.name === "amount") {
      setAmount(event.target.value);
    }
  };

  const addTransaction = () => {
    const newTransaction = {
      date: date,
      description: description,
      category: category,
      amount: amount
    };

    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (index) => {
    let newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
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
    <Container fluid className="vh-100 bg-secondary">
      <Row className="bg-primary text-light py-5">
        <Col>
          <h1 className="text-center mb-5">Transaction History</h1>
        </Col>
      </Row>
      <Row className="h-100">
        <Col xs={12} md={9} className="bg-light p-5">
          <Row>
            <Col>
              <h2 className="mb-3">Transaction History</h2>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="form-control"
              />
            </Col>
            <Col className="text-end">
              <Button variant="primary">Refresh</Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <input
                type="date"
                name="date"
                value={date}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <input
                placeholder="C-Store, Gizmo, Pho Lover "
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <input
                placeholder="Personal, Savings, etc"
                type="text"
                name="category"
                value={category}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <input
                placeholder="How much did it cost?"
                type="text"
                name="amount"
                value={amount}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Button variant="primary" onClick={addTransaction}>
                Add Transaction
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td className="text-danger">{transaction.amount}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteTransaction(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col xs={12} md={3} className="bg-light py-5">
          <h3 className="text-center mb-4">Accounts</h3>
          <ul className="list-unstyled">
            <li className="mb-2">
              <a href="#" className="text-decoration-none text-dark">
                Checking
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none text-dark">
                Savings
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none text-dark">
                Credit Card
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}


export default App;
