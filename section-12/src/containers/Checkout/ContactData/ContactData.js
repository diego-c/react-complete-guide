import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {
    state = {
        sent: false,
        loading: false,
        price: 0,
        fastDelivery: false,
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

        // Send order
        this.setState({ loading: true });
        axios.post('/orders.json', {
            ingredients: this.props.ingredients,
            customer: this.state.fields,
            price: this.state.fastDelivery ? this.state.price + 5 : this.state.price,
            fastDelivery: this.state.fastDelivery
        })
        .then(res => {
            console.log(res);
            this.setState({ loading: false, sent: true });
        })
        .then(() => {
            setTimeout(() => {
                this.props.history.replace('/');
            }, 3000);
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
            
            case 'fastDelivery':
                this.setState(prevState => {
                    const updatedState = { ...prevState };
                    updatedState.fastDelivery = !prevState.fastDelivery;
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
                    <label htmlFor="fastDelivery">
                        Fast delivery? (Additional $5 tax)
                        <input
                        id="fastDelivery" 
                        type="checkbox"
                        onChange = { this.handleInput }
                        checked = { this.state.fastDelivery } />
                    </label>
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