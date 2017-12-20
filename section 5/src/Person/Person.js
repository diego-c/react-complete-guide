import React from 'react';
import Radium from 'radium';
import './Person.css';

const Person = props => {
    const styles = {
        '@media only screen and (min-width: 500px)': {
            width: '450px'
        }
    };

    return (
    <div className="Person" style= { styles }>
        <p className="Person__btn" onClick={props.click}>X</p>
        <div className="Person__content">
            <h1>Hi! My name is { props.name }, I'm {props.age} and my hobbies are: {props.hobbies.join(', ')}.</h1>
            
            <input type="text" onChange={props.nameChangedHandler} defaultValue={ props.name } />
        </div>
    </div>
    )
};

export default Radium(Person);