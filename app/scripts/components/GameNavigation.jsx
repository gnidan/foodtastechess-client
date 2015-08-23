import React from 'react';
import GameHistory from './GameHistory.jsx';
import GameNavBar from './GameNavBar.jsx';
import GameStore from '../stores/GameStore';

class GameNavigation extends React.Component {
  render() {
    return (
      <div>
        <GameNavBar />
        <GameHistory history={ GameStore.getGameHistory() }/>
      </div>
    );
  }
}

export default GameNavigation;
