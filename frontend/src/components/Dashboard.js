import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  // Mock stats for now
  const stats = {
    totalScans: 25,
    processed: 20,
    pending: 5,
  };

  return (
    <div>
      <h1>Welcome to SmartCT Dashboard</h1>

      <div className="my-4">
        <h4>Summary</h4>
        <ul>
          <li>Total Scans Uploaded: {stats.totalScans}</li>
          <li>Scans Processed: {stats.processed}</li>
          <li>Scans Pending: {stats.pending}</li>
        </ul>
      </div>

      <div className="my-4">
        <Link to="/upload" className="btn btn-primary me-2">Upload New Scan</Link>
        <Link to="/results" className="btn btn-secondary">View Scan Results</Link>
      </div>
    </div>
  );
}

export default Dashboard;
