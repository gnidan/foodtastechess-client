import React from 'react';
import CapturedPieces from '../components/CapturedPieces.jsx';
import GameScreen from '../components/GameScreen.jsx';
import GameSidebar from '../components/GameSidebar.jsx';

class Game extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <strong>FoodTaste Chess v0.0</strong>
        </div>
        <div className="panel-body">
          <div className="col-sm-3">
            <CapturedPieces />
          </div>

          <div className="col-sm-6">
            <GameScreen />
          </div>

          <div className="col-sm-3">
            <GameSidebar />
          </div>

        </div>
      </div>
    );
  }
}

export default Game;
