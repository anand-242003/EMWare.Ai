import React, { useState, useRef, useEffect } from "react";
import "./Form.css";
import { fetchItinerary } from "../../utils/gemini";
import { useNavigate } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";

const Form = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelWith, setTravelWith] = useState("");
  const [loading, setLoading] = useState(false);
  const [autocompleteLoaded, setAutocompleteLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const autocompleteInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const calculateEndDate = (start, numDays) => {
    if (!start || !numDays) return "";
    const startDateObj = new Date(start);
    const endDateObj = new Date(startDateObj);
    endDateObj.setDate(startDateObj.getDate() + parseInt(numDays) - 1);
    return endDateObj.toISOString().split('T')[0];
  };

  useEffect(() => {
    const initAutocomplete = async () => {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          version: "weekly",
          libraries: ["places"],
        });

        await loader.load();
        
        if (autocompleteInputRef.current && window.google) {
          autocompleteRef.current = new window.google.maps.places.Autocomplete(
            autocompleteInputRef.current,
            { 
              types: ["(regions)"],
              fields: ["formatted_address", "name", "geometry", "place_id"]
            }
          );

          autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current.getPlace();
            if (place && place.formatted_address) {
              setDestination(place.formatted_address);
            } else if (place && place.name) {
              setDestination(place.name);
            }
          });
          
          setAutocompleteLoaded(true);
        }
      } catch (error) {
        setAutocompleteLoaded(true);
      }
    };

    initAutocomplete();

    return () => {
      if (autocompleteRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setDestination("");
    setStartDate("");
    setDays("");
    setBudget("");
    setTravelWith("");
    setErrors({});
  }, []);

  const handleGeminiSearch = async () => {
    const newErrors = {};
    const daysNumber = parseInt(days, 10);

    if (!destination) {
      newErrors.destination = "Please select a destination";
    }

    if (!startDate) {
      newErrors.startDate = "Please select a start date";
    } else {
      const selectedDate = new Date(startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.startDate = "Start date cannot be in the past";
      }
    }

    if (!days) {
      newErrors.days = "Please enter number of days";
    } else if (isNaN(daysNumber) || daysNumber < 1 || daysNumber > 30) {
      newErrors.days = "Please enter a valid number between 1 and 30";
    }

    if (!budget) {
      newErrors.budget = "Please select your budget";
    }

    if (!travelWith) {
      newErrors.travelWith = "Please select who you're traveling with";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const endDate = calculateEndDate(startDate, daysNumber);
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
          startDate,
          endDate,
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
            startDate,
            endDate,
            days,
            budget,
            Traveller: travelWith,
          },
        },
      });
      
      setDestination("");
      setStartDate("");
      setDays("");
      setBudget("");
      setTravelWith("");
    } catch (error) {
      setErrors({ submit: error.message || "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="spinner" />
          <p>Generating your personalized trip...</p>
        </div>
      )}

      <div className="form-page">
        <nav className="navbarForm">
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
            {localStorage.getItem("tripData") && (
              <button className="btn my-trips" onClick={() => navigate("/trip-details")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 16V7C20 5.89543 19.1046 5 18 5H4C2.89543 5 2 5.89543 2 7V16M20 16L22 19M20 16H4M4 16L2 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                My Trips
              </button>
            )}
          </div>
        </nav>

        <div className="form-container">
          <h2 className="header">
            Tell us your Travel Preferences
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
                type="text"
                placeholder={autocompleteLoaded ? "Search destination..." : "Loading location search..."}
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  if (errors.destination) setErrors({...errors, destination: null});
                }}
                disabled={!autocompleteLoaded}
                className={errors.destination ? "input-error" : ""}
              />
              <button onClick={handleGeminiSearch} className="gemini-button" type="button">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            {errors.destination && <p className="error-message">{errors.destination}</p>}
            {!autocompleteLoaded && !errors.destination && (
              <p className="info-message">Loading Google Places...</p>
            )}
          </div>

          <div className="input-group">
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (errors.startDate) setErrors({...errors, startDate: null});
              }}
              min={getTodayDate()}
              className={errors.startDate ? "input-error" : ""}
            />
            {errors.startDate && <p className="error-message">{errors.startDate}</p>}
          </div>

          <div className="input-group">
            <label>How many days are you planning your trip?</label>
            <input
              type="number"
              placeholder="Enter number of days (1-30)"
              value={days}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 30)) {
                  setDays(value);
                  if (errors.days) setErrors({...errors, days: null});
                }
              }}
              min="1"
              max="30"
              className={errors.days ? "input-error" : ""}
            />
            {errors.days && <p className="error-message">{errors.days}</p>}
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
