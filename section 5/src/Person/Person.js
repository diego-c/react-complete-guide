import React from 'react';
import Radium from 'radium';
import './Person.css';

const Person = props => {
    const styles = {
        '@media only screen and (max-width: 414px)': {
            width: '100%',
            fontSize: '.8rem',
            padding: 0
        },

        '@media only screen and (min-width: 414px) and (max-width: 768px)': {
            width: '80%',
            fontSize: '1rem'
        },

        '@media only screen and (min-width: 768px) and (max-width: 1024px)': {
            width: '70%',
            fontSize: '1.2rem'
        },

        '@media only screen and (min-width: 1024px)': {
            width: '60%',
            fontSize: '1.4rem'
        }
    };

    return (
    <div className="Person" style= { styles }>
        <p className="Person__btn" onClick={props.click}>X</p>
        <div className="Person__content">
            <h1 style={{textAlign: 'justify'}}>Hi! My name is { props.name }, I'm {props.age} and my hobbies are: {props.hobbies.join(', ')}.</h1>
            
            <input type="text" onChange={props.nameChangedHandler} defaultValue={ props.name } />
        </div>
    </div>
    )
};

export default Radium(Person);