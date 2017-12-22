import React from 'react';
import classes from './Person.css';

const Person = props => {
    return (
    <div className={classes.Person}>
        <p className={classes.Person__btn} onClick={props.click}>X</p>
        <div className={classes.Person__content}>
            <h1>Hi! My name is { props.name }, I'm {props.age} and my hobbies are: {props.hobbies.join(', ')}.</h1>
            
            <input type="text" onChange={props.nameChangedHandler} defaultValue={ props.name } />
        </div>
    </div>
    )
};

export default Person;