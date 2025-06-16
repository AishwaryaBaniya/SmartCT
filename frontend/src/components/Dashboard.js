// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [scans, setScans] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/');

    fetch('http://localhost:5000/api/scans', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setScans(data))
      .catch(err => console.error('Error fetching scans:', err));
  }, [token, navigate]);

  const handleUpload = async () => {
    const dummyScan = {
      patientName: 'John Doe',
      age: 45,
      diagnosis: 'Possible internal trauma',
      imageUrl: 'http://dummyimage.com/scan123.png'
    };

    const res = await fetch('http://localhost:5000/api/scans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(dummyScan)
    });

    const data = await res.json();
    if (res.ok) {
      setScans(prev => [...prev, data.scan]);
    } else {
      alert(data.error || 'Failed to upload scan');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div>
          <h2>SmartCT</h2>
          <nav>
            <ul>
              <li><a href="#">📊 Dashboard</a></li>
              <li><a onClick={handleUpload} href="#">📤 Upload</a></li>
              <li><a href="#">📁 Results</a></li>
              <li><a href="#">⚙️ Settings</a></li>
            </ul>
          </nav>
        </div>
        <div className="admin-info">
          <a href="#" className="admin-button">👤 <strong>Admin</strong></a>
          <button onClick={handleLogout} href="#" className="btn">🚪 Logout</button>
        </div>
      </aside>

      <main className="main-content">
        <h1>Welcome to SmartCT</h1>
        <p>Your AI-powered abdominal trauma detection assistant</p>

        <div className="stats">
          <div className="stat-box"><a href="#">Total Scans: {scans.length}</a></div>
          <div className="stat-box"><a href="#">Accuracy Rate</a></div>
          <div className="stat-box"><a href="#">Average Time</a></div>
        </div>

        <div className="actions">
          <a onClick={handleUpload} className="btn" href="#">🩻 New Scan</a>
          <a href="#" className="btn">📊 View Results</a>
          <a href="#" className="btn">⚙️ Settings</a>
        </div>

        <div className="activity">
          <h2>Recent Scans</h2>
          <ul>
            {scans.map(scan => (
              <li key={scan._id}>
                {scan.patientName} ({scan.age}) - {scan.diagnosis}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


