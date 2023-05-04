import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Project = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('userId', '123'); // Replace with the actual user ID
      formData.append('projectTitle', projectTitle);
      formData.append('file', file);

      const response = await axios.post('/api/projects', formData);

      setLoading(false);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setProjectTitle('');
      setFile(null);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setSuccessMessage('');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex flex-column items-center w-full">
      <form onSubmit={handleSubmit}>
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div>
          <label htmlFor="projectTitle">Project title:</label>
          <input
            id="projectTitle"
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="file">File:</label>
          <input id="file" type="file" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Create project'}
        </button>
      </form>
    </div>
  );
};

export default Project;