import React, { useState } from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Summary from "./pages/Summary";
//import Calendar from "./pages/Calendar";
import ThreeTabs from "./ThreeTabs";
import firebaseConfig from './firebase';
import { initializeApp, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp, doc, deleteDoc, query, where, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";



let firebaseApp;

try {
  firebaseApp = getApp();
} catch (error) {
  firebaseApp = initializeApp(firebaseConfig);
}

const db = getFirestore(firebaseApp);


function MyCalendar({ onDateChange }) {
  const [value, setValue] = useState(new Date());

  const onChange = (date) => {
    setValue(date);
    onDateChange(date);
  };


}

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  
  const { isAuthenticated, user } = useAuth0();
  const userDatabaseRef = user ? collection(db, "Users", user.sub, "Transactions") : null;

  useEffect(() => {
    if (isAuthenticated && userDatabaseRef) {
      const unsubscribe = onSnapshot(userDatabaseRef, (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setTransactions(data);
      });
      return () => unsubscribe();
    }
  }, [isAuthenticated, userDatabaseRef]);


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
    if (!userDatabaseRef) {
      console.error("User not authenticated.");
      return;
    }

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
      const docRef = await addDoc(userDatabaseRef, newTransaction);
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

  const deleteTransaction = async (index) => {

    if (!userDatabaseRef) {
      console.error("User not authenticated.");
      return;
    }

    const transactionToDelete = transactions[index];
    const transactionRef = doc(db, "Transactions", transactionToDelete.id);
    try {
      await deleteDoc(transactionRef);
      const newTransactions = transactions.filter((transaction) => transaction.id !== transactionToDelete.id);
      setTransactions(newTransactions);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  


  const fetchTransactions = () => {
    if (!userDatabaseRef || !selectedDate) {
      return;
    }
  
    const start = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0);
    const end = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59);
  
    const queryRef = query(
      collection(userDatabaseRef, "Transactions"),
      where("date", ">=", start),
      where("date", "<=", end)
    );
  
    return onSnapshot(queryRef, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setTransactions(data);
    });
  };
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
  fetchTransactions();
}, [selectedDate, userDatabaseRef]);

  return (
    <>

        <Container fluid className="vh-100 bg-secondary">
        <Row className="bg-success text-light py-5">
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
              <option value="Utilities">Utilities</option>
              <option value="Savings">Savings</option>
              <option value="Personal Spending">Personal Spending</option>
            </Form.Control>
        </Form.Group>
      </Form>
              </Col>
              <Col>
                <input
                placeholder="How much did it cost?"
                type="number"
                name="amount"
                value={amount}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Button variant="success"  onClick={addTransaction}>
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
              <tr key={transaction.id}>
                <td>{transaction.date.toDate().toLocaleDateString()}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
                <td>
                  <Button variant="danger" onClick={() => deleteTransaction(index)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

            </tbody>
          </Table>
        </Col>
        <Col xs={12} md={3} className="bg-light py-5">
          
        </Col>
      </Row>
    </Container>
    </>
  );
}


export default App;