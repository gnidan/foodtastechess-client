import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore';

import CapturedPieces from '../components/CapturedPieces.jsx';
import GameChessBoard from '../components/GameChessBoard.jsx';
import GameConcede from '../components/GameConcede.jsx';
import GameOfferDraw from '../components/GameOfferDraw.jsx';
import GameSidebar from '../components/GameSidebar.jsx';

import LobbyActions from '../actions/LobbyActions';
import GameActions from '../actions/GameActions';
import GameStore from '../stores/GameStore';

var Game = React.createClass({
  getInitialState: function() {
    return {
      visibleTurn: null
    };
  },

  componentWillMount: function() {
    LobbyActions.checkLogin();
    var gameID = this.props.params.id;
    GameActions.loadGame(gameID);
  },

  componentDidMount: function() {
    this.loaderInterval = setInterval(_.bind(function() {
      GameActions.loadGame(this.props.params.id);
    }, this), 5000);
  },

  componentWillUnmount: function() {
    clearInterval(this.loaderInterval);
  },

  componentDidUpdate: function() {
    if (this.props.games.gameHistories[this.gameID()] &&
            this.state.visibleTurn === null) {
        this.setState({ visibleTurn: this.currentTurn() });
    }
  },

  // turn 0 - START
  // turn 1 - after move_1
  // turn 2 - after move_2
  // ...
  // turn n - after move_n
  currentTurn: function() {
    return this.props.games.gameHistories[this.gameID()].length - 1;
  },

  changeVisibleTurn: function(n) {
    var visibleTurn;

    if (this.state.visibleTurn === null) {
        visibleTurn = this.currentTurn();
    } else {
        visibleTurn = this.state.visibleTurn;
    }

    switch (n) {
      case -2:
        this.setState({ visibleTurn: 0 });
        break;
      case -1:
        var prevTurn = visibleTurn > 0 ?
                visibleTurn - 1 :
                0;
        this.setState({ visibleTurn: prevTurn })
        break;
      case 1:
        var nextTurn = visibleTurn < this.currentTurn() ?
                visibleTurn + 1 :
                this.currentTurn();
        this.setState({ visibleTurn: nextTurn })
        break;
      case 2:
        this.setState({ visibleTurn: this.currentTurn() });
        break;
      default: break;
    }
  },

  boardStateAtVisibleTurn: function() {
    if (!this.tracking()) {
      return this.gameInfo().BoardState;
    }

    return this.gameHistory()[this.state.visibleTurn].ResultingBoardState;
  },

  gameID: function() {
    return this.props.params.id;
  },

  gameInfo: function() {
    return this.props.games.games[this.gameID()].GameInfo;
  },

  gameHistory: function() {
    return this.props.games.gameHistories[this.gameID()];
  },

  validMoves: function() {
    return this.props.games.gameValidMoves[this.gameID()];
  },

  userActive: function() {
    return this.props.games.games[this.gameID()].UserActive;
  },

  drawOfferToUser: function() {
    return this.props.games.games[this.gameID()].DrawOfferToUser;
  },

  tracking: function() {
    return this.state.visibleTurn !== null &&
        this.state.visibleTurn !== this.currentTurn();
  },

  render: function() {
    var gameID = this.gameID();

    if (! this.props.games.games[gameID]
        || ! this.props.games.gameHistories[gameID]
        || ! this.props.games.gameValidMoves[gameID]) {
      return ( <h1>Loading...</h1> );
    }

    var gameInfo = this.gameInfo();
    var gameValidMoves = this.validMoves();
    var userActive = this.userActive();
    var drawOfferToUser = this.drawOfferToUser();

    var sidebarOpts = {
        gameID: gameID,
        history: this.gameHistory(),
        activeColor: gameInfo.BoardState.split(' ')[1] === 'w' ? "White" : "Black",
        userActive: userActive,
        drawOfferToUser: drawOfferToUser,
        visibleTurn: this.state.visibleTurn,
        tracking: this.tracking(),
        changeVisibleTurn: this.changeVisibleTurn
    }

    if (gameInfo.GameStatus == "ended") {
        sidebarOpts.gameEnded = true;
        sidebarOpts.reason = gameInfo.GameEndReason;
        sidebarOpts.winner = gameInfo.Winner;
    }

    return (
      <div className="panel panel-default">

        <div className="panel-heading">
          <strong>FoodTaste Chess v1.0</strong>
        </div>

        <div className="panel-body">
          <div className="col-sm-3">
            <div className="well">
                <dl>
                    <dt>White</dt>
                    <dd>
                        <img src={gameInfo.White.AvatarUrl} width={50} height={50} />
                        <br />
                        {gameInfo.White.Name}
                    </dd>
                    <dt>Black</dt>
                    <dd>
                        <img src={gameInfo.Black.AvatarUrl} width={50} height={50} />
                        <br />
                        {gameInfo.Black.Name}
                    </dd>
                </dl>
            </div>
            <CapturedPieces pieces={gameInfo.BoardState.split(' ')[0].replace(/[\d\/]/g,'')}/>
            <hr />
            <GameOfferDraw gameID={ gameID } gameStatus={ gameInfo.GameStatus } drawOfferState={ gameInfo.DrawOfferState } />
            <br />
            <GameConcede gameID={ gameID } gameStatus={ gameInfo.GameStatus } />
          </div>

          <div className="col-sm-6">
            <GameChessBoard
                gameID={ gameID }
                validMoves= { gameValidMoves }
                fen={ this.boardStateAtVisibleTurn() }
                tracking={ this.tracking() }
                userActive={ userActive }
            />
          </div>

          <div className="col-sm-3">
            <GameSidebar {...sidebarOpts} />
          </div>

        </div>
      </div>
    );
  }
});

export default Game;
