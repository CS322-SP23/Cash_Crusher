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

import { Auth0Provider } from '@auth0/auth0-react';



const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <Router>
      <ThreeTabs />
      <Container fluid className="vh-100 bg-secondary">
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/calendar" element={<Calendar />} />
          <Route exact path="/summary" element={<Summary/>} />
        </Routes>
      </Container>
    </Router>
  </Auth0Provider>,
  document.getElementById('root')
);
