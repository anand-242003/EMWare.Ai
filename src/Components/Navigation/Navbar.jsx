import React from 'react';
import './Navbar.css';
import { useState } from 'react';

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  
  return (
    <nav className="navbar">
      <div className="logo">EMWare <span>AI</span></div>
      <div className="nav-buttons">
        <button className="btn login">Login</button>
        <button className="btn signup">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
