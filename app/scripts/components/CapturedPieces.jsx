import React from 'react';
import GameStore from '../stores/GameStore';

class CapturedPieces extends React.Component {
  constructor() {
    super();
    this.state = {
      pieces: GameStore.getGameFEN().split(' ')[0].replace(/[\d\/]/g,'')
    };
  }

  capturedPieces(pieces) {
    var captures = '';
    for (var p in pieces) {
      var p_rgx = new RegExp(p, 'g');
      var missing = pieces[p].n - (this.state.pieces.length - this.state.pieces.replace(p_rgx,'').length);
      captures += Array(missing + 1).join(pieces[p].ch);
    }
    return captures;
  }

  render() {
    var w_pieces = {
      Q: {ch: '\u2655 ', n: 1},
      R: {ch: '\u2656 ', n: 2},
      B: {ch: '\u2657 ', n: 2},
      N: {ch: '\u2658 ', n: 2},
      P: {ch: '\u2659 ', n: 8}
    };
    var b_pieces = {
      q: {ch: '\u265B ', n: 1},
      r: {ch: '\u265C ', n: 2},
      b: {ch: '\u265D ', n: 2},
      n: {ch: '\u265E ', n: 2},
      p: {ch: '\u265F ', n: 8}
    };

    return (
      <div className="panel panel-default">
        <div className="panel-heading"><strong>Captured Pieces</strong></div>
        <div className="panel-body" style={{height: '300px',
                                            fontSize: 'x-large'}}>
        { this.capturedPieces(w_pieces) }
        { this.state.pieces.length === 32 ? '' : <hr /> }
        { this.capturedPieces(b_pieces) }
        </div>
      </div>
    );
  }
}

export default CapturedPieces;
