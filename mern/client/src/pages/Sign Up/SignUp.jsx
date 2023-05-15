import React, {useState } from "react";
import "./SignUp.css"



const SignUp = () => {
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function registerUser(event){
    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers:{
      'Content-Type': 'application/json' 
      },  
      body: JSON.stringify({
          first,
          last,
          email,
          password,
        }),

      })
      const data = await response.json()
      if (data.status === 'ok') {
        alert('Registration successful')
        window.location.href = '/Login'
        
      }else{
        alert('Duplicate Entry')
      }
      
  }
  return (
    <div className="create-project">
      <h1 className="banner">Sign Up Here</h1>
      <form onSubmit={registerUser} style={{
        width: '100%',
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row'
        }}
        className="mb2">
          <div style={{
            flex: 1
          }}
            className="mr2"
          >
            <label className="signup-header">First Name</label>
            <input 
              style={{
                width: '100%'
              }}
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              type="text"
              placeholder="First Name"
            />
          </div>
          <div style={{
            flex: 1
          }}>
            <label className="signup-header">Last Name</label>
            <input 
              style={{
                width: '100%'
              }}
              value={last}
              onChange={(e) => setLast(e.target.value)}
              type="text"
              placeholder = "Last Name"
            />
        </div>
        </div>
        <div className="mb2 w-100">
          <label className="signup-header">Employee Email</label>
          <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type = "email"
            placeholder = "Email"
            className="w-100"
          />
        </div>
        <div className="mb3 w-100">
          <label className="signup-header">Password</label>
          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type = "password"
            placeholder="Password"
            className="w-100"
            />
        </div>
        <input className="signup-button" type = "submit" value = "Register"/>
      </form>
    </div>
   
   
  );
  
}

export default SignUp