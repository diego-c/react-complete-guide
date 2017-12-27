import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor\n', props);

    // old way of initializing the state
    this.state = {
      persons: [
        {
          id: 1,
          name: 'john',
          age: 25
        },
        {
          id: 2,
          name: 'jane',
          age: 29
        },
        {
          id: 3,
          name: 'june',
          age: 30
        }
      ],
      showPersons: false
    }
  }
  /* state = {
    persons: [
      {
        id: 1,
        name: 'john',
        age: 25
      },
      {
        id: 2,
        name: 'jane',
        age: 29
      },
      {
        id: 3,
        name: 'june',
        age: 30
      }
    ],
    showPersons: true
  } */

  showPersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  changeNameHandler = (id, e) => {
    const newName = e.target.value;    
    this.setState(prevState => {
      const newPersons = [...prevState.persons];
      const wanted = newPersons.findIndex(person => person.id === Number(id));
      const newPerson = {...newPersons[wanted]};
      newPerson.name = newName;
      newPersons[wanted] = newPerson;

      return {persons: newPersons};
    })
  }

  removePersonHandler = (id) => {
    this.setState(prevState => {
      const newPersons = [...prevState.persons];
      const removedIndex = newPersons.findIndex(person => person.id === Number(id));
      newPersons.splice(removedIndex, 1);

      return {persons: newPersons};
    })
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount');
  }

  render() {
    console.log('[App.js] Inside render');
    let persons = null;
    if (this.state.showPersons) {
      persons = <Persons 
      persons={ this.state.persons }
      clicked={ this.removePersonHandler }
      changed={ this.changeNameHandler }
      />;
    }
   
    return (
      <div className={ classes.App }>
        <Cockpit show={ this.state.showPersons }
         click= { this.showPersonsHandler }
         appTitle={ this.props.title } />
      { persons }
      </div>
    )
  }
}

export default App;
