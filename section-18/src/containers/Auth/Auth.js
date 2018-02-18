import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {

    state = {
        controls: {
            email: { ...this.generateInput('input', {
                    id: "email",
                    name: "email",                    
                    label: "Email",
                    type:  "email",
                    placeholder: "Your e-mail..." 
                }),
                validation: {
                    required: true
                },
                errorMsg: 'This field is required',
                valid: false
            }
        }
    }

    validateInput(value, rules) {
        let validationArray = [];

        if (rules) {

            if (rules.required) {
                validationArray.push((value.trim() !== ''))
            }

            if (rules.minLength) {
                validationArray.push((value.length >= rules.minLength));
            }

            if (rules.maxLength) {
                validationArray.push((value.length <= rules.maxLength));
            }
        } else {
            validationArray.push(true);
        }

        return validationArray.every(entry => entry);
    }

    handleInput = (e, field) => {
        console.log('Triggered handleInput: ', this.state.controls.email);

        const updatedValue = e.target.value;
        const updatedState = { ...this.state };
        const updatedControls = { ...updatedState.controls };
        const updatedControl = { ...updatedControls[field] };

        updatedControl.value = updatedValue;

        updatedControl.valid = this.validateInput(updatedValue, updatedControl.validation);
        updatedControl.touched = true;

        updatedControls[field] = updatedControl;
        
        this.setState({ controls: updatedControls });        
    }   

    generateInput(inputtype, config) {
        let value = '';
        if (inputtype === 'select') value = config.options[0].value;
        return { inputtype, config, value, touched: false };
    }

    render() {        
        //const { controls } = this.state;

        return (
            <div>
                <form action="">
                    <Input
                    changed = { e => this.handleInput(e, 'email') }
                    shouldValidate = { true }
                    error = { this.state.controls.email.errorMsg ? this.state.controls.email.errorMsg : null }
                    config = { this.state.controls.email.config }
                    inputtype = { this.state.controls.email.inputtype }
                    />
                </form>
            </div>
        )
    }
}

export default Auth;