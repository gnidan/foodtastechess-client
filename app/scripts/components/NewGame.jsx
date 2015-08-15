import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class NewGameModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.state = { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }


  render() {

    return (
      <div>
        <Button
          bsStyle='primary'
          bsSize='large'
          block
          onClick={this.open}>
          Create a New Game
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>New Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This is where you create a new game, doot da doo.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button>
              Create Game
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NewGameModal;
