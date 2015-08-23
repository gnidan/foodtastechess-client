import Reflux from 'reflux';
import $ from 'jquery';
import _ from 'underscore';

import config from '../../config'
import GameActions from '../actions/GameActions';

var GameStore = Reflux.createStore({
  listenables: [GameActions],
  init() {
    this.usergames = [];
    this.games = {};
    this.trigger({
      games: this.games,
      usergames: this.usergames,
      loading: false
    });
  },
  onLoadGames() {
    this.trigger({
      games: this.games,
      usergames: this.usergames,
      loading: true
    });

    $.get(config.apiRoot + '/api/games')
        .then(_.bind(this.onLoadGamesSuccess, this))
        .fail(_.bind(this.onLoadGamesError, this));
  },

  onLoadGamesSuccess(games) {
    this.usergames = games;
    var outstanding = games.length;
    var loading = outstanding > 0;

    _.each(games, _.bind(function(game) {
        $.get(config.apiRoot + '/api/games/' + game)
            .then(_.bind(function(gameInfo) {
                outstanding--;
                if (outstanding === 0) {
                    loading = false;
                }

                this.games[game] = gameInfo;

                this.trigger({
                    usergames: this.usergames,
                    loading: loading,
                    games: this.games
                })
            }, this));
    }, this));

    this.trigger({
      games: this.games,
      usergames: this.usergames,
      loading: loading
    });
  },

  onLoadGamesError(error) {
    this.trigger({
      error: error,
      loading: false
    });
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
