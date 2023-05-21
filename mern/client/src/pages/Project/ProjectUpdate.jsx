import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useParams
import Select from "react-select"
import makeAnimated from "react-select/animated"
import './ProjectUpdate.css';

const animatedComponents = makeAnimated()

function ProjectUpdate() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userEmails, setUserEmails] = useState([]);
  const [newSummary, setNewSummary] = useState('');
  const [newFiles, setNewFiles] = useState(null);
  const location = useLocation();
  const { prevPath } = location.state || { prevPath: '/dashboard' };
  const [projectUserEmails, setProjectUserEmails] = useState([]);


  useEffect(() => {
    fetchUserEmails();
    fetchProjectUsers();
  }, []);
  const fetchProjectUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/projects/${projectId}`);
      const project = response.data;
      const projectUsersEmails = project.users.map(user => user.userID?.User_Info?.email);
      setProjectUserEmails(projectUsersEmails);
    } catch (error) {
      console.error(error);
    }
  };



  const fetchUserEmails = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/userIds');
      const emails = response.data;  // directly assign the returned data
      setUserEmails(emails);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const userIds = selectedOptions.map((option) => option.value);
      formData.append('members', JSON.stringify(userIds));
      formData.append('summary', newSummary);
      if (newFiles) {
        for (let file of newFiles) {
          formData.append('file', file);
        }
      }

      await axios.put(`http://localhost:1337/api/projects/${projectId}`, formData);

      alert("Project updated successfully!");

      setNewSummary('');
      setTimeout(() => {
        // Redirect to dashboard after successful project creation
        navigate('/dashboard');
      }, 2000); // Clear the summary field
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the project.");
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const options = userEmails
  .filter(email => !projectUserEmails.includes(email))
  .map(email => ({ value: email, label: email }));


  const handleFileChange = (e) => {
    setNewFiles(e.target.files);
  };

  const goBack = () => {
    navigate(prevPath);
  };

  return (
    <form className="project-update-form " onSubmit={handleUpdateSubmit}>
      {/* <input
        type="text"
        //value={newMembers}
        //onChange={(e) => setNewMembers(e.target.value)}
        placeholder="Add members"
      /> */}
      <Select
        className='DropDown'
        options={options}
        isMulti
        isSearchable
        value={selectedOptions}
        onChange={handleSelectChange}
        components={animatedComponents}
        placeholder="Add Member"
      />
      <input
        type="text"
        value={newSummary}
        onChange={(e) => setNewSummary(e.target.value)}
        placeholder="Add summary"
      />
      <div className="buttonContainer">
        <input className="file-input" type="file" multiple onChange={handleFileChange} />
        <button type="submit">Update project</button>
        <button type="button" onClick={goBack}>Cancel Update</button>
      </div>
    </form>
  );
}

export default ProjectUpdate;
