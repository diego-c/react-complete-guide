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
            name: this.generateInput('input', {
                id: "name",
                type: "text",
                name: "name",                
                label: "Name",
                placeholder: "Your name.."
            }),
            street: this.generateInput('input', {
                id: "street",
                name:"street",
                type:"text",                 
                label: "Street",
                placeholder:"St..."
            }),
            postalCode: this.generateInput('input', {
                id: "postalCode",
                name: "postalCode",
                type: "number",                  
                label: "Postal Code",
                placeholder: "ZIP..."
            }),
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

    orderHandler = e => {
        e.preventDefault();
        // Here we have access to ingredients and the total price easily via props!
        //console.log(this.props);

        // Send order
        this.setState({ loading: true });
        axios.post('/orders.json', {
            date: (new Date()).toString(),
            ingredients: this.props.ingredients,
            customer: this.state.fields,
            price: this.state.fields.deliveryMethod.value === 'fast' ? this.state.price + 8 : this.state.price + 4,
            deliveryMethod: this.state.fields.deliveryMethod.value
        })
        .then(res => {            
            this.setState({ loading: false, sent: true }, () => {
                setTimeout(() => {
                    this.props.history.replace('/');
                }, 3000);
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({ loading: false });
        })
    }

    async componentDidMount() {
        this.setState({ price: this.props.price });
        
        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
        })

        if (document.querySelector('input[name="name"]')) {
            setTimeout(() => {
                document.querySelector('input[name="name"]').focus()
            }, 1000);
        }        
    }

    handleInput = e => {
        let updatedValue = e.target.value;

        switch(e.target.getAttribute('name')) {

            case 'name':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields }
                    updatedFields.name.value = updatedValue
                    return { fields: updatedFields }
                })
                break;

            case 'email':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields }
                    updatedFields.email.value = updatedValue
                    return { fields: updatedFields }
                })
                break;

            case 'street':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields }
                    updatedFields.street.value = updatedValue
                    return { fields: updatedFields }
                })
                break;

            case 'postalCode':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields }
                    updatedFields.postalCode.value = updatedValue
                    return { fields: updatedFields }
                })
                break;
            
            case 'deliveryMethod':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields };
                    updatedFields.deliveryMethod.value = updatedValue;
                    return { fields: updatedFields };
                })
                break;

            default:
                console.log('Oops, could not update field!');        
        }
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
                        changed = { this.handleInput }
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