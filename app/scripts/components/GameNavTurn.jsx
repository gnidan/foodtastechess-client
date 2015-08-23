import React from 'react';

class GameNavTurn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      move: props.move.replace('-',''),
      active: props.active
    };
  }

  render() {
    return (
        <td style={{ fontWeight: this.state.active ? "bold" : "normal" }}>
          { this.state.move }
        </td>
    );
  }
}

export default GameNavTurn;
