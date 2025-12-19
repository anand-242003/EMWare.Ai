import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Trip.css";

gsap.registerPlugin(ScrollTrigger);

export default function TripDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const tripData = state?.tripData || JSON.parse(localStorage.getItem("tripData"));
  const heroRef = useRef(null);
  const hotelRefs = useRef([]);
  const [showAllHotels, setShowAllHotels] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleCancelTrip = () => {
    localStorage.removeItem("tripData");
    navigate("/form");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
    }
    
    hotelRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: i * 0.15, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } });
      }
    });
  }, [showAllHotels]);

  if (!tripData || !tripData.itinerary || !tripData.hotels) {
    return (
      <section className="trip-error">
        <h2>Error</h2>
        <p>No trip data available. Please try generating a trip again.</p>
      </section>
    );
  }

  const { location: tripLocation = "Unknown Location", days = "Unknown", startDate, endDate } = tripData;
  const displayedHotels = showAllHotels ? tripData.hotels : tripData.hotels.slice(0, 3);

  return (
    <div className="trip-container">
      <div className="trip-content">
        <header className="trip-header" ref={heroRef}>
          <div className="trip-header-content">
            <div className="trip-header-left">
              <p className="trip-badge">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                UPCOMING TRIP
              </p>
              <h1 className="trip-title">Trip to <span className="trip-location">{tripLocation}</span></h1>
              <div className="trip-meta">
                <span className="trip-meta-item">
                  <svg className="trip-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : 'Oct 12 - Oct 20'}
                </span>
                <span className="trip-meta-item">
                  <svg className="trip-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {days} Days
                </span>
              </div>
            </div>
            <button className="cancel-btn" onClick={handleCancelTrip}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Cancel Trip
            </button>
          </div>
        </header>
        <section className="hotels-section">
          <div className="section-header">
            <h2 className="section-title">
              <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              Hotel Recommendations
            </h2>
            {tripData.hotels.length > 3 && (
              <button className="view-all-btn" onClick={() => setShowAllHotels(!showAllHotels)}>
                {showAllHotels ? 'Show Less' : 'View All'}
                <svg className="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            )}
          </div>
          <div className="hotels-grid">
            {displayedHotels.map((hotel, i) => (
              <article key={hotel.HotelName || `hotel-${i}`} ref={(el) => (hotelRefs.current[i] = el)} className="hotel-card" onClick={() => setSelectedHotel(hotel)}>
                {hotel.ImageUrl && (
                  <div className="hotel-image-wrapper">
                    <img src={hotel.ImageUrl} alt={hotel.HotelName || "Hotel"} className="hotel-image" />
                    <div className="hotel-price-badge">{hotel.Price || "N/A"}</div>
                  </div>
                )}
                <div className="hotel-content">
                  <div className="hotel-rating">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} className="star-icon" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                    <span>{hotel.Rating || "N/A"}</span>
                  </div>
                  <div className="hotel-header">
                    <h3 className="hotel-name">{hotel.HotelName || hotel.name || "Unknown Hotel"}</h3>
                  </div>
                  <p className="hotel-address">
                    <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {hotel.Address || "Address not available"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="itinerary-section">
          <h2 className="section-title">
            <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            Daily Itinerary
          </h2>
          <div className="itinerary-list">
            {tripData.itinerary.map((day, i) => (
              <article key={`day-${i}`} className="day-card">
                <div className="day-badge">Day {day.Day || i + 1}: Arrival & Culture</div>
                <div className="activities-list">
                  {day.Activities.map((activity, j) => (
                    <div key={`activity-${j}`} className="activity-card">
                      <div className="activity-time">
                        <div className="time-label">09:00 AM</div>
                        <div className="time-subtitle">Crowd level: Low</div>
                      </div>
                      <div className="activity-connector">
                        <div className="connector-dot"></div>
                      </div>
                      <div className="activity-content">
                        {activity.ImageUrl && (
                          <div className="activity-image-wrapper">
                            <img src={activity.ImageUrl} alt={activity.PlaceName} className="activity-image" />
                          </div>
                        )}
                        <div className="activity-details">
                          <h4 className="activity-name">{activity.PlaceName}</h4>
                          <div className="activity-info">
                            <span className="activity-info-item">
                              <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              {activity.TravelTime}
                            </span>
                            <span className="activity-info-item">
                              <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              {activity.TicketPricing}
                            </span>
                          </div>
                          <p className="activity-description">{activity.PlaceDetails}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <footer className="trip-footer">
          <p>© 2024 EMWare.AI Intelligent Travel Planning</p>
          <div className="footer-links">
            <a href="#" onClick={(e) => { e.preventDefault(); }}>Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); }}>Terms of Service</a>
          </div>
        </footer>
      </div>

      {selectedHotel && (
        <div className="hotel-modal-overlay" onClick={() => setSelectedHotel(null)}>
          <div className="hotel-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedHotel(null)}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {selectedHotel.ImageUrl && (
              <div className="modal-image-wrapper">
                <img src={selectedHotel.ImageUrl} alt={selectedHotel.HotelName} className="modal-image" />
                <div className="modal-price-badge">{selectedHotel.Price || "N/A"}</div>
              </div>
            )}
            <div className="modal-content">
              <div className="modal-rating">
                {[...Array(5)].map((_, idx) => (
                  <svg key={idx} className="star-icon" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
                <span>{selectedHotel.Rating || "N/A"}</span>
              </div>
              <h2 className="modal-hotel-name">{selectedHotel.HotelName || selectedHotel.name || "Unknown Hotel"}</h2>
              <p className="modal-address">
                <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {selectedHotel.Address || "Address not available"}
              </p>
              <p className="modal-description">{selectedHotel.Description || "No description available"}</p>
              <div className="modal-actions">
                <button className="book-btn">Book Now</button>
                <button className="details-btn">View Details</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
