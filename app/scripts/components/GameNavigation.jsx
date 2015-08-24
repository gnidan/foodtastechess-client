import React from 'react';
import GameHistory from './GameHistory.jsx';
import GameNavBar from './GameNavBar.jsx';
import GameStore from '../stores/GameStore';

class GameNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <GameHistory history={ this.props.history }/>
      </div>
    );
  }
}

export default GameNavigation;
