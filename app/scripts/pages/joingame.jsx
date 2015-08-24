import React from 'react';
import $ from 'jquery';
import GameList from '../components/GameList.jsx';
import { Navigation } from 'react-router';

import LobbyActions from '../actions/LobbyActions';
import GameActions from '../actions/GameActions';


var JoinGame = React.createClass({
  mixins: [Navigation],

  componentWillMount: function() {
    LobbyActions.checkLogin();
  },

  componentWillReceiveProps: function(nextProps) {
    if (_.contains(nextProps.games.usergames, nextProps.params.id)) {
      this.transitionTo("game", {id: nextProps.params.id});
    } else {
      GameActions.joinGame(nextProps.params.id);
    }
  },

  render: function() {
    console.debug(this.props.games.error);

    return (
        <div>
          Joining...
        </div>
    );
  }

})

export default JoinGame;
