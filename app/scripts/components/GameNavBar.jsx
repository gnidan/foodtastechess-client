import React from 'react';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

class GameNavBar extends React.Component {
  render() {
    return (
    <div>
      <ButtonGroup justified>
        <ButtonGroup>
          <Button bsStyle="info">
            <Glyphicon glyph="fast-backward" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button bsStyle="info">
            <Glyphicon glyph="backward" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button bsStyle="info">
            <Glyphicon glyph="forward" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button bsStyle="info">
            <Glyphicon glyph="fast-forward" />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </div>
    );
  }
}

export default GameNavBar;
