import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css"

const NavBar = () => {
  return (
    <div className="navbar">
      <h1 className="mainTitle"><Link to='/Home'>BRAIN BANK</Link></h1>
      <div className="background"> 
        <h1 className="redictLinks"><Link to='/OurLegacy'>Our Legacy</Link></h1>
        <h1 className="redictLinks"><Link to='/Login'>Login</Link></h1>
        <h1 className="redictLinks"><Link to='/SignUp'>Sign Up</Link></h1>
        <h1 className="redictLinks"><Link to='/ContactUs'>Contact Us</Link></h1>
        
      </div>     
       
    </div>
  )
}

export default NavBar