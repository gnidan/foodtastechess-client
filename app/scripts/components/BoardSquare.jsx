import React from 'react';

class BoardSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: props.black};
  }

  render() {
    return (
      <div style={{backgroundColor: this.state.color ? "#2b5005":"#f1f1f1"}}
           className="boardsquare">
        <div className="square_align">
          <div className="inner_square">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default BoardSquare;
