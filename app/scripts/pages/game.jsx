import React from 'react';

import CapturedPieces from '../components/CapturedPieces.jsx';
import GameChessBoard from '../components/GameChessBoard.jsx';
import GameConcede from '../components/GameConcede.jsx';
import GameOfferDraw from '../components/GameOfferDraw.jsx';
import GameSidebar from '../components/GameSidebar.jsx';

import GameActions from '../actions/GameActions';
import GameStore from '../stores/GameStore';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamestate: ''
    };
  }

  componentDidMount() {
    this.unsubscribe = GameStore.listen(this.onStatusChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStatusChange(state) {
    this.setState(state);
  }

  render() {

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
            <GameChessBoard />
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
