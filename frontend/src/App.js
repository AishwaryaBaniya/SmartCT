import React, { useState } from 'react';
import Login from './components/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <h2>Welcome to SmartCT Dashboard</h2>
        // Later here you can render scan list, upload, etc.
      )}
    </div>
  );
}

export default App;

