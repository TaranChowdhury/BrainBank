import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const fauxFetch = (data) => new Promise((res) => {
  setTimeout(() => {
    res({ 
      json: () => new Promise(res => {
        res(data)
      }) 
    })
  }, 1000)
})

const Project = () => {
  const { id: projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  
  useEffect(() => {
    let active = true;

    (async () => {
        // const response = await fetch(`/api/project/${projectId}`)
        const response = await fauxFetch({
        project:
            {
            id: 1,
            name: 'This project',
            contributors: [
                {
                    id: 23,
                    name: 'Sharanya Udupa',
                    email: 'sharanyaudupa@gmail.com',
                }
            ],
            documents: [
                {
                    id: 420,
                    name: "My Transcripts",
                    file: '/files/f8g32dg379gd326d8327df823'
                }
            ]
            },
        })

        const data = await response.json()
        
        if (active) {
           setProject(data.project)
           setLoading(false)
        }
    })();

    return () => {
        active = false;
    }
    }, [])


  return (
    <div className="flex flex-column items-center w-full">
      {loading ? <div>Loading...</div>: <div className="flex flex-row">
        {JSON.stringify(project)}
      </div>}
    </div>

  )
}

export default Project