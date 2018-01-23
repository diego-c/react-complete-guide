import React from 'react';
import classes from './Input.css';

const input = props => {
    let inputElement = null;

    const classesAdded = [classes.Checkbox];
    props.shouldValidate && props.valid ? 
    classesAdded.push(classes.Valid) :
    classesAdded.push(classes.Invalid);

    if (!props.shouldValidate) {
        classesAdded.splice(1);
    }

    switch (props.inputtype) {

        case 'input':
            inputElement = 
            <input 
            { ...props.config }
            onChange = { props.changed }
            className = { classesAdded.join(' ') }
            />

            break;
        
        case 'textarea':
            inputElement = 
            <textarea 
            onChange = { props.changed }
            { ...props.config }
            />

            break;     
            
        case 'select':
            inputElement = 
            (
                <select  
                onChange = { props.changed }
                { ...props.config }              
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