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
            
        case 'select':
            inputElement = 
            (
                <select 
                onChange = { props.changed }
                value = { props.value ? props.value : props.config.options[0].value }
                name = { props.config.name }>
                    { props.config.options.map(option => (
                        <option 
                        key = { option.value }
                        value = { option.value }>
                        { option.displayValue }
                        </option>
                    )) }
                </select>
            );
            
            break;

        default:
            inputElement = <p>Oops, input not recognized!</p>;        
    }

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