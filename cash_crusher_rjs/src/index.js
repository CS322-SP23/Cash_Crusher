import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Calendar from './pages/Calendar';
import Summary from './pages/Summary';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThreeTabs from './ThreeTabs';

import '@fortawesome/fontawesome-free/css/all.min.css';  
import 'bootstrap-css-only/css/bootstrap.min.css';  
import 'mdbreact/dist/css/mdb.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ThreeTabs />
    <Container fluid className="vh-100 bg-secondary">
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/summary" element={<Summary/>} />
      </Routes>
    </Container>
  </Router>,
  document.getElementById('root')
);
