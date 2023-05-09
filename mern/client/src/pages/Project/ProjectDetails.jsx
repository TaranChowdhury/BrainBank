import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
      <p>Summary: {project.summary}</p>
      <p>File name: {project.file.name}</p>
      <p>File type: {project.file.type}</p>
      <p>Created at: {new Date(project.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default ProjectDetails;
