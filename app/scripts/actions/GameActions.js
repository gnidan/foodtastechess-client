import Reflux from 'reflux';

var GameActions = Reflux.createActions([
    'createGame',
    'loadGames',
    'loadGamesSuccess',
    'loadGamesError'
]);

export default GameActions;
