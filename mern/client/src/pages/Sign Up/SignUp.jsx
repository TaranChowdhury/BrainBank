import React, {useState } from "react";

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
    <div>
      <h1>SignUp</h1>
      <form onSubmit = {registerUser}>
        <input 
        value={first}
        onChange={(e) => setFirst(e.target.value)}
        type = "text"
        placeholder = "First Name"
        />
      <br />
       <input 
        value={last}
        onChange={(e) => setLast(e.target.value)}
        type = "text"
        placeholder = "Last Name"
        />
        <br />
        <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type = "email"
        placeholder = "Email"
        />
        <br />
        <input 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type = "password"
        placeholder = "Password"
        />
        <input type = "submit" value = "Register"/>

      </form>
    </div>
   
   
  );
}

export default SignUp