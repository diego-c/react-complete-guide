import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
    constructor(props) {
        super(props);
        console.log('[Persons.js] Inside constructor', props);
    }

    componentWillMount() {
        console.log('[Persons.js] Inside componentWillMount');
    }
    
      componentDidMount() {
        console.log('[Persons.js] Inside componentDidMount');
    }

    render() {
        console.log('[Persons.js] Inside render');
        return (
            <div>
                { this.props.persons.map((person, index) => (
                    <div key = { person.id }>   
                        <Person
                        name = { person.name }
                        age = { person.age }                
                        clicked = { () => this.props.clicked(person.id) }
                        changed = { (e) => this.props.changed(person.id, e) }
                        currentName = { person.name }
                        />
                    </div>
                ))}
            </div>
        )
    }
}

export default Persons;