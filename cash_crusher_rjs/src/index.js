import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThreeTabs from './ThreeTabs';

import '@fortawesome/fontawesome-free/css/all.min.css';  
import 'bootstrap-css-only/css/bootstrap.min.css';  
import 'mdbreact/dist/css/mdb.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> {/* wrap ThreeTabs with BrowserRouter */}
      <App />
      <ThreeTabs />
  </React.StrictMode>
);
