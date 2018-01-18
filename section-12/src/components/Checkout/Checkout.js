import React, { Component } from 'react';
import Field from './Field/Field';
import './Checkout.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../UI/Button/Button';
import axios from '../../axios-order';
import Spinner from '../UI/Spinner/Spinner';

class Checkout extends Component {
    state = {
        loading: false,
        finished: false,
        fields: [
            {
                name: null,
                type: 'text'
            },
            {
                email: null,
                type: 'email'
            },
            {
                phone: null,
                type: 'tel'
            },
            {
                address: null,
                type: 'text'
            }
        ]
    }

    handleInput = (field, val) => {
        const updatedFields = [ ...this.state.fields ];
        const toBeUpdated = { ...updatedFields.find(f => Object.keys(f)[0] === field) };

        toBeUpdated[field] = val;
        const fieldIndex = updatedFields.findIndex(f => Object.keys(f)[0] === field);
        updatedFields[fieldIndex] = toBeUpdated;
        
        this.setState({ fields: updatedFields });
    }

    async handleSubmit() {
        let order;
        this.setState({ loading: true });
        try {
            order = await axios.post('/orders.json', {
                ingredients: this.props.ingredients,
                price: this.props.price,
                customer: { ...this.state.fields }
            })
            this.setState({ loading: false, finished: true });
        } catch(err) {
            console.log('Oops, could not checkout!', err);
        }
    }

    render() {
        const checkout = 
        this.state.finished ? 
        <h2>Thank you for your order!</h2>
        : this.state.loading ? <Spinner /> : (
            <Aux>
                { this.state.fields.map(field => (
                    <Field
                    field = { Object.keys(field)[0] }
                    fieldType = { Object.keys(field)[1] }
                    key= { Object.keys(field)[0] }
                    handleInput = { this.handleInput.bind(this, Object.keys(field)[0]) }
                    />
                )) }
                <Button
                clicked = { this.handleSubmit.bind(this) }>Submit</Button>
            </Aux>
        )

        return checkout;
    }
}

export default Checkout;