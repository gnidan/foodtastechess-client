import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import GameList from '../components/GameList.jsx';
import { Navigation } from 'react-router';

import LobbyActions from '../actions/LobbyActions';
import GameActions from '../actions/GameActions';


var JoinGame = React.createClass({
  mixins: [Navigation],

  componentWillMount: function() {
    LobbyActions.checkLogin();
    GameActions.loadGames();
  },

  componentDidMount: function() {
    if (_.contains(this.props.games.usergames, parseInt(this.props.params.id))) {
      this.transitionTo("game", {id: this.props.params.id});
    } else {
      GameActions.joinGame(this.props.params.id);
    }
  },

  componentDidUpdate: function() {
    if (_.contains(this.props.games.usergames, parseInt(this.props.params.id))) {
      this.transitionTo("game", {id: this.props.params.id});
    }
  },

  render: function() {
    var message;

    if (this.props.games.error) {
        message = this.props.games.error;
    } else {
        message = "Joining game...";
    }

    return (
        <div>
        {message}
        </div>
    );
  }

})

export default JoinGame;
