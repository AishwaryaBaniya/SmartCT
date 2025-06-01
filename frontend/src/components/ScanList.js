// frontend/src/components/ScanList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function ScanList() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/scans");
        setScans(res.data);
      } catch (error) {
        console.error("Error fetching scans:", error);
      }
    };

    fetchScans();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", marginTop: "40px" }}>
      <h2>Scan Records</h2>
      {scans.length === 0 ? (
        <p>No scans found.</p>
      ) : (
        <ul>
          {scans.map((scan) => (
            <li key={scan._id} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
              <strong>Patient:</strong> {scan.patientName} <br />
              <strong>Age:</strong> {scan.age} <br />
              <strong>Diagnosis:</strong> {scan.diagnosis} <br />
              <strong>Image URL:</strong>{" "}
              <a href={scan.imageUrl} target="_blank" rel="noreferrer">
                View Image
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ScanList;
