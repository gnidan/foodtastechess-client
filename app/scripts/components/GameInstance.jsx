import React from 'react';
import { Button } from 'react-bootstrap';

class GameInstance extends React.Component {
  render() {
    if (this.props.game.GameInfo.GameStatus == "created") {
        return this.renderWaiting();
    } else {
        return this.renderStarted();
    }
  }


  renderWaiting() {
    return (
            <Button block bsStyle="warning">
                Waiting for Opponent
            </Button>
           );
  }

  renderStarted() {
    var status_text;
    if (this.props.game.UserActive) {
        status_text = "Your Turn";
    } else {
        status_text = "Not Your Turn";
    }
    return (
            <Button block>
                {status_text}
            </Button>
           );
  }
}


export default GameInstance;
