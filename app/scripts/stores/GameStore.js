import Reflux from 'reflux';
import $ from 'jquery';
import _ from 'underscore';

import config from '../../config'
import GameActions from '../actions/GameActions';

var GameStore = Reflux.createStore({
  listenables: [GameActions],
  init() {
    this.state = {
        usergames: {},
        games: {},
        outstandingRequests: 0,
        loading: false
    };

    this.trigger(this.state);
  },
  getInitialState() {
    return this.state;
  },
  onLoadGames() {
    this.incrementOutstandingRequests()
    $.get(config.apiRoot + '/api/games')
        .fail(_.bind(this.onLoadGamesError, this))
        .then(_.bind(function(games) {
            this.state.usergames = games;

            _.each(games, _.bind(this.onLoadGame, this));
            this.decrementOutstandingRequests();
        }, this));
  },

  incrementOutstandingRequests() {
      this.state.outstandingRequests++;
      this.state.loading = true;
      this.trigger(this.state);
  },

  decrementOutstandingRequests() {
      this.state.outstandingRequests--
      if (this.state.outstandingRequests <= 0) {
          this.state.outstandingRequests = 0;
          this.state.loading = false;
      }
      this.trigger(this.state);
  },

  onLoadGame(gameId) {
    this.state.incrementOutstandingRequests();
    $.get(config.apiRoot + '/api/games/' + gameId)
        .then(_.bind(function(gameInfo) {
            this.state.games[gameId] = gameInfo;
            this.decrementOutstandingRequests();
        }, this));
  },

  onLoadGamesError(error) {
      this.decrementOutstandingRequests();
  },

  onCreateGame(color) {
      var data = {};
      if (color == "white" || color == "black") {
          data.color = color
      }
      $.ajax(config.apiRoot + "/api/games/create", {
          data: JSON.stringify(data),
          contentType: 'application/json',
          type: 'POST'
      }).then(_.bind(this.onLoadGames, this));
  },



});

export default GameStore;
