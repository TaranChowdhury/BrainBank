import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Project.css"
import '../../fonts.css'

const Project = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectSummary, setProjectSummary] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [userEmails, setUserEmails] = useState([]);

  useEffect(() => {
    fetchUserEmails();
  }, []);

  const fetchUserEmails = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/userIds');
      const emails = response.data;
      setUserEmails(emails);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('userId', selectedOption); // Replace with the actual user ID
      formData.append('projectTitle', projectTitle);
      formData.append('projectSummary', projectSummary);
      formData.append('file', file);

      const response = await axios.post('http://localhost:1337/api/projects', formData);

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

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="create-project">
      <h1 className='slogan'>Let's get creative. </h1>
      <form onSubmit={handleSubmit}>
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div>
          <label className="headers"htmlFor="projectTitle">Project Name*</label>
          <input className="entryBoxes"
            id="projectTitle"
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
          <label className="headers" htmlFor="projectSummary">Project Summary</label>
          <input className="entryBoxes"
            id="projectTittle"
            type="text"
            value={projectSummary}
            onChange={(e) => setProjectSummary(e.target.value)}
          />
        </div>
        <div className="fileContainer">
          <label className="headers" htmlFor="projectTittle">File*</label>
          <input id="projectTittle" type="file" onChange={handleFileChange} />
        </div>
        <div>
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value="">Add Members</option>
            {userEmails.map((email) => (
              <option key={email} value={email}>
                {email}
              </option>
            ))}
          </select>
          <p className="headers">Current Teammates:<br></br><br></br>{selectedOption}</p>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Create project'}
        </button>
      </form>
    </div>
  );
};

export default Project;
