import React from 'react';
import Person from './Person/Person';

const Persons = props => (
    <div>
        { props.persons.map((person, index) => (
            <div>   
                <Person
                name = { person.name }
                age = { person.age }
                key = { person.id }
                clicked = { () => props.clicked(person.id) }
                changed = { (e) => props.changed(person.id, e) }
                />
            </div>
        ))}
    </div>
);

export default Persons;