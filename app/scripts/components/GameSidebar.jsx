import React from 'react';
import GameNavigation from './GameNavigation.jsx';
import GameStore from '../stores/GameStore';
import {Modal, ButtonGroup, Button} from 'react-bootstrap';

import GameActions from '../actions/GameActions'

class GameSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.acceptOffer = this.acceptOffer.bind(this);
    this.rejectOffer = this.rejectOffer.bind(this);
    this.state = { showDrawOfferModal: this.props.drawOfferToUser };
  }

  acceptOffer() {
      GameActions.acceptDraw(this.props.gameID);
      this.setState({showDrawOfferModal: false});
  }

  rejectOffer() {
      GameActions.rejectDraw(this.props.gameID);
      this.setState({showDrawOfferModal: false});
  }

  render() {
    var header, subheader, lastMove;

    if (!this.props.gameEnded) {
      header = this.props.userActive ? "Your Turn" : "Opponent's turn";
      subheader = this.props.activeColor + " to play";
      lastMove = this.props.history[this.props.history.length - 1].Move;
      if (lastMove.indexOf("+") > -1) {
          subheader = subheader + ". CHECK!";
      }
    }
    else {
      header = capitalizeFirstLetter(this.props.reason);
      subheader = this.props.winner ?
          capitalizeFirstLetter(this.props.winner) + " wins!" :
          "-";
    }

    return (
      <div className="panel panel-info">
        <div className="panel-heading" style={{textAlign: 'center'}}>
          <h3>
            {header}
          </h3>
          <br />
          <strong>
            {subheader}
          </strong>
        </div>
        <div className="panel-body">
          <div className="row-fluid">
            <GameNavigation
                history={ this.props.history }
                changeVisibleTurn={ this.props.changeVisibleTurn }
                visibleTurn={ this.props.visibleTurn } />
          </div>
        </div>

        <Modal show={this.props.drawOfferToUser} onHide={this.closeOfferModal} backdrop="static">
          <Modal.Header>
            <Modal.Title>Draw Offer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>Your opponent offers a draw. Do you accept?</h1>
          </Modal.Body>
          <Modal.Footer>
            <Button bsSize='large' bsStyle='warning' onClick={this.acceptOffer}>
              <strong>Accept</strong>
            </Button>
            <Button bsSize='large' bsStyle='primary' onClick={this.rejectOffer}>
              <strong>Reject</strong>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default GameSidebar;
