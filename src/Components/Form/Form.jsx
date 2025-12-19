import React, { useState, useRef, useEffect } from "react";
import "./Form.css";
import { fetchItinerary } from "../../utils/gemini";
import { useNavigate } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";
const Form = () => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelWith, setTravelWith] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const autocompleteInputRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect && window.VANTA) {
      setVantaEffect(
        window.VANTA.GLOBE({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          minHeight: 150.0,
          minWidth: 150.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xff6600,
          color2: 0x1a1a1a,
          backgroundColor: 0xf6f6f6,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"],
      loading: "async",
    });

    loader
      .load()
      .then(() => {
        const autocomplete = new google.maps.places.Autocomplete(
          autocompleteInputRef.current,
          { types: ["geocode"] }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          let selectedDestination = "";
          if (place?.formatted_address) {
            selectedDestination = place.formatted_address;
          } else if (place?.name) {
            selectedDestination = place.name;
          }
          setDestination(selectedDestination);
        });
      })
      .catch(() => {});
  }, []);

  const handleGeminiSearch = async () => {
    const daysNumber = parseInt(days, 10);

    if (!destination || !days || isNaN(daysNumber) || !budget || !travelWith) {
      alert("Please fill all fields before generating trip.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetchItinerary({
        location: destination,
        totalDays: daysNumber.toString(),
        Traveller: travelWith,
        budget: budget,
      });

      if (!response) {
        throw new Error("Failed to generate itinerary. Please try again.");
      }

      localStorage.setItem(
        "tripData",
        JSON.stringify({
          ...response,
          location: destination,
          days,
          budget,
          Traveller: travelWith,
        })
      );
            navigate("/trip-details", {
        state: {
          tripData: {
            ...response,
            location: destination,
            days,
            budget,
            Traveller: travelWith,
          },
        },
      });
    } catch (error) {
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="spinner" />
          <p>Generating your personalized trip... ✨</p>
        </div>
      )}

      <div ref={vantaRef} className="form-page">
        <div className="overlay" />
        <nav className="navbarForm">
          <div className="logo">
            EMWare <span>AI</span>
          </div>
          <div className="nav-buttons">
          <button className="btn my-trips" onClick={() => navigate("/trip-details")}>
  My Trips
</button>
          </div>
        </nav>

        <div className="form-container">
          <h2 className="header">
            Tell us your Travel Preferences <span className="emoji">🌍 ✈️ 🧳</span>
          </h2>
          <p className="description">
            <strong>Just provide</strong> Your basic Information <br />
            and our <strong>Trip planner</strong> will generate customized{" "}
            <strong>Itineraries</strong> based on your <strong>Preferences</strong>.
          </p>

          <div className="input-group">
            <label>What is the Destination of your Choice?</label>
            <div className="destination-search">
              <input
                ref={autocompleteInputRef}
                placeholder="Search destination..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <button onClick={handleGeminiSearch} className="gemini-button">
                🔍
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>How many days are you planning your trip?</label>
            <input
              type="number"
              placeholder="Enter number of days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>What’s your Budget?</label>
            <div className="card-group">
              {["Budget-friendly", "Comfort", "Exclusive"].map((option) => (
                <div
                  key={option}
                  className={`card ${budget === option ? "selected" : ""}`}
                  onClick={() => setBudget(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>Who do you plan on Travelling with?</label>
            <div className="card-group">
              {["Friends", "Family", "Couple", "Solo"].map((option) => (
                <div
                  key={option}
                  className={`card ${travelWith === option ? "selected" : ""}`}
                  onClick={() => setTravelWith(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className="submit-section">
            <button className="submit-button" onClick={handleGeminiSearch}>
              Generate Trip
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
