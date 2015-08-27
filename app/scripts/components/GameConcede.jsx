import React from 'react';
import {Modal, ButtonGroup, Button} from 'react-bootstrap';

import GameActions from '../actions/GameActions';

class GameConcede extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.concede = this.concede.bind(this);
    this.state = { showModal: false };
  }

  concede() {
      GameActions.concedeGame(this.props.gameID);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    if (this.props.gameStatus !== "started") {
        return this.renderNothing();
    }

    return (
      <div>
        <Button
                bsStyle='warning'
                block
                onClick={this.open}
                bsSize='large'>
          Concede Game
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Concede Game Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>Are you sure you want to concede this game?</h1>
          </Modal.Body>
          <Modal.Footer>
            <Button bsSize='large' bsStyle='danger' onClick={this.concede}>
              <strong>Yes</strong>
            </Button>
            <Button bsSize='large' bsStyle='primary' onClick={this.close}>
              <strong>No</strong>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );

  }

  renderNothing() {
    return (
            <div />
           );
  }
}

export default GameConcede;
