import React from 'react';

class CapturedPieces extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading"><strong>Captured Pieces</strong></div>
        <div className="panel-body" style={{height: '200px'}}></div>
      </div>
    );
  }
}

export default CapturedPieces;
