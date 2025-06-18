import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; 

import Navbar from '../Navigation/Navbar.jsx';
import './Hero.css';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaXTwitter, FaGithub } from "react-icons/fa6";
import Ratings from '../Ratings/Rating.jsx';

const Hero = () => {
  console.log(import.meta.env.VITE_AUTH0_DOMAIN);
  console.log(import.meta.env.VITE_AUTH0_CLIENT_ID);
  console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  console.log(import.meta.env.VITE_GEMINI_API_KEY);
  // const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const vantaRef = useRef(null);

  const handleStartPlanning = () => {
    
    if (isAuthenticated) {
      navigate('/form'); 
    } else {
      alert('Please login to start planning your trip!');
      loginWithRedirect(); 
    }
  };

  // Initialize Vanta.js NET effect
  useEffect(() => {
    const vantaEffect = window.VANTA.BIRDS({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      backgroundColor: 0xffffff,
      color1: 0xff6600,     // Optional: Primary bird color
      color2: 0x000000,     // Optional: Secondary color
      birdSize: 1.5,        // You can tweak this
      wingSpan: 20.00,
      speedLimit: 4.00,
      separation: 50.00,
      alignment: 50.00,
      cohesion: 50.00,
      quantity: 4.00        // Number of birds
    });
  
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);
  
  return (
    <div className="hero-wrapper" style={{ position: 'relative', overflow: 'hidden' }} ref={vantaRef}>
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