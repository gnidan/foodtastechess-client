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
      showTurn: null
    };
  },

  componentWillMount: function() {
    var gameID = this.props.params.id;
    GameActions.loadGame(gameID);
  },

  render: function() {
    var gameID = this.props.params.id;

    if (this.props.games.loading
        || ! this.props.games.games[gameID]
        || ! this.props.games.gameHistories[gameID]
        || ! this.props.games.gameValidMoves[gameID]) {
      return ( <h1>Loading...</h1> );
    }

    var gameInfo = this.props.games.games[gameID].GameInfo;
    var gameHistory = this.props.games.gameHistories[gameID];
    var gameValidMoves = this.props.games.gameValidMoves[gameID];

      console.log(this.state.showTurn);
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
                gameID={ gameID }
                validMoves= { gameValidMoves }
                fen={ gameInfo.BoardState }
                history={ gameHistory }
                historyMode={ this.state.historyMode }
            />
          </div>

          <div className="col-sm-3">
            <GameSidebar
                history={ gameHistory }
                activeColor={ gameInfo.BoardState.split(' ')[1] === 'w' ? "White" : "Black" }/>
          </div>

        </div>
      </div>
    );
  }
});

export default Game;
