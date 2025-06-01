import React, { useState } from 'react';

function UploadScan() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('scanFile', file);  // Make sure backend expects 'scanFile' field

      const response = await fetch('http://localhost:5000/api/scans/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();

      setMessage('File uploaded successfully!');
      setFile(null);
      e.target.reset();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload CT Scan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*,application/pdf"
          className="form-control"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <button type="submit" className="btn btn-primary mt-3" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default UploadScan;

