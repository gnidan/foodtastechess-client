import React from 'react';
import Reflux from 'reflux';
import { RouteHandler } from 'react-router';

import LobbyStore from '../stores/LobbyStore';
import GameStore from '../stores/GameStore';

var App = React.createClass({
  mixins: [
    Reflux.connect(LobbyStore,"lobby"),
    Reflux.connect(GameStore,"games")
    ],

  render: function() {
    return (
      <div>
        <div className="content">
          <RouteHandler
            games={this.state.games}
            lobby={this.state.lobby}
          />
        </div>
      </div>
    );
  }

});

export default App;
