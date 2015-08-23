import React from 'react';
import GameInstance from './GameInstance.jsx';
import NewGameModal from './NewGame.jsx';

class GameList extends React.Component {
  constructor() {
    super();
  }

  loading() {
    return this.props.loading ? <div className="loading-label">Loading...</div> : '';
  }

  games() {
      if (this.props.usergames) {
          return this.props.usergames.map(game =>
                  <GameInstance
                    key={game}
                    game={this.props.games[game]} />
                  );
      } else {
          return "You don't have any active games!";
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
          { this.loading() }
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
