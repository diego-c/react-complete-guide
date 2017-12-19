import React, { Component } from 'react';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import './App.css';

class App extends Component {
  state = {
    username: 'johndoe92'
  }

  handleInput = e => {
    this.setState({
      username: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
      <UserInput handleInput={ this.handleInput } username={ this.state.username } />
      <UserOutput username={ this.state.username } />
      <UserOutput username={ this.state.username } />
      <UserOutput username={ this.state.username } />
      <UserOutput username={ this.state.username } />
      </div>
    );
  }
}

export default App;
