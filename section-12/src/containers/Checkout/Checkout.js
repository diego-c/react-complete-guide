import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export default class Checkout extends Component {
    state = {
        ingredients: {
            meat: 1,
            cheese: 1,
            bacon: 1,
            salad: 1
        }
    }

    checkoutCancelHandler = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients = { this.state.ingredients }
                cancel = { this.checkoutCancelHandler } />
            </div>
        )
    }
}