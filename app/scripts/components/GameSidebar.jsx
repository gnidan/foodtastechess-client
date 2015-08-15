import React from 'react';
import GameNavigation from './GameNavigation.jsx';

class GameSidebar extends React.Component {
  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading" style={{textAlign: 'center'}}>
          <h4>It is currently your turn.</h4>
        </div>
        <div className="panel-body">
          <div className="row-fluid">
            <GameNavigation />
          </div>
        </div>
      </div>
    );
  }
}

export default GameSidebar;
