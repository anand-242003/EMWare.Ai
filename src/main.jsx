import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Hero from './Components/Hero/Hero';
import Form from './Components/Form/Form';

// 👇 ADD THESE IMPORTS
// import CreateTrip from './Components/Create_trip/index';
import TripDetails from './Components/Trip_details/Trip.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/form" element={<Form />} />
        
        {/* ✅ Register these new pages */}
        {/* <Route path="/create-trip" element={<CreateTrip />} /> */}
        <Route path="/trip-details" element={<TripDetails />} />
      </Routes>
    </Auth0Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
