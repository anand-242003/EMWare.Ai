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
          <p className="footer-tagline">Your personal AI travel concierge.</p>
          <p className="footer-description">
            Discover the world with AI-powered itineraries tailored to your preferences. 
            Plan smarter, travel better.
          </p>
        </div>

        <div className="footer-section">
          <h3>Product</h3>
          <ul>
            <li><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Features</a></li>
            <li><a href="https://emware.ai/pricing" target="_blank" rel="noopener noreferrer">Pricing</a></li>
            <li><a href="/form" onClick={(e) => { e.preventDefault(); navigate('/form'); }}>Trip Planner</a></li>
            <li><a href="https://docs.emware.ai/api" target="_blank" rel="noopener noreferrer">API Access</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="https://emware.ai/about" target="_blank" rel="noopener noreferrer">About Us</a></li>
            <li><a href="https://emware.ai/careers" target="_blank" rel="noopener noreferrer">Careers</a></li>
            <li><a href="https://blog.emware.ai" target="_blank" rel="noopener noreferrer">Blog</a></li>
            <li><a href="mailto:support@emware.ai">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Social</h3>
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
