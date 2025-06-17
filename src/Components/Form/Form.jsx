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
        console.log("Google Maps API loaded successfully");

        const autocomplete = new google.maps.places.Autocomplete(autocompleteInputRef.current, {
          types: ["geocode"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          console.log("Raw place object (Autocomplete):", place);
          let selectedDestination = "";
          if (place && place.formatted_address) {
            selectedDestination = place.formatted_address;
          } else if (place && place.name) {
            selectedDestination = place.name;
          }
          setDestination(selectedDestination);
          console.log("Place selected (Autocomplete):", selectedDestination);
        });
      })
      .catch((error) => {
        console.error("Failed to load Google Maps API:", error);
      });
  }, []);

  const handleGeminiSearch = async () => {
    const daysNumber = parseInt(days, 10);
    console.log("Form Submission Attempted. Field Values:", {
      destination,
      days,
      daysNumber,
      budget,
      travelWith,
    });

    if (!destination) console.log("Validation failed: destination is empty");
    if (!days || isNaN(daysNumber)) console.log("Validation failed: days is invalid");
    if (!budget) console.log("Validation failed: budget is empty");
    if (!travelWith) console.log("Validation failed: travelWith is empty");

    if (!destination || !days || isNaN(daysNumber) || !budget || !travelWith) {
      alert("Please fill all fields before generating trip.");
      return;
    }

    console.log("Calling fetchItinerary with:", {
      location: destination,
      totalDays: daysNumber.toString(),
      Traveller: travelWith,
      budget,
    });

    try {
      const response = await fetchItinerary({
        location: destination,
        totalDays: daysNumber.toString(),
        Traveller: travelWith,
        budget: budget,
      });

      console.log("Gemini API Response:", response);
      localStorage.setItem("tripData", JSON.stringify(response));
      navigate("/trip-details", {
        state: {
          tripData: {
            ...response,
            location: destination,
            days,
            budget,
            Traveller: travelWith
          }
        }
      });
          } catch (error) {
      console.error("Failed to fetch from Gemini:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div ref={vantaRef} className="form-page">
      <div className="overlay" />
      <nav className="navbarForm">
        <div className="logo">
          EMWare <span>AI</span>
        </div>
        <div className="nav-buttons">
          <button className="btn my-trips">My Trips</button>
          <button className="btn create-trip">Create Trip</button>
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
              onChange={(e) => {
                setDestination(e.target.value);
                console.log("Destination updated (manual input):", e.target.value);
              }}
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
            onChange={(e) => {
              setDays(e.target.value);
              console.log("Days updated:", e.target.value);
            }}
          />
        </div>

        <div className="input-group">
          <label>What’s your Budget?</label>
          <div className="card-group">
            {["Budget-friendly", "Comfort", "Exclusive"].map((option) => (
              <div
                key={option}
                className={`card ${budget === option ? "selected" : ""}`}
                onClick={() => {
                  setBudget(option);
                  console.log("Budget selected:", option);
                }}
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
                onClick={() => {
                  setTravelWith(option);
                  console.log("Travel With selected:", option);
                }}
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
  );
};

export default Form;