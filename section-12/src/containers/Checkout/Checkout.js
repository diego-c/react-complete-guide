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
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentDidMount() {
        const paramsIterator = new URLSearchParams(this.props.location.search).entries();

        const ingredients = {};  
        for (let pair of paramsIterator) {
            ingredients[pair[0]] = Number(pair[1]);
        }
              
        this.setState({ ingredients });
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients = { this.state.ingredients }
                continue = { this.checkoutContinueHandler }
                cancel = { this.checkoutCancelHandler } />
            </div>
        )
    }
}