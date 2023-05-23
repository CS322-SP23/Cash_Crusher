import React, { useState, useEffect } from "react";
import { Table, Col, Row, Form, Button, Container } from "react-bootstrap";
import PieChart from "../PieChart";
import { initializeApp, getApp } from "firebase/app";
import firebaseConfig from '../firebase';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "firebase/auth";
import { useAuth0 } from '@auth0/auth0-react';

let firebaseApp;

try {
  firebaseApp = getApp();
} catch (error) {
  firebaseApp = initializeApp(firebaseConfig);
}


const db = getFirestore(firebaseApp);


const Summary = ({ transactions, expenses }) => {
  const { isAuthenticated, user } = useAuth0();
  const transactionsRef = collection(db, "Users", user.sub, "Transactions");
  const [data, setData] = useState([
    { id: 1, category: "Food", amount: 0, percentage: 0, color: "green" },
    { id: 2, category: "Transportation", amount: 0, percentage: 0, color: "green" },
    { id: 3, category: "Entertainment", amount: 0, percentage: 0, color: "green" },
    { id: 4, category: "Utilities", amount: 0, percentage: 0, color: "green" },
    { id: 5, category: "Savings", amount: 0, percentage: 0, color: "green" },
    { id: 6, category: "Personal Spending", amount: 0, percentage: 0, color: "green" },
    { id: 6, category: "Shopping", amount: 0, percentage: 0, color: "green" },
  ]);
  
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [firebaseTransactions, setFirebaseTransactions] = useState([]);
  const greenShades = ["#b5e6b5", "#8cd98c", "#62cc62"];
  const yellowShades = ["#ffe68e", "#ffd666", "#ffc53f"];
  const redShades = ["#ff9999", "#ff6666", "#ff3333"];


  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const selectedCategoriesCopy = [...selectedCategories];
    if (selectedCategoriesCopy.includes(category)) {
      // Remove the category from the array if it is already selected
      selectedCategoriesCopy.splice(
        selectedCategoriesCopy.indexOf(category),
        1
      );
    } else {
      // Add the category to the array if it is not already selected
      selectedCategoriesCopy.push(category);
      const categoryExists = data.some(
        (item) => item.category === category
      );
      if (!categoryExists) {
        const newCategory = {
          id: data.length + 1,
          percentage: 0,
          category: category,
          amount: 0,
        };
        setData([...data, newCategory]);
      }
    }
    setSelectedCategories(selectedCategoriesCopy);
  };
  
  

  const handleAddCategory = () => {
    // Check if the selected category already exists in the data array
    const categoryExists = data.some(
      (item) => item.category === selectedCategory
    );

    if (categoryExists) {
      alert(`Category "${selectedCategory}" already exists.`);
    } else {
      const newCategory = {
        id: data.length + 1,
        percentage: 0,
        category: selectedCategory,
        amount: 0,
      };
      setData([...data, newCategory]);
      setSelectedCategory("");
    }
  };

  const filteredData = data.filter((item) =>
    selectedCategories.includes(item.category)

    
  );

  const selectedData = data
    .filter((item) => selectedCategories.includes(item.category))
    .map((item) => ({ category: item.category, amount: item.amount })
  );

  useEffect(() => {
  // Set the initial state of the data array
  setData([
    { id: 1, category: "Food", amount: 0, percentage: 0 },
    { id: 2, category: "Transportation", amount: 0, percentage: 0 },
    { id: 3, category: "Entertainment", amount: 0, percentage: 0 },
    { id: 4, category: "Utilities", amount: 0, percentage: 0 },
    { id: 5, category: "Savings", amount: 0, percentage: 0 },
    { id: 6, category: "Personal Spending", amount: 0, percentage: 0 },
  ]);
}, []);

  useEffect(() => {

    
    getDocs(collection(db, "Users", user.sub, "Transactions"))
      .then((querySnapshot) => {
        const firebaseData = [];
        querySnapshot.forEach((doc) => {
          firebaseData.push({ id: doc.id, ...doc.data() });
        });
        setFirebaseTransactions(firebaseData);
  
        if (firebaseData && firebaseData.length > 0) {
          const totalAmount = firebaseData.reduce((acc, transaction) => {
            const categoryIndex = data.findIndex(
              (item) => item.category === transaction.category
            );
            if (categoryIndex !== -1) {
              data[categoryIndex].amount += transaction.amount;
              return acc + transaction.amount;
            }
            return acc;
          }, 0);
  
          // Update the `data` state with the new Food category
          setData([
            ...data,
            {
              id: data.length + 1,
              percentage: 0,
              category: "Food",
              amount: 0,
            },
          ]);
  
          // Recalculate the `totalAmount` variable and update the percentages
          const updatedData = updatePercentages(data, totalAmount);
  
          // Update the `data` state with the updated data
          setData(updatedData);
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [transactionsRef]);
  
  function updatePercentages(data, totalAmount) {
    if (totalAmount === 0) {
      return data;
    }
  
    return data.map((item) => {
      item.percentage = ((item.amount / totalAmount) * 100).toFixed(2);
      item.amount = parseFloat(item.amount);
      if (!isNaN(item.amount)) {
        item.amount = item.amount.toFixed(2);
      }
      const backgroundColor = getColor(item.percentage);
      return {
        ...item,
        color: backgroundColor,
        style: {
          backgroundColor: backgroundColor
        }
      };
    });
  }
  

  function getColor(percentage) {
    let colorShades = null;
    if (percentage >= 75) {
      colorShades = redShades;
    } else if (percentage >= 50) {
      colorShades = yellowShades;
    } else {
      colorShades = greenShades;
    }
    const index = Math.min(Math.floor(percentage / 25), 2);
    return colorShades[index];
  }
  
  
  
  

  return (
    <>
    <Container fluid className="vh-100 bg-light text-light py-5">

    
    <Row>
        <Col md={6}>
          <div style={{ height: "500px" }}>
          <PieChart data={selectedData} />
          </div>
        </Col>
        <Col md={6}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Percentage</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
  {data &&
    data.map((item) => (
      <tr key={item.id}>
        <td style={{ backgroundColor: item.color }}>
          {item.percentage}%
        </td>

        <td>{item.category}</td>
        <td>{typeof item.amount === 'number' ? item.amount.toFixed(2) : item.amount}</td>
        <td>
          <Form.Check
            type="checkbox"
            value={item.category}
            checked={selectedCategories.includes(item.category)}
            onChange={handleCategoryChange}
          />
        </td>
      </tr>
    ))}
</tbody>


          </Table>
          
        <Form>
          <Form.Group>
            <Form.Label>Add a category:</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="">Select a category...</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Savings">Savings</option>
              <option value="Personal Spending">Personal Spending</option>
            </Form.Control>
        </Form.Group>
        <Button
          variant="success"
          type="button"
          onClick={handleAddCategory}
          disabled={!selectedCategory}
        >
          Add
        </Button>
      </Form>

        </Col>
      </Row>
   
    </Container>
    </>
  );
};

export default Summary;
