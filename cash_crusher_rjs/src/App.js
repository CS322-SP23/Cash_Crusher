import React, { useState } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Container fluid className="vh-100 bg-secondary">
      <Row className="bg-primary text-light py-5">
        <Col>
          <h1 className="text-center mb-5">Transaction History</h1>
        </Col>
      </Row>
      <Row className="h-100">
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
        <Col xs={12} md={9} className="bg-light p-5">
          <Row className="mb-4">
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
              <Button variant="primary">Download</Button>
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
              <tr>
                <td>04/10/2023</td>
                <td>Amazon.com</td>
                <td>Shopping</td>
                <td className="text-danger">-$49.99</td>
              </tr>
              <tr>
                <td>04/09/2023</td>
                <td>Paycheck</td>
                <td>Salary</td>
                <td className="text-success">$2,500.00</td>
              </tr>
              <tr>
                <td>04/08/2023</td>
                <td>Starbucks</td>
                <td>Coffee</td>
                <td className="text-danger">-$4.99</td>
              </tr>
              <tr>
                <td>04/07/2023</td>
                <td>Uber</td>
                <td>Transportation</td>
                <td className="text-danger">-$15.00</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;