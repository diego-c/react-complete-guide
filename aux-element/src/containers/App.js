import React, { PureComponent } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.css';
import Aux from '../components/hoc/Aux';
import WithClass from '../components/hoc/withClass';

class App extends PureComponent {

  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor\n', props);

    // old way of initializing the state
    this.state = {
      clickCounter: 0,
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
    this.setState(prevState => ({
      showPersons: !prevState.showPersons,
      clickCounter: prevState.clickCounter + 1
    }))
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

  // Lifecycle updates - triggered by internal state changes!

  /* shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] Inside shouldComponentUpdate', nextProps, nextState);
    return nextProps.title !== this.props.title ||
           nextState.persons !== this.state.persons ||
           nextState.showPersons !== this.state.showPersons;
  } */

  componentWillUpdate(nextProps, nextState) {
    console.log('[App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[App.js] Inside componentDidUpdate', this.props, this.state);
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
      <Aux>
        <button onClick = {() => this.setState({showPersons: true})}>Show persons</button>
        <Cockpit show={ this.state.showPersons }
         click= { this.showPersonsHandler }
         appTitle={ this.props.title }
         counter = { this.state.clickCounter } />
      { persons }
      </Aux>
    )
  }
}

export default WithClass(App, classes.App);
