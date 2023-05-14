import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetails();
  }, []);

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
    <div>
      <h1>{project.title}</h1>
      <p>Summary:</p>
      {project.summary.map((summaryItem, index) => (
        <div key={index}>
          <p>{summaryItem.text}</p>
          <p>{new Date(summaryItem.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
      <p>File name: {project.file.name}</p>
      <p>File type: {project.file.type}</p>
      {project.users.map((user, index) => (
        <p key={index}>Members: {user.userID.email}</p> // Display member names
      ))}
      
      <p>Created at: {new Date(project.createdAt).toLocaleString()}</p>
      <a href={`http://localhost:1337/api/projects/${projectId}/download`}>Download File</a>
      <Link to={`/project/${projectId}/update`}>Update Project</Link>
    </div>
  );
};

export default ProjectDetails;
