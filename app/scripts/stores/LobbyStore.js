import Reflux from 'reflux';
import $ from 'jquery';
import _ from 'underscore';

import config from '../../config'
import LobbyActions from '../actions/LobbyActions';

var LobbyStore = Reflux.createStore({
  listenables: [LobbyActions],

  init() {
  },

  onCheckLogin() {
      $.get(config.apiRoot + '/auth/me')
        .fail(function() {
            var redirect = encodeURIComponent(window.location);
            window.location = config.apiRoot + '/auth/login?redirect=' + redirect;
        });
  },


});

export default LobbyStore;
