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
              <Button variant="primary">Refresh</Button>
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
              {/* Put transaction here. You copied the format to a sticky note on your computer */}
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