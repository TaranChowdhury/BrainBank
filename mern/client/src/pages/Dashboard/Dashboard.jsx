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

  const onSearch = async () => {
    // const response = await fetch(`/api/search?q=${search}`)
    const response = await fauxFetch({
      results: [
        {
          id: 1,
          name: 'Salesforce Secret Data'
        },
        {
          id: 2,
          name: 'Salesforce Secret Research'
        },
        {
          id: 3,
          name: 'Salesforce Secret Code'
        },
        {
          id: 4,
          name: 'Salesforce Secrete Secrete Code'
        }
      ]
    })

    const data = await response.json()

    setResults(data.results)
  }

  return (
    <div className="dashboard">
      <div className="search-bar">
        <input className='search-input' type="text" value={search} onChange={(event) => { setSearch(event.target.value) }} />
        <button className='search-button' onClick={onSearch}>Search</button>
      </div>
      <Link to='./Project'>
        <button className='project-button'>Create New Project</button>
      </Link>
      <div classNaem='content-container'>
        <div className="your-projects">
          <h1>Your Projects</h1>
        </div>
        <div className='projects-box'>
          <p> This is the projects box</p>
          {/* user projects loading stuff needed */}
        </div>
        <div className='team'>
          <h1>Team</h1>
        </div>
        <div className='team-icon'>
          <p>Meet your team</p>
          {/* Team Icons pop up */}
        </div>
      </div>
      <div className='search-results'>
        {results.map((project) => (
          <Link key={project.id} to={`/project/${project.id}/`}>
            <div className="search-result">
              {project.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default Dashboard