import React from 'react';

class GameNavTurn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <td style={{ fontWeight: this.props.active ? "bold" : "normal" }}>
          { this.props.move[0] === '0' ? this.props.move : this.props.move.replace('-','') }
        </td>
    );
  }
}

export default GameNavTurn;
