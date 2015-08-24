import React from 'react';
import BoardSquare from './BoardSquare.jsx';
import GameStore from '../stores/GameStore';
import _ from 'underscore';

class GameChessBoard extends React.Component {
  constructor(props) {
    super(props);
    this.squareClickHandler = this.squareClickHandler.bind(this);
    this.state = {
      activeSquare: null,
      validMoves: []
    }
  }

  squareClickHandler(square) {
    if (this.state.activeSquare === square) {
      this.setState({
          activeSquare: null,
          validMoves: []
      });
    }
    else if (_.contains(this.state.validMoves, square)) {
      this.setState({
          activeSquare: null,
          validMoves: []
      });
      console.log("Yo, I'd be moving now");
    }
    else {
      var validMoves = [];
      for (var m in this.props.validMoves) {
        var to_from = this.props.validMoves[m].Move.substr(1).split('-');
        if (to_from[0] === square ) {
          validMoves.push(to_from[1]);
        }
      }
      this.setState({
        activeSquare: square,
        validMoves: validMoves
      });
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
           id={position}>
        <BoardSquare active={ position === this.state.activeSquare }
                     pos={position}
                     black={black}
                     piece={piece}
                     validMove={ _.contains(this.state.validMoves, position) }
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
        fen_rows = this.props.fen.split(' ')[0].split('/');

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
