// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="container">
      <aside className="sidebar">
        <div>
          <h2>SmartCT</h2>
          <nav>
            <ul>
              <li><a href="#">📊 Dashboard</a></li>
              <li><a href="#">📤 Upload</a></li>
              <li><a href="#">📁 Results</a></li>
              <li><a href="#">⚙️ Settings</a></li>
            </ul>
          </nav>
        </div>
        <div className="admin-info">
          <a href="#" className="admin-button">👤 <strong>Admin</strong></a>
        </div>
      </aside>

      <main className="main-content">
        <h1>Welcome to SmartCT</h1>
        <p>Your AI-powered abdominal trauma detection assistant</p>

        <div className="stats">
          <div className="stat-box"><a href="#">Total Scans</a></div>
          <div className="stat-box"><a href="#">Accuracy Rate</a></div>
          <div className="stat-box"><a href="#">Average Time</a></div>
        </div>

        <div className="actions">
          <a href="#" className="btn">🩻 New Scan</a>
          <a href="#" className="btn">📊 View Results</a>
          <a href="#" className="btn">⚙️ Settings</a>
        </div>

        <div className="activity">
          <h2>Recent Activity</h2>
          <ul>
            <li><a href="#">CT_Scan_Report_001.pdf</a></li>
            <li><a href="#">Scan_Results_April.csv</a></li>
            <li><a href="#">NewUpload_May23.zip</a></li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

