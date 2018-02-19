import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../../components/UI/Input/Input';
import { sendOrderAsync } from '../../../store/actions/index'
import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
        isAuth: true,
        canOrder: false,
        price: 0,
        controls: {
            name: { ...this.generateInput('input', {
                id: "name",
                type: "text",
                name: "name",                
                label: "Name",
                placeholder: "Your name.."
            }),
                validation: {
                    required: {
                        value: true,
                        errorMsg: 'This field is required',
                        ok: false
                    }
                },
                valid: false
            },
            street: this.generateInput('input', {
                id: "street",
                name:"street",
                type:"text",                 
                label: "Street",
                placeholder:"St..."
            }),
            postalCode: { ...this.generateInput('input', {
                id: "postalCode",
                name: "postalCode",
                type: "number",                  
                label: "Postal Code",
                placeholder: "ZIP..."
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
                    },
                    maxLength: {
                        value: 6,
                        errorMsg: 'No more than 6 characters are allowed for this field',
                        ok: true
                    },
                    isNumeric: {
                        value: true,
                        errorMsg: 'Only numbers are accepted for this field',
                        ok: true
                    }
                },
                valid: false
            },
            email: { ...this.generateInput('input', {
                id: "email",
                name: "email",                    
                label: "Email",
                type:  "text",
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
                }
            },
            deliveryMethod: this.generateInput('select', {
                id: "deliveryMethod", 
                name: "deliveryMethod",                    
                label: "Choose your delivery method",
                options: [
                    {
                        value: 'normal',
                        displayValue: 'Normal (Additional $4 tax)'
                    },
                    {
                        value: 'fast',
                        displayValue: 'Fast (Additional $8 tax)'
                    }
                ]                
            })
        }
    }

    generateInput(inputtype, config) {
        let value = '';
        if (inputtype === 'select') value = config.options[0].value;
        return { inputtype, config, value, touched: false };
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
        const canOrder = this.canOrder(updatedControls)

        this.setState({ controls: updatedControls, canOrder });        
    }

    orderHandler = e => {
        e.preventDefault();  

        const { controls } = this.state,
        { price } = this.props,
        { ingredients } = this.props,
        //{ history } = this.props,
        customer = Object.keys(controls).reduce((acc, field) => {
            if (field !== 'deliveryMethod') {
                acc[field] = controls[field].value;
            }
            return acc;
        }, {});     

        const orderInfo = {
            date: (new Date()).toString(),
            ingredients,
            customer,
            price: controls.deliveryMethod.value === 'fast' ? price + 8 : price + 4,
            deliveryMethod: controls.deliveryMethod.value
        }
        if (this.props.auth) {
            this.setState({ isAuth: true });
            this.props.sendOrder(this.props.auth.idToken, orderInfo);
        } else {
            this.setState({ isAuth: false });
        }
    }

    redirect = () => {
        if (this.props.order.orderStatus.sent) {

            const { history } = this.props;

            setTimeout(() => {
                history.replace('/');
            }, 3000);
        }
    }

    componentDidMount() {
        this.setState({ price: this.props.price });
        
        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
        })
        
        setTimeout(() => {
            if (document.querySelector('input[name="name"]')) {
                document.querySelector('input[name="name"]').focus()
            }
        }, 1000);                
    }

    canOrder = (controls) => {
        const checkValidation = [];

        for (let field in controls) {
            if (field !== 'deliveryMethod') {            
                if (controls[field].touched) {
                    if (Object.keys(controls[field]).includes('valid')) {
                        checkValidation.push(controls[field].valid);         
                    } else {
                        checkValidation.push(true);                        
                    }
                } else {
                    checkValidation.push(false);                    
                }
            } else {
                checkValidation.push(true);
            }
        }
        return checkValidation.every(entry => entry);
    }

    render() {
        const { controls } = this.state;  

        let formOrSpinner = null;

        this.props.order.orderStatus.isSending ?
        formOrSpinner = <Spinner /> :

        this.props.order.orderStatus.sent ? 
        formOrSpinner = <h4 style = {{textAlign: 'center', padding: '4rem' }}>Thank you for your order, you will be redirected soon...Have a good day!</h4>
        :
        formOrSpinner = (
            <div className = { classes.ContactData }>
                <h4>Enter your contact data below</h4>
                <form action="">
                { Object.keys(controls).map(field => (
                    <Input
                        key = { controls[field].config.id }
                        { ...controls[field] }
                        changed = { e => this.handleInput(e, field) }
                        shouldValidate = { controls[field].validation } 

                        error = { 
                            controls[field].validation ?
                            Object
                            .keys(controls[field].validation)
                            .map((v, i) => {
                                return {
                                    key: i,
                                    errorMsg: controls[field].validation[v].errorMsg,
                                    ok: controls[field].validation[v].ok
                                }
                            }) : null }                     
                    />            
                )) }

                    <Button
                    btnType = { this.state.canOrder ? 'Success' : 'Danger' }                    
                    clicked = { this.state.canOrder ? this.orderHandler : null }>ORDER</Button>
                </form>
            </div>
        )
        this.redirect();
        if (this.state.isAuth) {
        return formOrSpinner;
        } else {
            return <h1 style={{ textAlign: 'center', padding: '4rem' }}>Sorry, you need to be authenticated to make orders</h1>
        }
    }
}

const mapStateToProps = state => ({
    ingredients: state.info.ingredients,
    price: state.info.price,
    order: state.order,
    auth: state.auth.authData
});

const mapDispatchToProps = dispatch => ({
    sendOrder: (token, orderInfo) => dispatch(sendOrderAsync(token, orderInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));