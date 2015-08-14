import React from 'react';
import { Link } from 'react-router';
import { Alert } from 'react-bootstrap';

class Header extends React.Component{

  constructor(props, context) {
   super(props);
  }

  render() {
    return (
      <header className="clearfix">
        Application Name
        <Alert bsStyle="warning">
            Holy guacamole!
        </Alert>

        <nav className="clearfix">
          <div className="nav-item">
            <Link to="home">Home</Link>
          </div>
          <div className="nav-item">
            <Link to="info">Info</Link>
          </div>
        </nav>
      </header>
    );
  }

}

Header.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default Header;
