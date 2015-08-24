import React from 'react';
import GameStore from '../stores/GameStore';

class BoardSquare extends React.Component {
  constructor(props) {
    this.clickHandler = this.clickHandler.bind(this);
    super(props);
  }

  render_piece() {
    var img = '../../images/';

    switch (this.props.piece) {
      // White Pieces
      case 'K': img += 'wK.svg'; break;
      case 'Q': img += 'wQ.svg'; break;
      case 'R': img += 'wR.svg'; break;
      case 'B': img += 'wB.svg'; break;
      case 'N': img += 'wN.svg'; break;
      case 'P': img += 'wP.svg'; break;
      // Black Pieces
      case 'k': img += 'bK.svg'; break;
      case 'q': img += 'bQ.svg'; break;
      case 'r': img += 'bR.svg'; break;
      case 'b': img += 'bB.svg'; break;
      case 'n': img += 'bN.svg'; break;
      case 'p': img += 'bP.svg'; break;

      default: return ''; break;
    }

    return (
            <img style={{maxHeight: "100%",
                        maxWidth: "100%"}}
                 src={img} />
           );
  }

  clickHandler() {
    this.props.clickHandler(this.props.pos);
  }

  border() {
    if (this.props.active) {
      return "3px solid red";
    }
    else if (this.props.validMove) {
      return "2px solid orange";
    }
    else {
      return '0';
    }
  }

  render() {
    return (
      <div style={{backgroundColor: this.props.black ? "#2b5005" : "#f1f1f1",
                   border: this.border() }}
           onClick={this.clickHandler}
           className="boardsquare"
           key={this.props.pos}>
        <div className="square_align">
          <div className="inner_square">
            { this.render_piece() }
          </div>
        </div>
      </div>
    );
  }
}

export default BoardSquare;
