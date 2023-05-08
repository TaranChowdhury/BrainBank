import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Dashboard.css"

const fauxFetch = (data) => new Promise((res) => {
  setTimeout(() => {
    res({
      json: () => new Promise(res => {
        res(data)
      })
    })
  }, 1000)
})

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const onSearch = async () => {
    setIsSearchActive(true);
    const response = await fetch(`http://localhost:1337/api/projects?q=${search}`)
    // const response = await fauxFetch({
    //   results: [
    //     {
    //       id: 1,
    //       name: 'Salesforce Secret Data'
    //     },
    //     {
    //       id: 2,
    //       name: 'Salesforce Secret Research'
    //     },
    //     {
    //       id: 3,
    //       name: 'Salesforce Secret Code'
    //     },
    //     {
    //       id: 4,
    //       name: 'Salesforce Secrete Secrete Code'
    //     }
    //   ]
    // })

    const data = await response.json()
    setResults(data.projects)
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
      <Link to='./Project'>
        <button className='project-button'>Create New Project</button>
      </Link>
      <div className='content-container'>
        {!isSearchActive && (
          <>
            <div className="your-projects">
              <h1>Your Projects</h1>
              <div className='projects-box'>
                <p> This is the projects box</p>
                {/* user projects loading stuff needed */}
              </div>
            </div>
            <div className='team'>
              <h1>Team</h1>
              <div className='team-icon'>
                <p>Meet your team</p>
                {/* Team Icons pop up */}
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
    </div >
  )
}
export default Dashboard