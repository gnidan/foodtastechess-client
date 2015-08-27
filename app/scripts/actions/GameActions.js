import Reflux from 'reflux';

var GameActions = Reflux.createActions([
    'createGame',
    'joinGame',
    'loadGames',
    'loadGame',
    'makeMove',
    'concedeGame',
    'offerDraw',
    'acceptDraw',
    'rejectDraw'
]);

export default GameActions;
