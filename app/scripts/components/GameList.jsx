import React from 'react';
import GameInstance from './GameInstance.jsx';

class GameList extends React.Component {
  game_list_json() {

  }

  game_objects() {
    var games = [];
    for (var i = 0; i < 10; i++) {
      games.push(React.createElement(GameInstance));
    }
    return (
      <div className="panel-group">
        {games}
      </div>
    )
  }

  render() {

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="page-header">
            <h1>FoodTaste Chess v0.1</h1>
          </div>
          <button type="button" className="btn btn-primary btn-block btn-lg">New Game</button>
        </div>
        <div className="panel-body">
          {this.game_objects()}
        </div>
      </div>
    );
  }
}

export default GameList;
