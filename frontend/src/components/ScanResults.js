import React from 'react';

const mockScans = [
  {
    id: '1',
    filename: 'scan1.png',
    uploadedAt: '2025-06-01 10:00',
    status: 'Completed',
    summary: 'No trauma detected.',
  },
  {
    id: '2',
    filename: 'scan2.jpg',
    uploadedAt: '2025-06-01 11:30',
    status: 'Processing',
    summary: '',
  },
  {
    id: '3',
    filename: 'scan3.pdf',
    uploadedAt: '2025-06-01 12:15',
    status: 'Error',
    summary: 'Failed to process scan.',
  },
];

function ScanResults() {
  return (
    <div>
      <h2>Scan Results</h2>
      {mockScans.length === 0 ? (
        <p>No scans uploaded yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>File</th>
              <th>Uploaded At</th>
              <th>Status</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {mockScans.map(scan => (
              <tr key={scan.id}>
                <td>{scan.filename}</td>
                <td>{scan.uploadedAt}</td>
                <td>{scan.status}</td>
                <td>{scan.summary || 'Processing...'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ScanResults;
