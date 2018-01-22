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
            address: { 
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
                 })
            },
            email: this.generateInput('input', {
                id: "email",
                name: "email",                    
                label: "Email",
                type:  "text",
                placeholder: "Your e-mail..."   
            }),
            fastDelivery: this.generateInput('input', {
                id: "fastDelivery", 
                name: "fastDelivery",                    
                label: "Fast delivery? (Additional $5 tax)",
                type: "checkbox",                    
                checked: false
            })
        }
    }

    generateInput(inputtype, config) {
        config['value'] = '';
        return { inputtype, config };
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
            price: this.state.fields.fastDelivery.config.checked ? this.state.price + 5 : this.state.price,
            fastDelivery: this.state.fields.fastDelivery.config.checked
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

        setTimeout(() => {
            document.querySelector('input[name="name"]').focus()
        }, 1000);        
    }

    handleInput = e => {
        let updatedValue = e.target.value;

        switch(e.target.getAttribute('name')) {

            case 'name':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields }
                    updatedFields.name.config.value = updatedValue
                    return { fields: updatedFields }
                })
                break;

            case 'email':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields }
                    updatedFields.email.config.value = updatedValue
                    return { fields: updatedFields }
                })
                break;

            case 'street':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields }
                    updatedFields.address.street.config.value = updatedValue
                    return { fields: updatedFields }
                })
                break;

            case 'postalCode':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields }
                    updatedFields.address.postalCode.config.value = updatedValue
                    return { fields: updatedFields }
                })
                break;
            
            case 'fastDelivery':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields };
                    updatedFields.fastDelivery.config.checked = !prevState.fields.fastDelivery.config.checked;
                    return updatedState;
                })
                break;

            default:
                console.log('Oops, could not update field!');        
        }
    }

    render() {
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
                    <Input 
                    { ...this.state.fields.name }
                    changed = { this.handleInput } />

                    <Input
                    { ...this.state.fields.email }
                    changed = { this.handleInput }
                    />

                    <label htmlFor="address">
                        Address: 
                        <Input 
                        { ...this.state.fields.address.street }
                        changed = { this.handleInput }
                        />
                        <Input 
                        { ...this.state.fields.address.postalCode }
                        changed = { this.handleInput } />
                    </label>
                    <Input
                    changed = { this.handleInput }
                    { ...this.state.fields.fastDelivery } />

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