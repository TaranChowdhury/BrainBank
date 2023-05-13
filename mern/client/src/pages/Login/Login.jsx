import React, { useState } from "react";
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:1337/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.user) {
        localStorage.setItem('token', data.user)
        alert('Login successful')
        window.location.href = '/dashboard'
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="create-project">
      <h1 className="banner">Login Here</h1>

      <label className="headers">Employee Email</label>
      <form onSubmit={handleSubmit}>
        <input className="entryBoxes"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email"
        />
        <label className="headers">Password</label>
        <input className="entryBoxes"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Password"
        />
        <input className="login-button" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login