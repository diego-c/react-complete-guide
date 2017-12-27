import React from 'react';
import Person from './Person/Person';

const Persons = props => (
    <div>
        { props.persons.map((person, index) => (
            <div key = { person.id }>   
                <Person
                name = { person.name }
                age = { person.age }                
                clicked = { () => props.clicked(person.id) }
                changed = { (e) => props.changed(person.id, e) }
                currentName = { person.name }
                />
            </div>
        ))}
    </div>
);

export default Persons;