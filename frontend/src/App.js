import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import UserProfile from './components/UserProfile';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="container mt-4">
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Router>
          <nav className="navbar navbar-expand navbar-light bg-light mb-4">
            <div className="navbar-nav">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/upload" className="nav-link">Upload Scan</Link>
              <Link to="/results" className="nav-link">Scan Results</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button
                className="btn btn-outline-danger ms-auto"
                onClick={() => setLoggedIn(false)}
              >
                Logout
              </button>
            </div>
          </nav>

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadScan />} />
            <Route path="/results" element={<ScanResults />} />
            <Route path="/profile" element={<UserProfile />} />

          </Routes>
        </Router>
      )}
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Welcome to SmartCT Dashboard</h2>
      <p>This is your main dashboard after login.</p>
    </div>
  );
}

function UploadScan() {
  return (
    <div>
      <h2>Upload CT Scan</h2>
      <form>
        <input type="file" accept="image/*,application/pdf" className="form-control" />
        <button type="submit" className="btn btn-primary mt-3">Upload</button>
      </form>
    </div>
  );
}

function ScanResults() {
  return (
    <div>
      <h2>Scan Results</h2>
      <p>Your processed scan results will appear here.</p>
    </div>
  );
}

export default App;
