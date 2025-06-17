import React, { useState, useRef, useEffect } from "react";
import "./Form.css";

const Form = () => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelWith, setTravelWith] = useState("");

  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  // Vanta.js Globe effect
  useEffect(() => {
  console.log("Ref is", vantaRef.current);
    if (!vantaEffect) {
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

  const handleGeminiSearch = () => {
    alert("🔍 Gemini API call placeholder");
  };

  const handleSubmit = () => {
    alert(`Trip Details:\nDestination: ${destination}\nDays: ${days}\nBudget: ${budget}\nWith: ${travelWith}`);
  };

  return (
    <div ref={vantaRef} className="form-page">
      {/* Overlay for readability */}
      <div className="overlay" />

      {/* ---------- NAVBAR ---------- */}
      <nav className="navbarForm">
        <div className="logo">
          EMWare <span>AI</span>
        </div>
        <div className="nav-buttons">
          <button className="btn my-trips">My Trips</button>
          <button className="btn create-trip">Create Trip</button>
        </div>
      </nav>

      {/* ---------- FORM SECTION ---------- */}
      <div className="form-container">
        <h2 className="header">
          Tell us your Travel Preferences <span className="emoji">🌍 ✈️ 🧳</span>
        </h2>

        <p className="description">
          <strong>Just provide</strong> Your basic InFormation <br />
          and our <strong>Trip planner</strong> will generate customized <strong>Itineraries</strong> based on your <strong>PreFerences</strong>.
        </p>

        <div className="input-group">
          <label>What is the Destination of your Choice?</label>
          <div className="destination-search">
            <input
              type="text"
              placeholder="Search destination..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <button onClick={handleGeminiSearch} className="gemini-button">🔍</button>
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
          <label>Who do add plan on Travelling with on your next adventure?</label>
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
          <button className="submit-button" onClick={handleSubmit}>Generate Trip</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
