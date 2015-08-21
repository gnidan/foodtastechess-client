import Reflux from 'reflux';

var LobbyActions = Reflux.createActions([
    'loadGames',
    'loadGamesSuccess',
    'loadGamesError'
]);

LobbyActions.loadGames.preEmit = function(data) {
};

export default LobbyActions;
