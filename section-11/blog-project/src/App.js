import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Blog />
        </Router>
      </div>
    );
  }
}

export default App;
