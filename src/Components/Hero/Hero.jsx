import React, { useState } from 'react';
import Navbar from '../Navigation/Navbar';
import './Hero.css';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import Background from './Background.jsx';




const ratingsData = [
  { name: "Aarav Mehta", stars: 5, feedback: "Amazing and time-saving!", size: 'large' },
  { name: "Sophia Khan", stars: 4, feedback: "Helped me plan my honeymoon easily!", size: 'small' },
  { name: "Rohan Das", stars: 5, feedback: "User-friendly and accurate.", size: 'small' },
  { name: "Emily Verma", stars: 5, feedback: "Loved the personalized suggestions!", size: 'small' },
  { name: "Kabir Roy", stars: 4, feedback: "Could use more features, but great overall.", size: 'large' },
  { name: "Zara Ali", stars: 5, feedback: "This app saved me so much time!", size: 'small' },
];

const Hero = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  console.log("Background:", Background);
  console.log('Navbar:', Navbar);


  return (

    
    <div className="hero-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
    <Background />  
    <Navbar />

      <section className="hero">
        <h1 className="hero-title animate-fade-up delay-0">Plan Your Next Adventure with AI</h1>
        <p className="hero-subtitle animate-fade-up delay-1">Smart, Personalized Itineraries</p>
        <p className="hero-tagline animate-fade-up delay-2">Tailored Just for You</p>
        <button className="hero-btn animate-fade-up delay-3">Start Planning</button>

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

        <div className="ratings-grid">
          {ratingsData.map((user, index) => (
            <div
              key={index}
              className={`rating-card ${user.size} ${hoveredIndex === index ? 'hovered' : ''} animate-in animate-delay-${index}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <p className="user-name">{user.name}</p>
              <p className="stars">{'⭐️'.repeat(user.stars)}</p>
              <p className="feedback">"{user.feedback}"</p>
            </div>
          ))}
        </div>

     
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
