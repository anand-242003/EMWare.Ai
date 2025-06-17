// // Content/Create_trip/index.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchItinerary } from '../../utils/gemini';
// // import { SelectBudgetOptions } from '../Contant/option';
// // import { SelectionTravelList } from '../Contant/option';
// import { Loader } from "@googlemaps/js-api-loader";

// export default function CreateTrip() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const autocompleteInputRef = useRef(null);

//   const [formData, setFormData] = useState({
//     location: '',
//     noOfDays: '',
//     Budget: '',
//     TravelWith: '',
//   });

//   useEffect(() => {
//     const loader = new Loader({
//       apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//       version: "weekly",
//       libraries: ["places"],
//       loading: "async",
//     });

//     loader
//       .load()
//       .then(() => {
//         console.log("Google Maps API loaded successfully");

//         const autocomplete = new google.maps.places.Autocomplete(autocompleteInputRef.current, {
//           types: ["geocode"],
//         });

//         autocomplete.addListener("place_changed", () => {
//           const place = autocomplete.getPlace();
//           console.log("Raw place object (Autocomplete):", place);
//           let selectedLocation = "";
//           if (place && place.formatted_address) {
//             selectedLocation = place.formatted_address;
//           } else if (place && place.name) {
//             selectedLocation = place.name;
//           }
//           handleChange('location', selectedLocation);
//           console.log("Place selected (Autocomplete):", selectedLocation);
//         });
//       })
//       .catch((error) => {
//         console.error("Failed to load Google Maps API:", error);
//       });
//   }, []);

//   const handleChange = (key, value) => {
//     setFormData((prev) => {
//       const newData = { ...prev, [key]: value };
//       console.log("Form Data Updated:", newData);
//       return newData;
//     });
//   };

//   const handleSubmit = async () => {
//     const { location, noOfDays, Budget, TravelWith } = formData;
  
//     if (!location || !noOfDays || !Budget || !TravelWith) {
//       alert('Please fill all fields');
//       return;
//     }
  
//     setLoading(true);
//     try {
//       const data = await fetchItinerary({
//         location,
//         totalDays: noOfDays,
//         Traveller: TravelWith,
//         budget: Budget,
//       });
  
//       if (!data || !data.itinerary || !data.hotels) {
//         throw new Error("Invalid response format from Gemini API: missing itinerary or hotels");
//       }
  
//       // Inject form data into tripData
//       const fullTripData = {
//         ...data,
//         location,
//         days: noOfDays,
//         Traveller: TravelWith,
//         budget: Budget,
//       };
  
//       navigate('/trip-details', { state: { tripData: fullTripData } });
//     } catch (error) {
//       console.error("Failed to generate trip:", error.message);
//       alert(`Failed to generate trip: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="trip-form">
//       <h2>Plan Your Trip</h2>

//       <input
//         ref={autocompleteInputRef}
//         type="text"
//         placeholder="Enter Location (e.g. Paris)"
//         value={formData.location}
//         onChange={(e) => handleChange('location', e.target.value)}
//       />

//       <input
//         type="number"
//         placeholder="Number of Days"
//         value={formData.noOfDays}
//         onChange={(e) => handleChange('noOfDays', e.target.value)}
//       />

//       <h4>Select Budget</h4>
//       <div className="options">
//         {SelectBudgetOptions.map((item) => (
//           <button
//             key={item.id}
//             className={formData.Budget === item.title ? 'active' : ''}
//             onClick={() => handleChange('Budget', item.title)}
//           >
//             {item.icon} {item.title}
//           </button>
//         ))}
//       </div>

//       <h4>Who’s Coming?</h4>
//       <div className="options">
//         {SelectionTravelList.map((item) => (
//           <button
//             key={item.id}
//             className={formData.TravelWith === item.people ? 'active' : ''}
//             onClick={() => handleChange('TravelWith', item.people)}
//           >
//             {item.icon} {item.title}
//           </button>
//         ))}
//       </div>

//       <button onClick={handleSubmit} disabled={loading}>
//         {loading ? 'Generating Trip...' : 'Generate Trip'}
//       </button>
//     </div>
//   );
// }