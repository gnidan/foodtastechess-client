import Reflux from 'reflux';
import GameActions from '../actions/GameActions';

var GameStore = Reflux.createStore({

  init() {

  getGameFEN() {
    return this.fen;
  },
  getActivePlayer() {
    return this.fen.split(' ')[1] === 'w' ? "White" : "Black";
  },
  getAllValidMoves() {
    return this.valid_moves;
  },
  getValidMoves(pos) {
    var valid = [];
    for (var move in this.valid_moves) {
      var to_from = this.valid_moves[move].Move.substr(1).replace('x','-').split('-');
      if (to_from[0] === pos) {
        valid.push(to_from[1]);
      }
      else if (to_from[0] === 'O' && pos[0] === 'e') {
        if (to_from.length === 2) {
          valid.push(this.getActivePlayer() === "White" ? "g1" : "g8");
        }
        else if (to_from.length === 3) {
          valid.push(this.getActivePlayer() === "White" ? "c1" : "c8");
        }
      }
    }
    return valid;
  },
  getGameHistory() {
    return this.history;
  }
});

export default GameStore;
