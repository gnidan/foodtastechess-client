import React from 'react';
import GameInstance from './GameInstance.jsx';
import NewGameModal from './NewGame.jsx';

class GameList extends React.Component {
  constructor() {
    super();
  }

  games() {
      if (this.props.loading) {
          return "Loading";
      } else {
          return this.props.usergames.map(game =>
                  <GameInstance
                    key={game}
                    game={this.props.games[game]} />
                  );
      }
  }

  render() {

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="page-header">
            <h1>FoodTaste Chess v0.0</h1>
          </div>
          <NewGameModal />
        </div>
        <div className="panel-body">
          <div className="panel-group">
          { this.games() }
          </div>
        </div>
      </div>
    );
  }
}

GameList.propTypes = {
  loading:  React.PropTypes.bool,
  games:    React.PropTypes.array
}

export default GameList;
