import React from 'react';
import {Modal, ButtonGroup, Button} from 'react-bootstrap';

import GameActions from '../actions/GameActions';

class NewGameModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.click = this.click.bind(this);
    this.state = { showModal: false
                 , color: 'random'};
  }

  close() {
    this.setState({ showModal: false });
  }

  click() {
      GameActions.createGame(this.state.color);
      this.close();
  }

  open() {
    this.setState({ showModal: true });
  }

  _onOptionChange(color) {
    this.setState({
      color: color
    });
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
            <Modal.Title>Create a New Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>Choose a color</h1>
            <ButtonGroup style={{margin: '10px'}}>

              <Button bsStyle={this.state.color === 'random' ? 'info' : 'default'}
                      onClick={this._onOptionChange.bind(this, 'random')}
                      active={this.state.color === 'random'}>Random</Button>

              <Button bsStyle={this.state.color === 'black' ? 'info' : 'default'}
                      onClick={this._onOptionChange.bind(this, 'black')}
                      active={this.state.color === 'black'}>Black</Button>

              <Button bsStyle={this.state.color === 'white' ? 'info' : 'default'}
                      onClick={this._onOptionChange.bind(this, 'white')}
                      active={this.state.color === 'white'}>White</Button>

            </ButtonGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button onClick={this.click} bsStyle='success'>
              Create Game
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NewGameModal;
