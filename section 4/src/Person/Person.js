import React from 'react';
import './Person.css';

const Person = props => (
    <div className="Person">
        <p className="Person__btn" onClick={props.click}>X</p>
        <div className="Person__content">
            <h1>Hi! My name is { props.name }, I'm {props.age} and my hobbies are: {props.hobbies.join(', ')}.</h1>
            
            <input type="text" onChange={props.nameChangedHandler} defaultValue={ props.name } />
        </div>
    </div>
);

export default Person;