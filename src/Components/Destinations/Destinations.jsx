import { useNavigate } from 'react-router-dom';
import './Destinations.css';

const Destinations = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      name: "Paris, France",
      description: "The City of Light awaits with iconic landmarks, world-class museums, and romantic streets",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame"],
      bestTime: "Apr-Jun, Sep-Oct"
    },
    {
      name: "Tokyo, Japan",
      description: "Experience the perfect blend of ancient traditions and cutting-edge technology",
      image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["Senso-ji Temple", "Shibuya Crossing", "Mount Fuji"],
      bestTime: "Mar-May, Sep-Nov"
    },
    {
      name: "Bali, Indonesia",
      description: "Tropical paradise with stunning beaches, ancient temples, and lush rice terraces",
      image: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["Ubud Rice Terraces", "Tanah Lot", "Seminyak Beach"],
      bestTime: "Apr-Oct"
    },
    {
      name: "New York, USA",
      description: "The city that never sleeps offers endless entertainment, culture, and iconic skylines",
      image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["Statue of Liberty", "Central Park", "Times Square"],
      bestTime: "Apr-Jun, Sep-Nov"
    },
    {
      name: "Dubai, UAE",
      description: "Futuristic city with luxury shopping, ultramodern architecture, and desert adventures",
      image: "https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall"],
      bestTime: "Nov-Mar"
    },
    {
      name: "Rome, Italy",
      description: "Ancient history comes alive in the Eternal City with stunning architecture and cuisine",
      image: "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["Colosseum", "Vatican City", "Trevi Fountain"],
      bestTime: "Apr-Jun, Sep-Oct"
    },
    {
      name: "Santorini, Greece",
      description: "Breathtaking sunsets, white-washed buildings, and crystal-clear Aegean waters",
      image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["Oia Sunset", "Red Beach", "Ancient Akrotiri"],
      bestTime: "Apr-Nov"
    },
    {
      name: "Maldives",
      description: "Tropical paradise with overwater bungalows, pristine beaches, and vibrant coral reefs",
      image: "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["Water Villas", "Snorkeling", "Island Hopping"],
      bestTime: "Nov-Apr"
    },
    {
      name: "Barcelona, Spain",
      description: "Gaudí's masterpieces, Mediterranean beaches, and vibrant Catalan culture",
      image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["Sagrada Familia", "Park Güell", "La Rambla"],
      bestTime: "May-Jun, Sep-Oct"
    }
  ];

  return (
    <div className="destinations-container">
      <nav className="dest-navbar">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          EMWare <span>AI</span>
        </div>
        <div className="nav-buttons">
          <button className="btn home-btn" onClick={() => navigate("/")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Home
          </button>
          <button className="btn plan-btn" onClick={() => navigate("/form")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Plan Trip
          </button>
        </div>
      </nav>

      <div className="dest-content">
        <header className="dest-header">
          <h1 className="dest-title">Popular Destinations</h1>
          <p className="dest-subtitle">Discover amazing places around the world and start planning your next adventure</p>
        </header>

        <div className="destinations-grid">
          {destinations.map((dest, index) => (
            <div key={index} className="dest-card">
              <div className="dest-image-wrapper">
                <img src={dest.image} alt={dest.name} className="dest-image" />
                <div className="dest-overlay">
                  <button className="plan-dest-btn" onClick={() => navigate('/form')}>
                    Plan Trip Here
                  </button>
                </div>
              </div>
              <div className="dest-card-content">
                <h2 className="dest-name">{dest.name}</h2>
                <p className="dest-description">{dest.description}</p>
                <div className="dest-highlights">
                  {dest.highlights.map((highlight, i) => (
                    <span key={i} className="highlight-tag">{highlight}</span>
                  ))}
                </div>
                <div className="dest-best-time">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Best Time: {dest.bestTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
