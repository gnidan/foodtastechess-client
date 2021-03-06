import React from 'react';
import GameHistory from './GameHistory.jsx';
import GameNavBar from './GameNavBar.jsx';
import GameStore from '../stores/GameStore';

class GameNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <GameNavBar
            visibleTurn={ this.props.visibleTurn }
            changeVisibleTurn={ this.props.changeVisibleTurn }
            currentTurn={ this.props.history.length }/>
        <GameHistory history={ this.props.history } visibleTurn={ this.props.visibleTurn } />
      </div>
    );
  }
}

export default GameNavigation;
