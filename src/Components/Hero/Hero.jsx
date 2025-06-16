import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; 

import Navbar from '../Navigation/Navbar';
import './Hero.css';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaXTwitter, FaGithub } from "react-icons/fa6";
import Background from './Background.jsx';
import Ratings from '../Ratings/Rating.jsx';

const Hero = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleStartPlanning = () => {
    if (isAuthenticated) {
      navigate('/planner'); // Navigate to the planner page
    } else {
      alert('Please login to start planning your trip!');
      loginWithRedirect(); // Optional: Redirect to login
    }
  };

  return (
    <div className="hero-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
      <Background />
      <Navbar />

      <section className="hero">
        <h1 className="hero-title animate-fade-up delay-0">Plan Your Next Adventure with AI</h1>
        <p className="hero-subtitle animate-fade-up delay-1">Smart, Personalized Itineraries</p>
        <p className="hero-tagline animate-fade-up delay-2">Tailored Just for You</p>
        
        <button className="hero-btn animate-fade-up delay-3" onClick={handleStartPlanning}>
          Start Planning
        </button>

        <div className="video-placeholder animate-fade-up delay-4">
          <p>🎬 Project video will appear here</p>
        </div>

        <div className="map-line animate-fade-up delay-5">
          <h3>Your itinerary and your map in one view</h3>
          <p>No more switching between different apps, tabs, and tools to keep track of your travel plans.</p>
        </div>

        <h2 className="join-line animate-fade-up delay-6">
          Join over half a million travelers on their journey to easy trip planning
        </h2>

    
          <Ratings />

       

        <div className="logo-footer animate-fade-up delay-7">
          <div className="logo-box">EMWare <span>AI</span></div>
          <div className="socials">
            <FcGoogle className="google" title="Google" />
            <FaFacebook className="facebook" title="Facebook" />
            <FaXTwitter className="x" title="X" />
            <FaGithub className="github" title="GitHub" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
