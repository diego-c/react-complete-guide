import React from 'react';
import classes from './Input.css';

const input = props => {
    let inputElement = null;

    switch (props.inputtype) {

        case 'input':
            inputElement = 
            <input { ...props } className = { classes.Checkbox } />
            break;
        
        case 'textarea':
            inputElement = 
            <textarea { ...props } />
            break;        

        default:
            inputElement = <p>Oops, input not recognized!</p>;        
    }

    return (
        <div>
            <label 
            htmlFor={ props.label.toLowerCase() }>
            { props.label }: { inputElement }
            </label>
        </div>
    )
};

export default input;