import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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
    <div className="flex flex-column items-center w-full">
      <div className="flex flex-row">
        <input type="text" value={search} onChange={(event) => {setSearch(event.target.value)}} />
        <button onClick={onSearch}>Search</button>
      </div>
      <div>
        {results.map((project) => (
          <Link key={project.id} to={`/project/${project.id}/`}>
            <div  className="pa2 pv3">
              {project.id}: {project.name}
            </div>
          </Link>
        ))}
      </div>
    </div>

  )
}

export default Dashboard