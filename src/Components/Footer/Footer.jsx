import './Footer.css';
import { FaXTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <h2>EMWare<span>.AI</span></h2>
          </div>
          <p className="footer-tagline">Your AI-powered travel companion</p>
          <p className="footer-description">
            Discover the world with personalized itineraries tailored to your preferences. 
            Plan smarter, travel better with AI.
          </p>
        </div>

        <div className="footer-section">
          <h3>Travel Planner</h3>
          <ul>
            <li><a href="/how-it-works" onClick={(e) => { e.preventDefault(); navigate('/how-it-works'); }}>How It Works</a></li>
            <li><a href="/destinations" onClick={(e) => { e.preventDefault(); navigate('/destinations'); }}>Destinations</a></li>
            <li><a href="/form" onClick={(e) => { e.preventDefault(); navigate('/form'); }}>Plan Your Trip</a></li>
            <li><a href="/blog" onClick={(e) => { e.preventDefault(); navigate('/blog'); }}>Travel Guides</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><a href="/blog" onClick={(e) => { e.preventDefault(); navigate('/blog'); }}>Travel Blog</a></li>
            <li><a href="/destinations" onClick={(e) => { e.preventDefault(); navigate('/destinations'); }}>Trip Ideas</a></li>
            <li><a href="/blog" onClick={(e) => { e.preventDefault(); navigate('/blog'); }}>Travel Tips</a></li>
            <li><a href="mailto:support@emware.ai">Contact Support</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-socials">
            <a href="https://x.com/emwareai" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="https://instagram.com/emware.ai" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/company/emware-ai" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://github.com/emware-ai" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
          <p className="footer-tagline" style={{ marginTop: '1.5rem' }}>Plan smarter, travel better with AI</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2025 EMWare.AI. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://emware.ai/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <a href="https://emware.ai/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            <a href="https://emware.ai/cookies" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
