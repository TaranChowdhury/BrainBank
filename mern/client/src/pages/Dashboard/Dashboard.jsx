import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "./Dashboard.css";


const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);

  // User ID should be fetched from your auth system
  const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const token = localStorage.getItem('token'); // Replace this line with the correct way to get the token in your app

  //     const response = await fetch('http://localhost:1337/api/user', {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });

  //     const data = await response.json();
  //     setUserId(data.user.email);
  //   };

  //   fetchUserData();
  // }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(`http://localhost:1337/api/user/${userId}/projects`);
      const data = await response.json();
      setProjects(data.projects);
    }

    // const fetchTeam = async () => {
    //   const response = await fetch(`http://localhost:1337/api/user/${userId}/team`);
    //   const data = await response.json();
    //   setTeam(data.team);
    // }

    fetchProjects();
    // fetchTeam();
  }, [userId]);

  const onSearch = async () => {
    setIsSearchActive(true);
    const response = await fetch(`http://localhost:1337/api/projects?q=${search}`);
    const data = await response.json();
    setResults(data.projects);
  }

  const handleBackClick = () => {
    setIsSearchActive(false);
  }

  return (
    <div className="dashboard">
      <div className="search-bar">
        <input className='search-input' type="text" value={search} onChange={(event) => { setSearch(event.target.value) }} />
        <button className='search-button' onClick={onSearch} >Search</button>
      </div>


      <Link to='/project/create'>
        <button className='project-button'>Create New Project</button>
      </Link>

      <div className='content-container'>
        {!isSearchActive && (
          <>
            <div className="your-projects">
              <h1>Your Projects</h1>
              <div className='projects-box'>
                {projects.map((project) => (
                  <Link key={project._id} to={`/project/${project._id}/`} onMouseEnter={() => {
                    setTeam(project.users.map(({
                      _id,
                      userID: { User_Info }
                    }) => ({ _id, ...User_Info })))
                  }}>
                    <div>{project.title}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className='team'>
              <h1>Team</h1>
              <div className='team-icon'>
                {team.map((member) => 
                    <div key={member._id}>{member.first} {member.last}</div>
                  )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className='content-container-2'>
        {isSearchActive && (
          <>
            <div className='back'>
              <button className='back-button' onClick={handleBackClick}>Back</button>
            </div>

            <div className='search-results'>
              <p>These are the search results:</p>
              {results.map((project) => (
                <Link key={project._id} to={`/project/${project._id}/`}>
                  <div className="search-result">
                    {project.title}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
