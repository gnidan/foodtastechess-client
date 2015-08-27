import React from 'react';
import GameNavigation from './GameNavigation.jsx';
import GameStore from '../stores/GameStore';

class GameSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var header, subheader;

    if (!this.props.gameEnded) {
      header = this.props.userActive ? "Your Turn" : "Opponent's turn";
      subheader = this.props.activeColor + " to play";
    }
    else {
      header = capitalizeFirstLetter(this.props.reason);
      subheader = this.props.winner.length > 0 ?
          capitalizeFirstLetter(this.props.winner) + " wins!" :
          "-";
    }

    return (
      <div className="panel panel-info">
        <div className="panel-heading" style={{textAlign: 'center'}}>
          <h3>
            {header}
          </h3>
          <br />
          <strong>
            {subheader}
          </strong>
        </div>
        <div className="panel-body">
          <div className="row-fluid">
            <GameNavigation
                history={ this.props.history } />
          </div>
        </div>
      </div>
    );
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default GameSidebar;
