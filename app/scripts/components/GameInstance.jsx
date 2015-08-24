import React from 'react';
import { Button } from 'react-bootstrap';
import { Navigation } from 'react-router';
import { Modal } from 'react-bootstrap';

import config from '../../config'

var GameInstance = React.createClass ({
  mixins: [Navigation],

  getInitialState: function() {
      return {
          showInviteModal: false
      };
  },

  onNavigate: function() {
    this.transitionTo("game", {id: this.props.game.GameInfo.Id});
  },

  onInvite: function() {
    this.setState({showInviteModal: true});
  },

  close: function() {
    this.setState({showInviteModal: false});
  },

  render: function() {
    if (this.props.game.GameInfo.GameStatus == "created") {
        return this.renderWaiting();
    } else {
        return this.renderStarted();
    }
  },

  renderWaiting: function() {
    var inviteLink = config.urlRoot + this.makePath("joingame", {id: this.props.game.GameInfo.Id});

    return (
            <div>
            <Button block bsStyle="warning" onClick={this.onInvite}>
                Waiting for Opponent
            </Button>

            <Modal show={this.state.showInviteModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Invite Player by Sending Them Link</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input value={inviteLink} readOnly style={{width: '100%'}} />
              </Modal.Body>
            </Modal>
            </div>
           );
  },

  renderStarted: function() {
    var status_text;
    if (this.props.game.UserActive) {
        status_text = "Your Turn";
    } else {
        status_text = "Not Your Turn";
    }
    return (
            <Button block onClick={this.onNavigate}>
                {status_text}
            </Button>
           );
  }
});


export default GameInstance;
