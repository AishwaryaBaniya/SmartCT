import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your authentication logic here
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="on">
      <div className="mb-3">
        <label htmlFor="emailInput" className="form-label">Email address</label>
        <input
          type="email"
          id="emailInput"
          name="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"  // Important for autofill
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="passwordInput" className="form-label">Password</label>
        <input
          type="password"
          id="passwordInput"
          name="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"  // Important for autofill
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
}

export default Login;
