import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Select from "react-select"
import makeAnimated from "react-select/animated"
import "./Project.css"
import '../../fonts.css'
import { useNavigate } from 'react-router-dom';




const animatedComponents = makeAnimated()

const Project = () => {
  const navigate = useNavigate();

  const [projectTitle, setProjectTitle] = useState('');
  const [projectSummary, setProjectSummary] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userEmails, setUserEmails] = useState([]);

  useEffect(() => {
    fetchUserEmails();
  }, []);

  const fetchUserEmails = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/userIds');
      const emails = response.data;  // directly assign the returned data
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
      const userIds = selectedOptions.map((option) => option.value); // Extract email strings from selectedOptions
      formData.append('userId', JSON.stringify(userIds));
      formData.append('projectTitle', projectTitle);
      formData.append('projectSummary', projectSummary);
      files.forEach((file, index) => {
        formData.append('files', file);
      });

      const response = await axios.post('http://localhost:1337/api/projects', formData);

      setLoading(false);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setProjectTitle('');
      setProjectSummary('')
      setFiles([]);
      setTimeout(() => {
        // Redirect to dashboard after successful project creation
        navigate('/dashboard');
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setLoading(false);
      setSuccessMessage('');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };
  const goBack = () => {
    navigate('/dashboard');
  };
  

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const options = userEmails.map((email) => ({
    value: email,
    label: email,
  }));

  return (
    <div className="create-project">
      <h1 className='slogan'>Let's get creative. </h1>
      <form onSubmit={handleSubmit}>
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div>
          <label className="headers" htmlFor="projectTitle">Project Name*</label>
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
        <label className="headers" htmlFor="projectTittle">File*</label>
        <div className="fileContainer">
          <input id="projectTittle" type="file" onChange={handleFileChange} multiple />
        </div>
        <div>
          <label className="headers">Create Your Team</label>
          <Select
            options={options}
            isMulti
            isSearchable
            value={selectedOptions}
            onChange={handleSelectChange}
            components={animatedComponents}
          />
          <p className="headers">Current Teammates:</p>
          {selectedOptions.map((option) => (
            <p key={option.value}>{option.label}</p>
          ))}
        </div>

        <div className="buttonContainer">
          <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Create project'}
            
          </button>
          <button onClick={goBack}>Back to Dashboard</button>

        </div>

      </form>
    </div>
  );
};

export default Project;
