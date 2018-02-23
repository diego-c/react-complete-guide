import React, { Component } from 'react';
import classes from './Input.css';

class Input extends Component {

    render() {
        let inputElement = null;
        let errorMsg = null;

        const classesAdded = [classes.Checkbox];
        if (this.props.shouldValidate && this.props.valid && this.props.touched) { 
            classesAdded.push(classes.Valid)
        } else {
            classesAdded.push(classes.Invalid);
            errorMsg =
            this.props.error ? 
            this.props.error.map(err => {
                return err.ok ? null :            
                <p 
                style={{ color: '#d63333', fontSize: '1.5rem', fontWeight: 'bold', margin: '1.5rem auto 2rem auto' }}
                key = { err.key }>{ err.errorMsg }</p>
            }) : null        
        }

        if (!this.props.shouldValidate || !this.props.touched) {
            classesAdded.splice(1);
        }

        switch (this.props.inputtype) {

            case 'input':
                inputElement = 
                <input 
                { ...this.props.config }
                onChange = { this.props.changed }
                className = { classesAdded.join(' ') }
                />

                break;
            
            case 'textarea':
                inputElement = 
                <textarea 
                onChange = { this.props.changed }
                { ...this.props.config }
                />

                break;     
                
            case 'select':
                inputElement = 
                (
                    <select  
                    onChange = { this.props.changed }
                    { ...this.props.config }              
                    value = { this.props.value ? this.props.value : this.props.config.options[0].value }
                    name = { this.props.config.name }>
                        { this.props.config.options.map(option => (
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
                htmlFor= { this.props.config.id }>
                    { this.props.config.label }: { inputElement }
                    { errorMsg }
                </label>
            </div>
        )
    }
}

export default Input;