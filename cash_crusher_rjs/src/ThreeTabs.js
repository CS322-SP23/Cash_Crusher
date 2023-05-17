import {React, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Summary from './pages/Summary';
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";


function ThreeTabs() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h2 className="mb-3" style={{ fontWeight: "bold" }}>CASH CRUSHER</h2>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className={`nav-item ${activeTab === '/' ? 'active' : ''}`}>
              <Link className="nav-link" to="/" onClick={() => handleTabClick('/')}>Home</Link>
            </li>
            <li className={`nav-item ${activeTab === '/calendar' ? 'active' : ''}`}>
              <Link className="nav-link" to="/calendar" onClick={() => handleTabClick('/calendar')}>Calendar</Link>
            </li>
            <li className={`nav-item ${activeTab === '/summary' ? 'active' : ''}`}>
              <Link className="nav-link" to="/summary" onClick={() => handleTabClick('/summary')}>Summary</Link>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <LoginButton />
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default ThreeTabs;

/*
function ThreeTabs() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
        <h2 className="mb-3" style={{ fontWeight: "bold" }}>CASH CRUSHER</h2></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/calendar">Calendar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Summary">Summary</Link>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <LoginButton />
          <LogoutButton/>
        </div>
      </div>
    </nav>
  );
}

export default ThreeTabs;
*/