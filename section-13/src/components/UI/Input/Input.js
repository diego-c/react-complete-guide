import React from 'react';
import classes from './Input.css';

const input = props => {
    let inputElement = null;

    switch (props.inputtype) {

        case 'input':
            inputElement = 
            <input 
            { ...props.config }
            className = { classes.Checkbox }
            onChange = { props.changed } />

            break;
        
        case 'textarea':
            inputElement = 
            <textarea 
            { ...props.config }
            onChange = { props.changed } />

            break;        

        default:
            inputElement = <p>Oops, input not recognized!</p>;        
    }

    console.log(props);
    return (
        <div>
            <label 
            htmlFor= { props.config.id }>
                { props.config.label }: { inputElement }
            </label>
        </div>
    )
};

export default input;