import React from 'react';

class GameHistory extends React.Component {
  render() {
    return (
      <div className="well" style={{height: '200px',
                                    overflowY: 'scroll'}}>
        <table className="table" style={{marginBottom: '0'}}>
        </table>
      </div>
    );
  }
}

export default GameHistory;
