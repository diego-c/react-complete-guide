import React, { Component } from 'react';
import './App.css';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {

  state = {
    txt: '',
    chars: []    
  }

  countCharsHandler = e => {
    const txt = e.target.value;
    this.setState(prevState => {
      const newState = {...prevState};
      newState.txt = txt;      
      let newChars = [];
      
      newChars = [...newState.txt].reduce((previous, next, index) => {
        previous.push({
          char: next,
          id: index
        })
        return previous;
      }, []);

      newState.chars = newChars;
      return newState;
    })
  }

  removeCharHandler = id => {
    this.setState(prevState => {
      const newState = {...prevState};
      const newChars = [...newState.chars];
      const toBeRemoved = newChars.findIndex(char => Number(char.id) === Number(id));

      newChars.splice(toBeRemoved, 1);
      newState.chars = newChars;

      return newState;      
    })
  }
  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Enter text..." onChange={ this.countCharsHandler } />
        <p>Length: { this.state.chars.length }</p>
        <Validation length = { this.state.chars.length } />

        { this.state.chars.map(char => <Char letter = { char.char } click = { this.removeCharHandler.bind(this, char.id) } key = { char.id } />) }

        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
      </div>
    );
  }
}

export default App;
