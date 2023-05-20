import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate,Link } from "react-router-dom";
import './MyAccount.css';

function MyAccount() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const loggedInUserEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/users/${loggedInUserEmail}`);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="account-container">
      {userData ? (
        <>
          <h2 className="account-title">My Account</h2>
          <p className="account-detail">First Name: {userData.firstName}</p>
          <p className="account-detail">Last Name: {userData.lastName}</p>
          <h3 className="account-subtitle">My Projects:</h3>
          <ol>
            {userData.projects.map((project) => (
              <li key={project._id}>
                <Link to={`/project/${project._id}`} className="project-link">{project.title}</Link>
              </li>
            ))}
          </ol>
          <button type="button" onClick={handleBackClick}>Back to Dashboard</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyAccount;
