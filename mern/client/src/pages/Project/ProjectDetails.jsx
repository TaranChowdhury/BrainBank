import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Project.css"
import "./ProjectDetails.css"
import { useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { userId } = useParams(); // Add this line
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [members, setMembers] = useState('');
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetchProjectDetails();
    fetchTeam();
  }, [userId]);

  const goBack = () => {
    navigate('/dashboard');
  };
  const handleUpdateClick = () => {
    navigate(`/project/${projectId}/update`, { state: { prevPath: `/project/${projectId}` } });
  };

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/projects/${projectId}?userId=${userId}`);

      setProject(response.data.project);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/user/${userId}/projects`);
      const data = await response.json();
      const project = data.projects.find((project) => project._id === projectId);

      if (!project) {
        // Handle case when project is not found
        console.log("Project not found");
        return;
      }

      // Extract the team members from the project
      const teamMembers = project.users.map((user) => user.userID.User_Info);
      setTeam(teamMembers);
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
      <h3>Summary:</h3>
      {project.summary.map((summaryItem, index) => (
        <div className="SummaryDetails" key={index}>
          <p>{summaryItem.text}</p>
          <p>{new Date(summaryItem.createdAt).toLocaleDateString()}</p>

        </div>
      ))}
        <h3 className='MemberLabel'>Members:</h3>
        {team.map((member) =>
          <div className='MemberName' key={member._id}>{member.first} {member.last}</div>
        )}
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

      <button type="submit" onClick={handleUpdateClick}>Update Project</button>
      <button onClick={goBack}>Back to Dashboard</button>

    </div>
  );
};

export default ProjectDetails;
