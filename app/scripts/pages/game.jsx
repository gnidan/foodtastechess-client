import React from 'react';
import Reflux from 'reflux';

import CapturedPieces from '../components/CapturedPieces.jsx';
import GameChessBoard from '../components/GameChessBoard.jsx';
import GameConcede from '../components/GameConcede.jsx';
import GameOfferDraw from '../components/GameOfferDraw.jsx';
import GameSidebar from '../components/GameSidebar.jsx';

import GameActions from '../actions/GameActions';
import GameStore from '../stores/GameStore';

var Game = React.createClass({
  getInitialState: function() {
    return {
      historyMode: false
    };
  },

  componentWillMount: function() {
    GameActions.loadGames();
  },

  render: function() {
    var gameID = this.props.params.id;

    if (this.props.games.loading || ! this.props.games.games[gameID]) {
      return ( <h1>Loading...</h1> );
    }

    var gameInfo = this.props.games.games[gameID].GameInfo;
    console.log(gameInfo);

    return (
      <div className="panel panel-default">

        <div className="panel-heading">
          <strong>FoodTaste Chess v0.0</strong>
        </div>

        <div className="panel-body">

          <div className="col-sm-3">
            <CapturedPieces pieces={gameInfo.BoardState.split(' ')[0].replace(/[\d\/]/g,'')}/>
            <hr />
            <GameOfferDraw />
            <br />
            <GameConcede />
          </div>

          <div className="col-sm-6">
            <GameChessBoard
                fen={ gameInfo.BoardState }
                historyMode={ this.state.historyMode }
            />
          </div>

          <div className="col-sm-3">
            <GameSidebar
                activePlayer={ gameInfo.BoardState.split(' ')[1] === 'w' ? "White" : "Black" }/>
          </div>

        </div>
      </div>
    );
  }
});

export default Game;
