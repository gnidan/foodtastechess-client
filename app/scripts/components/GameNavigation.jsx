import React from 'react';
import GameHistory from './GameHistory.jsx';
import GameNavBar from './GameNavBar.jsx';

class GameNavigation extends React.Component {
  render() {
    return (
      <div>
        <GameNavBar />
        <GameHistory />
      </div>
    );
  }
}

export default GameNavigation;
