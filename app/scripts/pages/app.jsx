import React from 'react';
import { RouteHandler } from 'react-router';

class App extends React.Component {
  
  render() {
    return (
      <div>
        <div className="content">
          <RouteHandler/>
        </div>
      </div>
    );
  }
  
}

export default App;
