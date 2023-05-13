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
      <label className="headers">First Name</label>
      <form onSubmit = {registerUser}>
        <input className="entryBoxes"
        value={first}
        onChange={(e) => setFirst(e.target.value)}
        type = "text"
        placeholder = "First Name"
        />
      <br />
      <label className="headers">Last Name</label>
       <input className="entryBoxes"
        value={last}
        onChange={(e) => setLast(e.target.value)}
        type = "text"
        placeholder = "Last Name"
        />
        <br />
        <label className="headers">Employee Email</label>
        <input className="entryBoxes"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type = "email"
        placeholder = "Email"
        />
        <br />
        <label className="headers">Password</label>
        <input className="entryBoxes"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type = "password"
        placeholder = "Password"
        />
        <input className="signup-button" type = "submit" value = "Register"/>

      </form>
    </div>
   
   
  );
  
}

export default SignUp