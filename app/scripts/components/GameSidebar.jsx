import React from 'react';
import GameNavigation from './GameNavigation.jsx';
import GameStore from '../stores/GameStore';

class GameSidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      active_player: GameStore.getActivePlayer()
    };
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading" style={{textAlign: 'center'}}>
          <h3>
            { this.state.active_player } to play
          </h3>
        </div>
        <div className="panel-body">
          <div className="row-fluid">
            <GameNavigation />
          </div>
        </div>
      </div>
    );
  }
}

export default GameSidebar;
