// frontend/src/components/AddScanForm.js
import React, { useState } from "react";
import axios from "axios";

function AddScanForm() {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    diagnosis: "",
    imageUrl: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/scans", formData);
      setMessage("✅ Scan submitted successfully!");
      setFormData({ patientName: "", age: "", diagnosis: "", imageUrl: "" });
    } catch (err) {
      setMessage("❌ Error submitting scan: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Add New Scan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="text"
          name="diagnosis"
          placeholder="Diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">Submit Scan</button>
      </form>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}

export default AddScanForm;
