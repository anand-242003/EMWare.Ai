import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; 
import Navbar from '../Navigation/Navbar.jsx';
import './Hero.css';
import Ratings from '../Ratings/Rating.jsx';

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleStartPlanning = () => {
    if (isAuthenticated) {
      navigate('/form'); 
    } else {
      alert('Please login to start planning your trip!');
      loginWithRedirect(); 
    }
  };
  
  return (
    <div className="hero-wrapper">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <div className="ai-badge">
              <span className="badge-icon"></span>
              AI-POWERED TRAVEL
            </div>
            
            <h1 className="hero-title">
              Travel Smarter<br/>
              <span className="highlight">with AI</span>
            </h1>
            
            <p className="hero-subtitle">
              Generate personalized itineraries, hotel picks, and visual guides in seconds. Stop planning, start experiencing.
            </p>

            <div className="hero-search">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input 
                type="text" 
                placeholder="Plan a 3-day trip to Tokyo..." 
                readOnly
                onClick={handleStartPlanning}
              />
              <button className="search-btn" onClick={handleStartPlanning}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="hero-cta">
              <button className="hero-btn-primary" onClick={handleStartPlanning}>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 16V7C20 5.89543 19.1046 5 18 5H4C2.89543 5 2 5.89543 2 7V16M20 16L22 19M20 16H4M4 16L2 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Start Planning Free
              </button>
              <button className="hero-btn-secondary">
                <svg className="play-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
                </svg>
                Watch Demo
              </button>
            </div>
          </div>

          <div className="hero-right">
            <div className="floating-card trip-preview-card">
              <div className="trip-card-header">
                <div className="trip-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#5fb962" strokeWidth="2"/>
                    <line x1="3" y1="9" x2="21" y2="9" stroke="#5fb962" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="#5fb962" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="#5fb962" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="trip-info">
                  <span className="trip-title">Tokyo Trip</span>
                  <span className="trip-subtitle">3 Days • Solo</span>
                </div>
                <span className="trip-badge">Active</span>
              </div>
              
              <div className="trip-timeline">
                <div className="timeline-item">
                  <div className="timeline-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1548013146-72479768bada?w=100&h=100&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div className="timeline-content">
                    <span className="time">09:00 AM - Senso-ji Temple</span>
                    <span className="description">Historic Buddhist temple...</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div className="timeline-content">
                    <span className="time">12:30 PM - Sushi Dai</span>
                    <span className="description">Famous sushi breakfast spot...</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div className="timeline-content">
                    <span className="time">03:00 PM - Tokyo Tower</span>
                    <span className="description">Iconic landmark with city views...</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=100&h=100&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div className="timeline-content">
                    <span className="time">06:00 PM - Shibuya Crossing</span>
                    <span className="description">World's busiest intersection...</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-card rating-badge">
              <div className="rating-number">4.9</div>
              <div className="rating-stars">★★★★★</div>
              <div className="rating-text">Based on 10,000+ generated trips</div>
              <div className="rating-avatars">
                <img src="https://i.pravatar.cc/150?img=1" alt="User" className="avatar-img" />
                <img src="https://i.pravatar.cc/150?img=12" alt="User" className="avatar-img" />
                <img src="https://i.pravatar.cc/150?img=13" alt="User" className="avatar-img" />
                <div className="avatar-more">+2k</div>
              </div>
            </div>
          </div>
        </div>

        <div className="testimonials-section">
          <h2 className="section-title">Loved by Travelers Worldwide</h2>
          <div className="section-underline"></div>
          
          <Ratings />
        </div>
      </section>
    </div>
  );
};

export default Hero;
