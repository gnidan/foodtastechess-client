/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './Lounge.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class LoungePage {


  render() {
    let title = 'FoodTaste Chess Lounge';
    this.context.onSetTitle(title);
    return (
      <div className="Lounge">
        <div className="Lounge-container">
          <div className="jumbotron">
            <h1>Testing</h1>
          </div>
        </div>
      </div>
    );
  }

}

export default LoungePage;
