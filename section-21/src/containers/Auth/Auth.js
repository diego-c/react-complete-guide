import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authAsync } from '../../store/actions/index';
import generateInput from '../../shared/generateInput';
import validateInput from '../../shared/validateInput';

class Auth extends Component {

    constructor(props) {
        super(props);
        this.generateInput = generateInput.bind(this);
        this.validateInput = validateInput.bind(this);
        this.state = {
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
        
        if (this.props.auth.authData) {
            if (this.props.info.purchasing) {
                return <Redirect to="/checkout" />;
            }
            return <Redirect to="/" />;          
        } else {
            return formOrSpinner
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    info: state.info
})

const mapDispatchToProps = dispatch => ({
    authUser: (authInfo, method) => dispatch(authAsync(authInfo, method))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);