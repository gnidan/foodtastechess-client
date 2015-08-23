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

  componentDidMount: function() {
    GameActions.loadGames();
  },

  render: function() {
    console.debug(this.props);

    return (
      <div className="panel panel-default">

        <div className="panel-heading">
          <strong>FoodTaste Chess v0.0</strong>
        </div>

        <div className="panel-body">

          <div className="col-sm-3">
            <CapturedPieces />
            <hr />
            <GameOfferDraw />
            <br />
            <GameConcede />
          </div>

          <div className="col-sm-6">
            <GameChessBoard
                fen={ GameStore.getGameFEN() }
                historyMode={ this.state.historyMode }
            />
          </div>

          <div className="col-sm-3">
            <GameSidebar />
          </div>

        </div>
      </div>
    );
  }
});

export default Game;
