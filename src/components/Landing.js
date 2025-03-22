import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
      <h1>Welcome to Free Fire Tournament</h1>
      <p>Join the ultimate Free Fire battle! Compete with players worldwide, win exclusive rewards, and climb the leaderboards.</p>
      <div className="tournament-details">
        <h2>Tournament Details</h2>
        <ul>
          <li>Date: April 15, 2025</li>
          <li>Prize Pool: 10,000 Diamonds</li>
          <li>Mode: Battle Royale</li>
          <li>Registration Deadline: April 10, 2025</li>
        </ul>
      </div>
      <div className="auth-buttons">
        <Link to="/signup"><button>Register</button></Link>
        <Link to="/login"><button>Login</button></Link>
      </div>
    </div>
  );
}

export default Landing;