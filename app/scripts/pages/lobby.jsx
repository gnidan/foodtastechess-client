import React from 'react';
import $ from 'jquery';
import GameList from '../components/GameList.jsx';

import LobbyActions from '../actions/LobbyActions';
import GameActions from '../actions/GameActions';

class Lobby extends React.Component {

  componentWillMount() {
      LobbyActions.checkLogin();
  }

  componentDidMount() {
      GameActions.loadGames();
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
