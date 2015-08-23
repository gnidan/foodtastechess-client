import React from 'react';
import GameNavigation from './GameNavigation.jsx';
import GameStore from '../stores/GameStore';

class GameSidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      fen: GameStore.getGameFEN()
    };
  }

  activePlayer() {
    var active = this.state.fen.split(' ')[1];
    return active === 'w' ? "White to play" : "Black to play";
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading" style={{textAlign: 'center'}}>
          <h3>
            { this.activePlayer() }
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
