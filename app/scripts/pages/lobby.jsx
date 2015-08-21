import React from 'react';
import $ from 'jquery';
import GameList from '../components/GameList.jsx';

import LobbyActions from '../actions/LobbyActions';
import LobbyStore from '../stores/LobbyStore';

class Lobby extends React.Component {

  validate() {

    var redirect = '/auth/login?redirect=' + encodeURIComponent(window.location);

    $.ajax({
      type: 'GET',
      url: '/auth/me',
      statusCode: {
        401: function() { window.location = redirect; }
      }
    });

  }

  render() {
    //this.validate();

    return (
        <div>
          <GameList />
        </div>
    );
  }

}

export default Lobby;
