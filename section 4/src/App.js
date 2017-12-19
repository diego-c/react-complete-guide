import React, { Component } from 'react';
import People from './People';
import Wrapper from './Wrapper';
import "./index.css";

class App extends Component {
  render() {
    return (
      <div>
        <Wrapper>
          <People />
        </Wrapper>
      </div>
    );
  }
}

export default App;
