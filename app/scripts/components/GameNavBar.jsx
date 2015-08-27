import React from 'react';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

class GameNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.fastBackward = this.fastBackward.bind(this);
    this.backward = this.backward.bind(this);
    this.forward = this.forward.bind(this);
    this.fastForward = this.fastForward.bind(this);
  }

  fastBackward() {
    this.props.changeVisibleTurn(-2);
  }

  backward() {
    this.props.changeVisibleTurn(-1);
  }

  forward() {
    this.props.changeVisibleTurn(1);
  }

  fastForward() {
    this.props.changeVisibleTurn(2);
  }

  render() {
    return (
    <div>
      <ButtonGroup justified>
        <ButtonGroup>
          <Button
              bsStyle="info"
              onClick={ this.fastBackward }
              disabled={ this.visibleTurn === 1 }>
            <Glyphicon glyph="fast-backward" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
              bsStyle="info"
              onClick={ this.backward }
              disabled={ this.visibleTurn === 1 }>
            <Glyphicon glyph="backward" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
              bsStyle="info"
              onClick={ this.forward }
              disabled={ this.visibleTurn === this.props.currentTurn }>
            <Glyphicon glyph="forward" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
              bsStyle="info"
              onClick={ this.fastForward }
              disabled={ this.visibleTurn === this.props.currentTurn }>
            <Glyphicon glyph="fast-forward" />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </div>
    );
  }
}

export default GameNavBar;
