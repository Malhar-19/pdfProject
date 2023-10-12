import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState('');
  const [numPages, setNumPages] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload the PDF file to the backend.
      const response = await axios.post('http://localhost:3001/Home', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update user information based on the response.
      if (response.data) {
        setUserName(response.data.userName);
        setNumPages(response.data.numPages);
      }
    } catch (error) {
      console.error('Error uploading the PDF:', error);
    }
  };

  return (
    <div>
      <h2>Share your PDF Document</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
      {userName && numPages !== null && (
        <div>
          <p>User Name: {userName}</p>
          <p>Number of Pages: {numPages}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
