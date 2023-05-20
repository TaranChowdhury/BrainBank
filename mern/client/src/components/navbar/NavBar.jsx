import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token ? true : false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setTimeout(() => {
      // Redirect to dashboard after successful project creation
      navigate('/');
    }, 1000);
  };

  return (
    <div className="navbar">
      <Link to='/'>
        <h1 className="mainTitle">BRAIN BANK</h1>
      </Link>
      <div className="background">
        {!isLoggedIn && (
          <Link to='/OurLegacy'>
            <h1 className="redictLinks">Our Legacy</h1>
          </Link>
        )}
        {isLoggedIn ? (
          <>
            <Link to='/MyAccount'>
              <h1 className="redictLinks">My Account</h1>
            </Link>
            <h1 className="redictLinks" onClick={handleLogout}>
              Logout
            </h1>
          </>
        ) : (
          <>
            <Link to='/Login'>
              <h1 className="redictLinks">Login</h1>
            </Link>
            <Link to='/SignUp'>
              <h1 className="redictLinks">Sign Up</h1>
            </Link>
            <Link to='/ContactUs'>
              <h1 className="redictLinks">Contact Us</h1>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;