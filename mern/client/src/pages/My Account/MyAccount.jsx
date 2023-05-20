import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyAccount() {
  const [userData, setUserData] = useState(null);

  const loggedInUserEmail = localStorage.getItem('userEmail');
  // Replace this with the actual logged-in user's email or ID

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

  return (
    <div>
      {userData ? (
        <>
          <h2>My Account</h2>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <h3>My Projects:</h3>
          {userData.projects.map((project) => (
            <p key={project._id}>{project.title}</p>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyAccount;
