import React from 'react';
import Router from 'react-router';
import routes from './routes';
import $ from 'jquery';


Router.run(routes, Handler => React.render(<Handler />, document.getElementById("main")));
