import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Project.css"
import "./ProjectDetails.css"
import{useNavigate} from 'react-router-dom';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectDetails();
  }, []);
  const goBack = () => {
    navigate('/dashboard');
  };

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/projects/${projectId}`);
      setProject(response.data.project);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div className="project-details">
      <h1>{project.title}</h1>
      <p>Summary:</p>
      {project.summary.map((summaryItem, index) => (
        <div className="project-details" key={index}>
          <p>{summaryItem.text}</p>
          <p>{new Date(summaryItem.createdAt).toLocaleDateString()}</p>
          
        </div>
      ))}
      <p>File name: {project.file.name}</p>
      <p>File type: {project.file.type}</p>
      {project.users.map((user, index) => (
        <p key={index}>Members: {user.userID.email}</p> // Display member names
      ))}
      <h2>Files ({project.file.length}):</h2>
      <ul>
      {project.file.map((file, index) => (
        <li key={index}>
          <p>File name: {file.name}</p>
          <p>File type: {file.type}</p>
          <a href={`http://localhost:1337/api/projects/${projectId}/download/${file.name}`}>
            Download {file.name}
          </a>
        </li>
      ))}
    </ul>
      
      <p>Created at: {new Date(project.createdAt).toLocaleString()}</p>
      
      <Link to={`/project/${projectId}/update`}><button type="submit">Update Project</button></Link>
      <button onClick={goBack}>Back to Dashboard</button>

    </div>
  );
};

export default ProjectDetails;
