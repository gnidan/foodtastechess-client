import React from 'react';
import GameNavTurn from './GameNavTurn.jsx';
import GameStore from '../stores/GameStore';

class GameHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      history: GameStore.getGameHistory()
    };
  }

  historyTable() {
    if (this.state.history.length <= 1) {
      return '';
    }
    var table = [];
    var i;
    for (i = 1; i < this.state.history.length - 1; i += 2) {
      var row = (
          <tr key={(i + 1) / 2}>
            <td>
              {(i + 1) / 2}.
            </td>
            < GameNavTurn move={ this.state.history[i].Move } />
            < GameNavTurn move={ this.state.history[i + 1].Move } />
          </tr>
          );
      table.push(row);
    }
    if (i === this.state.history.length - 1) {
      var row = (
          <tr key={(i + 1) / 2}>
            <td>
              {(i + 1) / 2}.
            </td>
            < GameNavTurn move={ this.state.history[i].Move } />
            < GameNavTurn move='' />
          </tr>
          );
      table.push(row);
    }
    return table;
  }

  render() {
    return (
      <div className="well" style={{height: '200px',
                                    overflowY: 'scroll'}}>
        <table className="table" style={{marginBottom: '0',
                                         fontSize: 'small'}}>
          { this.historyTable() }
        </table>
      </div>
    );
  }
}

export default GameHistory;
