import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export default class Checkout extends Component {
    state = {
        loading: false,
        ingredients: {
            meat: 1,
            cheese: 1,
            bacon: 1,
            salad: 1
        }
    }

    componentDidMount() {
        const { search } = this.props.location;
        const urlParams = new URLSearchParams(search.slice(1));
        const ingredients = {};

        for (let pair of urlParams.entries()) {
            ingredients[pair[0]] = Number(pair[1]);
        }

        this.setState({ ingredients });
    }
    render() {
        return (
            <div>
                <CheckoutSummary ingredients = { this.state.ingredients } />
            </div>
        )
    }
}