import React from 'react';
import _ from 'underscore';
import BoardSquare from './BoardSquare.jsx';
import PawnPromotion from './PawnPromotion.jsx';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

class GameChessBoard extends React.Component {
  constructor(props) {
    super(props);
    this.closePawnPromotion = this.closePawnPromotion.bind(this);
    this.handlePawnPromotion = this.handlePawnPromotion.bind(this);
    this.showPawnPromotion = this.showPawnPromotion.bind(this);
    this.squareClickHandler = this.squareClickHandler.bind(this);
    this.splitMove = this.splitMove.bind(this);
    this.state = {
      showPawnPromotion: false,
      activeSquare: null,
      promotionMove: '',
      validMoves: []
    }
  }

  splitMove(move_index) {
    var move = this.props.validMoves[move_index].Move.split('.')[0];
    var split = move[0] === '0' ? move.split('-') : move.substr(1).replace('x','-').split('-');
    split[1] = split[1].replace(/[#S+]$/, '');
    if (split[0] === '0') {
      var color = this.props.fen.split(' ')[1];
      if (split.length === 2) {
        return color === 'w' ? ['e1','g1'] : ['e8','g8'];
      }
      else {
        return color === 'w' ? ['e1','c1'] : ['e8','c8'];
      }
    }
    else {
      return split;
    }
  }

  closePawnPromotion() {
    this.setState({ showPawnPromotion: false });
  }

  handlePawnPromotion(piece) {
    var promotionMove = this.state.promotionMove + piece;
    this.closePawnPromotion();

    if (promotionMove !== this.state.promotionMove) {
      for (var m in this.props.validMoves) {
          var validMove = this.props.validMoves[m].Move;
          if (promotionMove == validMove.substr(0, 8)) {
              GameActions.makeMove(this.props.gameID, validMove);
              return
          }
      }
    }
  }

  showPawnPromotion(move) {
    this.setState({
      promotionMove: move,
      showPawnPromotion: true
    });
  }

  squareClickHandler(square) {
    if (! this.props.userActive || this.props.tracking) {
      return;
    }
    if (this.state.activeSquare === square) {
      this.setState({
          activeSquare: null,
          validMoves: []
      });
    }
    else if (_.contains(this.state.validMoves, square)) {
      var move = '';
      for (var m in this.props.validMoves) {
        var split = this.splitMove(m);
        if (split[0] === this.state.activeSquare
            && split[1].substr(0,2) === square) {
          move = this.props.validMoves[m].Move;
        }
      }
      if (move[6] === '=') {
        this.showPawnPromotion(move.substr(0, 7));
      }
      else {
        GameActions.makeMove(this.props.gameID, move);
      }
      this.setState({
          activeSquare: null,
          validMoves: []
      });
    }
    else {
      var validMoves = [];
      for (var m in this.props.validMoves) {
        var to_from = this.splitMove(m);
        if (to_from[0] === square ) {
          validMoves.push(to_from[1].substr(0,2));
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
        <BoardSquare active={ this.props.tracking?
                                false :
                                position === this.state.activeSquare }
                     pos={position}
                     black={black}
                     piece={piece}
                     validMove={ this.props.tracking ?
                                   false :
                                   _.contains(this.state.validMoves, position) }
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
          <PawnPromotion
              show={ this.state.showPawnPromotion }
              activeColor={ this.props.fen.split(' ')[1] }
              close={ this.closePawnPromotion }
              handlePawnPromotion={ this.handlePawnPromotion }/>

          {this.squares()}
        </div>
      )
  }
}

export default GameChessBoard;
