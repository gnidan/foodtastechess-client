import React from 'react';
import GameList from '../components/GameList.jsx';

import LobbyActions from '../actions/LobbyActions';
import LobbyStore from '../stores/LobbyStore';

class Lobby extends React.Component {

  render() {
    return (
        <div>
          <GameList />
        </div>
    );
  }

}

export default Lobby;
