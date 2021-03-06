import Reflux from 'reflux';
import $ from 'jquery';
import _ from 'underscore';

import config from '../../config'
import GameActions from '../actions/GameActions';

var GameStore = Reflux.createStore({
  listenables: [GameActions],
  init() {
    this.state = {
        usergames: [],
        games: {},
        gameHistories: {},
        gameValidMoves: {},
        outstandingRequests: 0,
        loading: false,
        error: null
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
    this.incrementOutstandingRequests();
    $.get(config.apiRoot + '/api/games/' + gameId)
        .then(_.bind(function(gameInfo) {
            this.state.games[gameId] = gameInfo;
            this.decrementOutstandingRequests();
        }, this));
    this.incrementOutstandingRequests();
    $.get(config.apiRoot + '/api/games/' + gameId + '/history')
        .then(_.bind(function(history) {
            this.state.gameHistories[gameId] = history;
            this.decrementOutstandingRequests();
        }, this));
    this.incrementOutstandingRequests();
    $.get(config.apiRoot + '/api/games/' + gameId + '/validmoves')
        .then(_.bind(function(validMoves) {
            this.state.gameValidMoves[gameId] = validMoves;
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

  onJoinGame(gameId) {
      $.ajax(config.apiRoot + "/api/games/" + gameId + "/join", {
          data: JSON.stringify({}),
          contentType: 'application/json',
          type: 'POST'
      })
        .then(_.bind(this.onLoadGames, this))
        .fail(_.bind(function(error) {
            this.state.error = error.responseJSON.error;
            this.trigger(this.state);
        }, this));
  },

  onMakeMove(gameId, move) {
    $.ajax(config.apiRoot + "/api/games/" + gameId + "/move", {
        data: JSON.stringify({move: move}),
        contentType: 'application/json',
        type: 'POST'
    })
      .then(_.bind(function() { this.onLoadGame(gameId) }, this));
  },

  onConcedeGame(gameId) {
    $.ajax(config.apiRoot + "/api/games/" + gameId + "/concede", {
        data: JSON.stringify({}),
        contentType: 'application/json',
        type: 'POST'
    })
      .then(_.bind(function() { this.onLoadGame(gameId) }, this));
  },

  onOfferDraw(gameId) {
    $.ajax(config.apiRoot + "/api/games/" + gameId + "/offerdraw", {
        data: JSON.stringify({}),
        contentType: 'application/json',
        type: 'POST'
    })
      .then(_.bind(function() { this.onLoadGame(gameId) }, this));
  },

  onAcceptDraw(gameId) {
    $.ajax(config.apiRoot + "/api/games/" + gameId + "/respondoffer", {
        data: JSON.stringify({accept: true}),
        contentType: 'application/json',
        type: 'POST'
    })
      .then(_.bind(function() { this.onLoadGame(gameId) }, this));
  },

  onRejectDraw(gameId) {
    $.ajax(config.apiRoot + "/api/games/" + gameId + "/respondoffer", {
        data: JSON.stringify({accept: false}),
        contentType: 'application/json',
        type: 'POST'
    })
      .then(_.bind(function() { this.onLoadGame(gameId) }, this));
  }
});

export default GameStore;
