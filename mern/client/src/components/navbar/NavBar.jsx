import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css"

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to='/'><h1 className="mainTitle">BRAIN BANK</h1></Link>
      <div className="background"> 
        <Link to='/OurLegacy'><h1 className="redictLinks">Our Legacy</h1></Link>
        <Link to='/Login'><h1 className="redictLinks">Login</h1></Link>
        <Link to='/SignUp'><h1 className="redictLinks">Sign Up</h1></Link>
        <Link to='/ContactUs'><h1 className="redictLinks">Contact Us</h1></Link>
        
      </div>     
       
    </div>
  )
}

export default NavBar