import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Hero from './Components/Hero/Hero';
import Form from './Components/Form/Form';

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
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  // </React.StrictMode>
);
