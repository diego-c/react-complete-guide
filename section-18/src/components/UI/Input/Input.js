import React from 'react';
import classes from './Input.css';

const input = props => {
    let inputElement = null;
    let errorMsg = null;

    const classesAdded = [classes.Checkbox];
    if (props.shouldValidate && props.valid && props.touched) { 
    classesAdded.push(classes.Valid)
    } else {
        classesAdded.push(classes.Invalid);
        errorMsg = 
        props.error.map(err => {
            return err.ok ? null :            
            <p 
            style={{ color: '#d63333', fontSize: '1.5rem', fontWeight: 'bold', margin: '1.5rem auto 2rem auto' }}
            key = { err.key }>{ err.errorMsg }</p>
        })        
    }

    if (!props.shouldValidate || !props.touched) {
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
                { errorMsg }
            </label>
        </div>
    )
};

export default input;