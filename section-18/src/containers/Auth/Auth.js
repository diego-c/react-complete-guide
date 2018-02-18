import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import { connect } from 'react-redux';
import { authAsync } from '../../store/actions/index';

class Auth extends Component {

    state = {
        isSignup: true,
        validForm: false,
        controls: {
            email: { ...this.generateInput('input', {
                    id: "email",
                    name: "email",                    
                    label: "E-mail",
                    type:  "email",
                    placeholder: "Your e-mail..." 
                }),
                validation: {
                    required: {
                        value: true,
                        errorMsg: 'This field is required',
                        ok: false
                    },
                    isEmail: {
                        value: true,
                        errorMsg: 'This doesn\'t look like a valid e-mail',
                        ok: false
                    }
                },
                valid: false
            },
            password: { ...this.generateInput('input', {
                    id: "password",
                    name: "password",                    
                    label: "Password",
                    type:  "password",
                    placeholder: "Your password..." 
                }),
                validation: {
                    required: {
                        value: true,
                        errorMsg: 'This field is required',
                        ok: false
                    },
                    minLength: {
                        value: 6,
                        errorMsg: 'At least 6 characters are required for this field',
                        ok: false
                    }
                },
                valid: false
            }
        }
    }

    validateInput = (value, rules, field) => {
        let validationArray = [];
        let requiredValidation = null;
        let minLengthValidation = null;
        let maxLengthValidation = null;
        let isEmailValidation = null;
        let isNumericValidation = null;

        if (rules) {
            if (rules.required) {                
                value.trim() !== '' ? 
                requiredValidation = {
                    required: {
                        ok: true
                    }
                    
                } :
                requiredValidation = {
                    required: {
                        ok: false
                    }                    
                }

                validationArray.push((value.trim() !== ''))
            }

            if (rules.minLength) {
                value.length >= rules.minLength.value ?
                minLengthValidation = {
                    minLength: {
                        ok: true
                    }
                } :
                minLengthValidation = {
                    minLength: {
                        ok: false
                    }
                }

                validationArray.push((value.length >= rules.minLength.value));
            }

            if (rules.maxLength) {
                value.length <= rules.maxLength.value ?
                maxLengthValidation = {
                    maxLength: {
                        ok: true
                    }
                } :
                maxLengthValidation = {
                    maxLength: {
                        ok: false
                    }
                }

                validationArray.push((value.length <= rules.maxLength.value));
            }

            if (rules.isEmail) {

                const isValidEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
                
                isValidEmail ?
                isEmailValidation = {
                    isEmail: {
                        ok: true
                    }
                } :
                isEmailValidation = {
                    isEmail: {
                        ok: false
                    }
                }

                validationArray.push(isValidEmail);
            }

            if (rules.isNumeric) {
                const isValidNumber = /^\d+$/.test(value);

                isValidNumber ?
                isNumericValidation = {
                    isNumeric: {
                        ok: true
                    }
                } :
                isNumericValidation = {
                    isNumeric: {
                        ok: false
                    }
                }

                validationArray.push(isValidNumber);
            }
        } else {
            validationArray.push(true);
        }

        return { valid: validationArray.every(entry => entry), validation: { ...requiredValidation, ...minLengthValidation, ...maxLengthValidation, ...isEmailValidation, ...isNumericValidation } }
    }

    handleInput = (e, field) => {
        const updatedValue = e.target.value;
        const updatedState = { ...this.state };
        const updatedControls = { ...updatedState.controls };
        const updatedControl = { ...updatedControls[field] };
        let updatedControlValidation = { ...updatedControl.validation }

        updatedControl.value = updatedValue;

        const { valid, validation } = this.validateInput(updatedValue, updatedControl.validation, field);

        updatedControl.valid = valid;
        updatedControl.touched = true;
        updatedControlValidation = Object.keys(updatedControlValidation).reduce((acc, v) => {
            acc[v] = {
                value: updatedControlValidation[v].value,
                errorMsg: updatedControlValidation[v].errorMsg,
                ok: validation[v].ok
            }
            return acc;
        }, {})
        updatedControl.validation = updatedControlValidation;

        updatedControls[field] = updatedControl;
        
        this.setState({ 
            controls: updatedControls,
            validForm: Object.keys(updatedControls).every(control => updatedControls[control].valid)
        });        
    }   

    generateInput(inputtype, config) {
        let value = '';
        if (inputtype === 'select') value = config.options[0].value;
        return { inputtype, config, value, touched: false };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.validForm) {
            const authInfo = Object.keys(this.state.controls).map(control => ({
                field: control,
                value: this.state.controls[control].value
            }))

            const method = {
                SIGN_UP: 'sign up',
                SIGN_IN: 'sign in'
            }

            this.state.isSignup ? 
            this.props.authUser(authInfo, method.SIGN_UP) :
            this.props.authUser(authInfo, method.SIGN_IN);
        }
    }

    switchAuthMethod = e => {
        e.preventDefault();

        this.setState(prevState => ({
            isSignup: !prevState.isSignup
        }))
    }

    render() {        
        const { controls } = this.state;

        const formOrSpinner = 
        this.props.auth.authStatus.isProcessing ?
        <Spinner /> :
        (
            <div className = { classes.Auth }>
                <h4>{ this.state.isSignup ? 'Sign up below' : 'Enter your login info below' }</h4>

                { this.props.auth.authStatus.error ?
                (
                    <h5 style = {{ textAlign: 'center', color: 'red' }}>
                     Sorry, { this.props.auth.authStatus.errorInfo.message.toLowerCase().split('_').join(' ') }
                    </h5>
                ) : null }

                <form action="">
                    { Object.keys(controls).map(field => (
                        <Input
                        key = { controls[field].config.id }
                        { ...controls[field] }
                        changed = { e => this.handleInput(e, field) }
                        shouldValidate = { controls[field].validation }

                        error = { 
                            Object
                            .keys(controls[field].validation)
                            .map((v, i) => {
                                return {
                                    key: i,
                                    errorMsg: controls[field].validation[v].errorMsg,
                                    ok: controls[field].validation[v].ok
                                }
                            }) }
                        />
                    )) }
                    <div>
                        <Button 
                        btnType = "Success"
                        clicked = { e => this.handleSubmit(e) }>
                        Submit
                        </Button>
                    </div>
                    
                    <div>
                        <Button
                        btnType = "Danger"
                        clicked = { e => this.switchAuthMethod(e) }>
                        Switch to { this.state.isSignup ? 'Sign in' : 'Sign up' }
                        </Button>
                    </div>
                </form>
            </div>
        )
        
        return formOrSpinner
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    authUser: (authInfo, method) => dispatch(authAsync(authInfo, method))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);