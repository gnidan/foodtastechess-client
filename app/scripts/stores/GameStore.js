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
  },
  onLoadGames() {
    this.trigger({
      loading: true
    });

    $.get(config.apiRoot + '/api/games')
        .then(_.bind(this.onLoadGamesSuccess, this))
        .fail(_.bind(this.onLoadGamesError, this));
  },

  onLoadGamesSuccess(games) {
    console.debug("load games success: ", games)
    this.usergames = games;

    _.each(games, _.bind(function(game) {
        $.get(config.apiRoot + '/api/games/' + game)
            .then(_.bind(function(gameInfo) {
                this.games[game] = gameInfo;

                this.trigger({
                    usergames: this.usergames,
                    loading: false,
                    games: this.games
                })
            }, this));
    }, this));

    this.trigger({
      games: this.games,
      usergames: this.usergames,
      loading: false
    });
  },

  onLoadGamesError(error) {
    this.trigger({
      error: error,
      loading: false
    });
  }
});

export default GameStore;
