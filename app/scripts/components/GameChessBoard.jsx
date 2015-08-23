import React from 'react';
import BoardSquare from './BoardSquare.jsx';

class GameChessBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    }
  }

  render_square(pos, piece) {
    var file = pos % 8;
    var rank = Math.floor(pos / 8);
    var black = (rank + file) % 2;
    var position = "ABCDEFGH"[file] + (8 - rank);
    return (
      <div key={position} id={position} className="square_wrapper">
        <BoardSquare black={black} piece={piece}>
        </BoardSquare>
      </div>
    );
  }

  render_row(fen, row_num) {
    var squares = [];
    var pos = row_num * 8;

    for (var i = 0; i < fen.length; i++) {
      if (isNaN(fen[i])) {
        squares.push(this.render_square(pos, fen[i]));
        pos++;
      }
      else {
        var blank = parseInt(fen[i]);
        for (var j = 0; j < blank; j++, pos++) {
          squares.push(this.render_square(pos, '-'));
        }
      }
    }

    return squares;
  }

  squares() {
    var squares = [],
        fen_rows = this.state.fen.split(' ')[0].split('/');

    for (var row = 0; row < fen_rows.length; row += 1) {
      squares.push(this.render_row(fen_rows[row], row));
    }

    return squares;
 }

  render() {
    return (
        <div className="chessboard">
          {this.squares()}
        </div>
      )
  }
}

export default GameChessBoard;
