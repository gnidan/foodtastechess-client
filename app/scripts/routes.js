import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './pages/app.jsx';

import Lobby from './pages/lobby.jsx';
import Game from './pages/game.jsx';
import JoinGame from './pages/joingame.jsx';

import NotFound from './pages/notFound.jsx';

var routes = (
  <Route name="app" path="/" handler={ App }>
    <Route name="game" path="/game/:id" handler={ Game } />
    <Route name="joingame" path="/joingame/:id" handler={ JoinGame } />
    <Route name="lobby" handler={ Lobby } />
    <DefaultRoute handler={ Lobby } />
    <NotFoundRoute handler={ NotFound } />
  </Route>
);

export default routes;
