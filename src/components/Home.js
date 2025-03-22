import React from 'react';

function Home() {
  return (
    <div className="home-page">
      <h1>Game Selection</h1>
      <p>Welcome to the Free Fire Tournament platform! Choose your game mode:</p>
      <div className="game-options">
        <button>Battle Royale</button>
        <button>Clash Squad</button>
        <button>Custom Match</button>
      </div>
    </div>
  );
}

export default Home;