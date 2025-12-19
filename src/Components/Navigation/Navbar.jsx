import React from 'react';
import './Navbar.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        EMWare <span>AI</span>
      </div>

      <div className="nav-buttons">
        {!isAuthenticated ? (
          <>
            <button className="btn login" onClick={() => loginWithRedirect()}>
              Login
            </button>
            <button
              className="btn signup"
              onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <span className="welcome-text">Hi, {user?.given_name || user?.name}!</span>
            <button
              className="btn logout"
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  },
                })
              }
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
