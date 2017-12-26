import React from 'react';

const Person = props => (
    <div className = "Person">
        <p onClick={ props.clicked }>X</p>
        <input type="text" placeholder="Change my name here..." onChange={ props.changed } />
        <h1>Hello! I'm { props.name } and I'm { props.age } years old.</h1>
    </div>
);

export default Person;