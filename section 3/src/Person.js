import React from 'react';

const Person = props => (
    <div onClick={props.click}>
        <h1>Hi! My name is { props.name }, I'm {props.age} and my hobbies are: {props.hobbies.join(', ')}.</h1>

        { props.id === 1 ? 
        <input type="text" onChange={props.nameChangedHandler} defaultValue={ props.name } />
        :
        <input type="text" onChange={props.nameChangedHandler} defaultValue={ props.name } readOnly /> }
    </div>
);

export default Person;