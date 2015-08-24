import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import GameList from '../components/GameList.jsx';

import LobbyActions from '../actions/LobbyActions';
import GameActions from '../actions/GameActions';

class Lobby extends React.Component {

  componentWillMount() {
      LobbyActions.checkLogin();
  }

  componentDidMount() {
    GameActions.loadGames();

    this.loaderInterval = setInterval(_.bind(function() {
      GameActions.loadGames();
    }, this), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.loaderInterval);
  }

  render() {
    var loading;
    var usergames;
    var games;
    if (this.props.games === undefined) {
        loading = false;
        usergames = [];
        games = {};
    } else {
        loading = this.props.games.loading;
        usergames = this.props.games.usergames;
        games = this.props.games.games;
    }

    return (
        <div>
          <GameList loading={loading} usergames={usergames} games={games} />
        </div>
    );
  }

}

export default Lobby;
