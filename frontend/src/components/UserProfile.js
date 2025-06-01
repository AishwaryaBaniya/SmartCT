import React, { useState } from 'react';

function UserProfile() {
  // Mock user data
  const [user, setUser] = useState({
    name: 'Aishwarya',
    email: 'aishwarya@example.com',
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    // For now, just update local state
    setUser(formData);
    setEditing(false);
  };

  return (
    <div>
      <h2>User Profile</h2>
      {editing ? (
        <div>
          <label>
            Name: 
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="form-control mb-2"
            />
          </label>
          <label>
            Email: 
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="form-control mb-2"
            />
          </label>
          <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="btn btn-secondary" onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
