import Reflux from 'reflux';
import LobbyActions from '../actions/LobbyActions';

var LobbyStore = Reflux.createStore({
  init() {
    this.games = [];
  },

  loadGames() {
    this.trigger({
      loading: true
    });
  },

  loadGamesSuccess(games) {
    this.games = games;

    this.trigger({
      items: this.items,
      loading: false
    });
  },

  loadGamesError(error) {
    this.trigger({
      error: error,
      loading: false
    });
  }

});

export default LobbyStore;
