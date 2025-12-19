import React, { useState } from 'react';
import './Rating.css'; 

const ratingsData = [
  { name: "Sarah J.", trip: "Japan Trip", stars: 5, feedback: "Absolutely changed how I travel. The itinerary was perfect and matched my vibe exactly. I found hidden gems I would have missed." },
  { name: "Mike C.", trip: "Italy Trip", stars: 5, feedback: "Found hidden gems I never would have discovered on my own. The AI suggestions were spot on for local food spots." },
  { name: "Elena R.", trip: "Bali Trip", stars: 4, feedback: "The visual guides made it so easy to decide where to go. It took the stress out of planning a 2-week honeymoon." },
];


const Ratings = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="ratings-grid">
      {ratingsData.map((user, index) => (
        <div
          key={index}
          className={`rating-card ${hoveredIndex === index ? 'hovered' : ''} animate-in animate-delay-${index}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="rating-header">
            <div className="user-avatar">{user.name.charAt(0)}</div>
            <div className="user-info">
              <p className="user-name">{user.name}</p>
              <p className="user-trip">{user.trip}</p>
            </div>
            <div className="quote-icon">"</div>
          </div>
          <p className="stars">{'★'.repeat(user.stars)}</p>
          <p className="feedback">{user.feedback}</p>
        </div>
      ))}
    </div>
  );
};

export default Ratings;
