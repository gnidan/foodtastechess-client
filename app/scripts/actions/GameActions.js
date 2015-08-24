import Reflux from 'reflux';

var GameActions = Reflux.createActions([
    'createGame',
    'joinGame',
    'loadGames',
    'loadGame',
    'makeMove'
]);

export default GameActions;
