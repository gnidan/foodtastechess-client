import React from 'react';

class GameInstance extends React.Component {
  render() {
    var status_num = Math.floor(Math.random() * 4);
    var status = "panel";
    var status_text = null;
    switch (status_num) {
      case 0: status += " panel-danger"; break;
      case 1: status += " panel-success"; break;
      case 2: status += " panel-info"; break;
      case 3: status += " panel-warning"; break;
      default: break;
    }
    switch (status_num) {
      case 0: status_text = " Loss"; break;
      case 1: status_text = " Win"; break;
      case 2: status_text = " Your turn"; break;
      case 3: status_text = " Waiting for opponent"; break;
      default: break;
    }

    return (
      <div className={status}>
        <div className="panel-heading">
          {status_text}
        </div>
      </div>
    );
  }
}


export default GameInstance;
