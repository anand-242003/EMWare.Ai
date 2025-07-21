import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; 

import Navbar from '../Navigation/Navbar.jsx';
import './Hero.css';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaXTwitter, FaGithub } from "react-icons/fa6";
import Ratings from '../Ratings/Rating.jsx';
import { Player } from '@lottiefiles/react-lottie-player';

const Hero = () => {
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

  // Initialize Vanta.js
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
      color1: 0xff6600,
      color2: 0x000000,
      birdSize: 1.5,
      wingSpan: 20.00,
      speedLimit: 4.00,
      separation: 50.00,
      alignment: 50.00,
      cohesion: 50.00,
      quantity: 4.00
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

        {/* Lottie Animation */}
        <div className="lottie-wrapper animate-fade-up delay-4">
        <Player
        autoplay
        loop
        src="https://lottie.host/000c38d4-d859-494b-9291-42721f5579c2/lApjEh7fuv.json"
        style={{
          height: '550px',
          marginTop: '15px', 
          width: '1280px',
          backgroundColor: 'transparent',
          padding: '20px',
          zIndex:10,
        }}
      />
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
