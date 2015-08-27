import React from 'react';
import {Modal, ButtonGroup, Button} from 'react-bootstrap';

import GameActions from '../actions/GameActions'

class GameOfferDraw extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.offer = this.offer.bind(this);
    this.state = { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  offer() {
      GameActions.offerDraw(this.props.gameID);
      this.close();
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
          Offer Draw
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Offer Draw Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>Are you sure you want to offer your opponent a draw?</h1>
          </Modal.Body>
          <Modal.Footer>
            <Button bsSize='large' bsStyle='danger' onClick={this.offer}>
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

export default GameOfferDraw;
