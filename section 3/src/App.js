import React, { Component } from 'react';
import People from './People';
import Wrapper from './Wrapper';
import "./index.css";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to react!</h1>
        <Wrapper>
          <People />
        </Wrapper>
      </div>
    );
  }
}

export default App;
