import React from 'react';
import { Button } from 'react-bootstrap';

class GameInstance extends React.Component {
  render() {
    var status = "panel";
    var status_text = null;

    if (this.props.game) {
        if (this.props.game.GameInfo.GameStatus == "created") {
            status += " panel-warning";
            status_text = "Waiting for Opponent";
        } else {
            if (this.props.game.UserActive) {
                status += " panel-success";
                status_text = "Your Turn";
            } else {
                status_text = "Not Your Turn";
            }
        }
    }

    return (
      <Button block>
        {status_text}
      </Button>
    );
  }
}


export default GameInstance;
