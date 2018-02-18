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
        fields: {
            name: { ...this.generateInput('input', {
                id: "name",
                type: "text",
                name: "name",                
                label: "Name",
                placeholder: "Your name.."
            }),
                validation: {
                    required: true
                },
                errorMsg: 'This field is required',
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
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                errorMsg: 'Six characters are required for this field',
                valid: false
            },
            email: this.generateInput('input', {
                id: "email",
                name: "email",                    
                label: "Email",
                type:  "text",
                placeholder: "Your e-mail..."   
            }),
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
        const updatedValue = e.target.value;
        const updatedState = { ...this.state };
        const updatedFields = { ...updatedState.fields };
        const updatedField = { ...updatedFields[field] };

        updatedField.value = updatedValue;

        updatedField.valid = this.validateInput(updatedValue, updatedField.validation);
        updatedField.touched = true;

        updatedFields[field] = updatedField;
        const canOrder = this.canOrder(updatedFields);
        
        this.setState({ fields: updatedFields, canOrder });        
    }

    orderHandler = e => {
        e.preventDefault();  

        const { fields } = this.state,
        { price } = this.props,
        { ingredients } = this.props,
        //{ history } = this.props,
        customer = Object.keys(fields).reduce((acc, field) => {
            if (field !== 'deliveryMethod') {
                acc[field] = fields[field].value;
            }
            return acc;
        }, {});     

        const orderInfo = {
            date: (new Date()).toString(),
            ingredients,
            customer,
            price: fields.deliveryMethod.value === 'fast' ? price + 8 : price + 4,
            deliveryMethod: fields.deliveryMethod.value
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

    canOrder = (fields) => {
        const checkValidation = [];

        for (let field in fields) {
            if (field !== 'deliveryMethod') {            
                if (fields[field].touched) {
                    if (Object.keys(fields[field]).includes('valid')) {
                        checkValidation.push(fields[field].valid);         
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
        const { fields } = this.state;   

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
                { Object.keys(fields).map(field => (
                    <Input
                        key = { fields[field].config.id }
                        { ...fields[field] }
                        changed = { e => this.handleInput(e, field) }
                        shouldValidate = { fields[field].validation } 
                        error = { fields[field].errorMsg ? fields[field].errorMsg : null }                      
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
            return <h1 style={{ textAlign: 'center' }}>Sorry, you need to be authenticated to make orders</h1>
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