import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
    render() {
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