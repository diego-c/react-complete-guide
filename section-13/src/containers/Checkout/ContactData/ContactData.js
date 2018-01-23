import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        sent: false,
        loading: false,
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
        if (inputtype === 'select') value = config.options[0].value
        return { inputtype, config, value };
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
        const updatedFields = { ...this.state.fields };
        const updatedField = { ...this.state.fields[field] };

        updatedField.value = updatedValue;

        updatedField.valid = this.validateInput(updatedValue, updatedField.validation);

        updatedFields[field] = updatedField;
        
        this.setState({ fields: updatedFields });        
    }
    
    orderHandler = e => {
        e.preventDefault();  

        const { fields } = this.state,
        { price } = this.state,
        { ingredients } = this.props,
        { history } = this.props,
        customer = Object.keys(fields).reduce((acc, field) => {
            if (field !== 'deliveryMethod') {
                acc[field] = fields[field].value;
            }
            return acc;
        }, {})     
        // Here we have access to ingredients and the total price easily via props!
        //console.log(this.props);

        // Send order
        this.setState({ loading: true });
        axios.post('/orders.json', {
            date: (new Date()).toString(),
            ingredients,
            customer,
            price: fields.deliveryMethod.value === 'fast' ? price + 8 : price + 4,
            deliveryMethod: fields.deliveryMethod.value
        })
        .then(res => {            
            this.setState({ loading: false, sent: true }, () => {
                setTimeout(() => {
                    history.replace('/');
                }, 3000);
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({ loading: false });
        })
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


    render() {
        const { fields } = this.state;   

        let formOrSpinner = null;

        this.state.loading ?
        formOrSpinner = <Spinner /> :

        this.state.sent ? 
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
                    />            
                )) }

                    <Button
                    btnType = "Success"
                    clicked = { this.orderHandler }>ORDER</Button>
                </form>
            </div>
        )

        return formOrSpinner;
    }
}

export default withErrorHandler(ContactData, axios);