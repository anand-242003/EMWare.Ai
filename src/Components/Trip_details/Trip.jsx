import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Trip.css";

gsap.registerPlugin(ScrollTrigger);

export default function TripDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const tripData =
    state?.tripData || JSON.parse(localStorage.getItem("tripData"));

  const heroRef = useRef(null);
  const hotelRefs = useRef([]);
  const itineraryRefs = useRef([]);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const handleCancelTrip = () => {
    localStorage.removeItem("tripData");
    alert("Trip cancelled successfully.");
    navigate("/form"); 
  };

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      try {
        const effect = window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          color: 0xbae6fd,
          backgroundColor: 0xe0f2fe,
          shininess: 2,
          waveHeight: 20,
          waveSpeed: 0.9,
          zoom: 1.1,
        });
        setVantaEffect(effect);
      } catch (error) {}
    }

    gsap.fromTo(
      heroRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    hotelRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    itineraryRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => {
      if (vantaEffect) {
        try {
          vantaEffect.destroy();
        } catch (error) {}
      }
    };
  }, [vantaEffect]);

  if (!tripData || !tripData.itinerary || !tripData.hotels) {
    return (
      <section className="travel-plan-error" aria-label="Error message">
        <h2>Error</h2>
        <p>No trip data available. Please try generating a trip again.</p>
      </section>
    );
  }

  const { location: tripLocation = "Unknown Location", days = "Unknown" } =
    tripData;

  return (
    <section
      className="travel-plan-container"
      ref={vantaRef}
      aria-label="Trip Details"
    >
      <header className="travel-plan-hero" ref={heroRef}>
        <h1>
          Your Trip to{" "}
          <span className="travel-plan-location">{tripLocation}</span>
        </h1>
        <p>
          <strong>Duration:</strong> {days} days
          <br />
          <strong>Highlights:</strong> Discover the charm of{" "}
          <em>{tripLocation}</em> — every moment is an adventure waiting to
          unfold!
        </p>
      </header>

      <div className="trip-cancel-wrapper">
        <button className="cancel-trip-button" onClick={handleCancelTrip}>
           Cancel Trip
        </button>
      </div>

      <section className="travel-plan-section" aria-labelledby="hotels-heading">
        <h2 id="hotels-heading">🏨 Hotel Recommendations</h2>
        <div className="travel-plan-hotels">
          {tripData.hotels.map((hotel, i) => (
            <article
              className="travel-plan-hotel-card"
              key={hotel.HotelName || `hotel-${i}`}
              ref={(el) => (hotelRefs.current[i] = el)}
              aria-label={`Hotel: ${hotel.HotelName || "Unknown"}`}
            >
              <h3>{hotel.HotelName || hotel.name || "Unknown Hotel"}</h3>
              <p>{hotel.Address || "Address not available"}</p>
              <p>
                <strong>Price:</strong> {hotel.Price || "N/A"}
              </p>
              <p>
                <strong>Rating:</strong> {hotel.Rating || "N/A"} ★
              </p>
              <p>{hotel.Description || "No description available"}</p>
              {hotel.ImageUrl && (
                <img
                  src={hotel.ImageUrl}
                  alt={`${hotel.HotelName || "Hotel"} view`}
                  className="travel-plan-hotel-image"
                  loading="lazy"
                />
              )}
            </article>
          ))}
        </div>
      </section>

      <section
        className="travel-plan-section"
        aria-labelledby="itinerary-heading"
      >
        <h2 id="itinerary-heading">📍 Itinerary</h2>
        <div className="travel-plan-itinerary">
          {tripData.itinerary.map((day, i) => (
            <article
              className="travel-plan-day-card"
              key={`day-${i}`}
              ref={(el) => (itineraryRefs.current[i] = el)}
              aria-label={`Day ${day.Day || i + 1} Itinerary`}
            >
              <h3>Day {day.Day || i + 1}</h3>
              {day.Activities.map((activity, j) => (
                <div
                  key={`activity-${j}`}
                  className="travel-plan-activity"
                  aria-label={`Activity: ${activity.PlaceName}`}
                >
                  <strong>{activity.PlaceName}</strong>
                  <p>{activity.PlaceDetails}</p>
                  <p>Price: {activity.TicketPricing}</p>
                  <p>Rating: {activity.Rating} ⭑</p>
                  <p>{activity.TravelTime}</p>
                  <p>📍 {activity.GeoCoordinates}</p>
                  {activity.ImageUrl && (
                    <img
                      src={activity.ImageUrl}
                      alt={`${activity.PlaceName} view`}
                      className="travel-plan-activity-image"
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
