import Summary from './pages/Summary';
import React, { useState } from "react";
import Daily from './pages/Daily';
import Calendar from './pages/Calendar';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom';

function ThreeTabs() {
  const [tab, setTab] = useState(0);

  const changeTab = (tabIndex) => {
    setTab(tabIndex);
  };

  return (
    <Router>
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand>Transactions</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" className={`${tab === 0 ? 'active' : ''}`} onClick={() => changeTab(0)}>Daily</Nav.Link>
            <Nav.Link as={Link} to="/calendar" className={`${tab === 1 ? 'active' : ''}`} onClick={() => changeTab(1)}>Calendar</Nav.Link>
            <Nav.Link as={Link} to="/summary" className={`${tab === 2 ? 'active' : ''}`} onClick={() => changeTab(2)}>Summary</Nav.Link>
          </Nav>
        </Navbar>
        <Routes>
          <Route path="/" element={<Daily />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </Router>
  )
}

export default ThreeTabs;
