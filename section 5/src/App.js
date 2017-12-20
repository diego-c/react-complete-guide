import React, { Component } from 'react';
import People from './People/People';
import { StyleRoot } from 'radium';
import Wrapper from './Wrapper';
import "./index.css";

class App extends Component {
  render() {
    return (
      <StyleRoot>
      <div>
        <Wrapper>
          <People />
        </Wrapper>
      </div>
      </StyleRoot>
    );
  }
}

export default App;
