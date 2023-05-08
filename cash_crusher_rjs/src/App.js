
import React, { useState } from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Summary from "./pages/Summary";
import Calendar from "./pages/Calendar";
import ThreeTabs from "./ThreeTabs";
import firebaseConfig from './firebase';
import { initializeApp, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";



let firebaseApp;

try {
  firebaseApp = getApp();
} catch (error) {
  firebaseApp = initializeApp(firebaseConfig);
}

const db = getFirestore(firebaseApp);



function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  

  const categories = [
    "Personal",
    "Savings",
    "Food",
    "Travel",
    "Entertainment",
    "Utilities",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "date":
        setDate(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "amount":
        setAmount(value);
        break;
      default:
        break;
    }
  };
  

  const addTransaction = async () => {
    console.log("Add transaction button clicked!");
    if (!date) {
      console.error("Date is required.");
      return;
    }
    const newTransaction = {
      date: Timestamp.fromDate(new Date(date)),
      description: description,
      category: category,
      amount: Number(amount),
    };
    const transactionsRef = collection(db, "Transactions");
    try {
      const docRef = await addDoc(transactionsRef, newTransaction);
      console.log("Document written with ID: ", docRef.id);
      const updatedTransactions = [...transactions, { ...newTransaction, id: docRef.id }];
      setTransactions(updatedTransactions);
      setDate("");
      setDescription("");
      setCategory("");
      setAmount("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteTransaction = (index) => {
    const newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
  };

  return (
    <>
        <Container fluid className="vh-100 bg-light py-5">
          
        <Row >
          <Col></Col>
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
              <Form>
          <Form.Group>
            <Form.Control
              as="select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Select Budget category...</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </Form.Control>
        </Form.Group>
      </Form>
              </Col>
              <Col>
  <input
    placeholder="How much did it cost?"
    type="text"
    name="amount"
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
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date.toDate().toLocaleDateString()}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td className="text-danger">{transaction.amount}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteTransaction(transaction.id)}
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
    </>
  );
}


export default App;