import React, { useState } from 'react';
import './Rating.css'; 

const ratingsData = [
  { name: "Kaustubh Kallu", stars: 5, feedback: "Amazing and time-saving!", size: 'large' },
  { name: "Ajeesh Khan", stars: 4, feedback: "Helped me plan my honeymoon easily!", size: 'small' },
  { name: "Suryansh Singh Modi", stars: 5, feedback: "User-friendly and accurate.", size: 'small' },
  { name: "Mallu Verma", stars: 5, feedback: "Loved the personalized suggestions!", size: 'small' },
  { name: "Omved Yadav", stars: 4, feedback: "Could use more features, but great overall.", size: 'large' },
  { name: "Anant Ali", stars: 5, feedback: "This app saved me so much time!", size: 'small' },
];

const Ratings = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
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
  );
};

export default Ratings;
