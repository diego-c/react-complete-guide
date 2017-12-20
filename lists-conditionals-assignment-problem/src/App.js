import React, { Component } from 'react';
import './App.css';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {

  state = {
    currentId: 0,
    count: 0,
    txt: '',
    txtArr: [],
    chars: []    
  }

  countCharsHandler = e => {
    const txt = e.target.value;
    const count = e.target.value.length;
    this.setState(prevState => {
      const newState = {...prevState};

      newState.currentId++;
      newState.count = count;
      newState.txt = txt;
      newState.txtArr = [...txt];      
      let newChars = [];
      newChars = newState.txtArr.reduce((previous, next, index) => {
        const newId = newState.currentId + index;
        previous.push({
          next,
          id: newId
        })
        return previous;
      }, [])
      newChars = newState.txtArr.map(char => ({
        char,
        id: prevState.currentId + 1
      }))
      newState.chars = newChars;

      console.log(newState);
      return newState;
    })
  }

  removeCharHandler = (id, e) => {
    console.log(id);
  }
  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Enter text..." onChange={ this.countCharsHandler } />
        <p>Length: { this.state.count }</p>
        <Validation length = { this.state.length } />

        { this.state.chars.map(char => <Char letter = { char.char } click = { this.removeCharHandler.bind(this, char.id) } />) }

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
