import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        price: 0,
        fields: {
            name: '',
            address: { 
                street: '',
                postalCode: ''
            },
            email: ''
        }
    }

    orderHandler = e => {
        e.preventDefault();
        // Here we have access to ingredients and the total price easily via props!
        //console.log(this.props);
        console.log('To be sent: ', this.state);
    }

    componentDidMount() {
        this.setState({ price: this.props.price });
        
        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
        })
    }

    handleInput = e => {
        let updatedValue = e.target.value;
        console.log(`Updated value: ${updatedValue}`);

        switch(e.target.id) {

            case 'name':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields }
                    updatedFields.name = updatedValue
                    return { fields: updatedFields }
                })
                break;

            case 'email':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields }
                    updatedFields.email = updatedValue
                    return { fields: updatedFields }
                })
                break;

            case 'street':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields }
                    updatedFields.address.street = updatedValue
                    return { fields: updatedFields }
                })
                break;

            case 'postalCode':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    const updatedFields = { ...updatedState.fields }
                    updatedFields.address.postalCode = updatedValue
                    return { fields: updatedFields }
                })
                break;

            default:
                console.log('Oops, could not update field!');        
        }
    }

    render() {
        return (
            <div className = { classes.ContactData }>
                <h4>Enter your contact data below</h4>
                <form action="">
                    <label htmlFor="name">
                        Name: 
                        <input 
                        id="name"
                        type="text"
                        placeholder="Your name..."
                        value = { this.state.fields.name }
                        onChange = { this.handleInput } />
                    </label>
                    <label htmlFor="email">
                        E-mail: 
                        <input
                        id="email"
                        type="email"
                        placeholder="Your e-mail..."
                        value = { this.state.fields.email }
                        onChange = { this.handleInput } />
                    </label>
                    <label htmlFor="address">
                        Address: 
                        <label htmlFor="street">
                            Street: 
                            <input
                            id = "street"
                            type="text"
                            placeholder="St..."
                            onChange = { this.handleInput } />
                        </label>
                        <label htmlFor="postalCode">
                            Postal Code: 
                            <input
                            id = "postalCode"
                            type="number"
                            placeholder="ZIP..."
                            onChange = { this.handleInput } />
                        </label>
                    </label>
                    <Button
                    btnType = "Success"
                    clicked = { this.orderHandler }>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;