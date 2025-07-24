import React from 'react';
import './Navbar.css';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();


  return (
    <nav className="navbar">
      <div className="logo">
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
