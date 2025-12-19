import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './Components/Hero/Hero';
import Form from './Components/Form/Form';
import TripDetails from './Components/Trip_details/Trip.jsx';
import Footer from './Components/Footer/Footer.jsx';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary.jsx';
import { validateEnvironment } from './utils/validateEnv.js';
import './index.css';

validateEnvironment();

const Layout = ({ children }) => (
  <>
    {children}
    <Footer />
  </>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: `${window.location.origin}/`,
          }}
          cacheLocation="localstorage"
        >
          <Routes>
            <Route path="/" element={<Layout><Hero /></Layout>} />
            <Route path="/form" element={<Layout><Form /></Layout>} />
            <Route path="/trip-details" element={<Layout><TripDetails /></Layout>} />
          </Routes>
        </Auth0Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
