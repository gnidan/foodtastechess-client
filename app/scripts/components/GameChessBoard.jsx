import React from 'react';
import BoardSquare from './BoardSquare.jsx';
import GameStore from '../stores/GameStore';

class GameChessBoard extends React.Component {
  constructor(props) {
    super(props);
    this.squareClickHandler = this.squareClickHandler.bind(this);
    this.state = {
      fen: GameStore.getGameFEN(),
      history_mode: false,
      active_square: null,
      valid_moves: []
    }
  }

  squareClickHandler(square) {
    if (this.state.active_square === square) {
      this.state.active_square = null;
      return false;
    }
    else if (square in this.state.valid_moves) {
      console.log("Yo, I'd be moving now");
      return false;
    }
    else {
      if (this.state.active_square) {
        this.state.active_square.deactivate();
      }
      this.state.active_square = square;
      return true;
    }
  }

  render_square(pos, piece) {
    var file = pos % 8;
    var rank = Math.floor(pos / 8);
    var black = (rank + file) % 2;
    var position = "abcdefgh"[file] + (8 - rank);
    return (
      <div className="square_wrapper"
           key={position}
           id={position}
           >
        <BoardSquare active={false}
                     pos={position}
                     black={black}
                     piece={piece}
                     clickHandler={this.squareClickHandler}>
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
          squares.push(this.render_square(pos, null));
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
