import React from 'react';
import BoardSquare from './BoardSquare.jsx';

class GameScreen extends React.Component {
  render_square(pos) {
    var file = pos % 8;
    var rank = Math.floor(pos / 8);
    var black = (rank + file) % 2;
    return (
      <div key={pos} className="square_wrapper">
        <BoardSquare black={black}>
        </BoardSquare>
      </div>
    );
  }

  render() {
    var squares = [];
    for (var i = 0; i < 64; i++) {
      squares.push(this.render_square(i));
    }
    return (
        <div className="chessboard">
          {squares}
        </div>
      )
  }
}

export default GameScreen;
