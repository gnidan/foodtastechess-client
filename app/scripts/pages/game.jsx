import React from 'react';
import GameScreen from '../components/GameScreen.jsx';
import GameNavigation from '../components/GameNavigation.jsx';

class Game extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <strong>FoodTaste Chess v0.0</strong>
        </div>
        <div className="panel-body">
          <div className="col-sm-3">
            <div className="panel panel-default">
              <div className="panel-heading"><strong>Captured Pieces</strong></div>
              <div className="panel-body" style={{height: '200px'}}></div>
            </div>
          </div>

          <div className="col-sm-6">
            <GameScreen />
          </div>

          <div className="col-sm-3">
            <div className="panel panel-info">
              <div className="panel-heading" style={{textAlign: 'center'}}>
                <h4>It is currently your turn.</h4>
              </div>
              <div className="panel-body">
                <div className="row-fluid">
                  <div>
                    <GameNavigation />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Game;
