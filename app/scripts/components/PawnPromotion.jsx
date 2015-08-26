import React from 'react';
import {Modal, ButtonGroup, Button} from 'react-bootstrap';

import GameActions from '../actions/GameActions';

class PawnPromotion extends React.Component {
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.click = this.click.bind(this);
    this.state = {
      showModal: false,
      piece: 'Q'
    };
  }

  click() {
    /*
     * Make move?
     */
    this.close();
  }

  open() {
    this.setState({ showModal: true });
  }

  _onOptionChange(piece) {
    this.setState({
      piece: piece
    });
  }

  render() {
    var piece_img = '../../images/' + this.props.activeColor;
    var img_dimensions = {width: "100px", height: "100px"};

    return (
      <Modal show={this.state.showModal} onHide={null}>
        <Modal.Body>
          <h1>Choose a piece for pawn promotion</h1>
          <ButtonGroup style={{margin: '10px'}}>

            <Button bsStyle={this.state.piece === 'Q' ? 'info' : 'default'}
                    onClick={this._onOptionChange.bind(this, 'Q')}
                    active={this.state.piece === 'Q'}>
              <img src={ piece_img + "Q.svg"} style={img_dimensions}/>
            </Button>

            <Button bsStyle={this.state.piece === 'R' ? 'info' : 'default'}
                    onClick={this._onOptionChange.bind(this, 'R')}
                    active={this.state.piece === 'R'}>
              <img src={ piece_img + "R.svg"} style={img_dimensions}/>
            </Button>

            <Button bsStyle={this.state.piece === 'B' ? 'info' : 'default'}
                    onClick={this._onOptionChange.bind(this, 'B')}
                    active={this.state.piece === 'B'}>
              <img src={ piece_img + "B.svg"} style={img_dimensions}/>
            </Button>

            <Button bsStyle={this.state.piece === 'N' ? 'info' : 'default'}
                    onClick={this._onOptionChange.bind(this, 'N')}
                    active={this.state.piece === 'N'}>
              <img src={ piece_img + "N.svg"} style={img_dimensions}/>
            </Button>

          </ButtonGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.click} bsStyle='success'>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PawnPromotion;
