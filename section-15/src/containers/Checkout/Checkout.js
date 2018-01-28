import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export default class Checkout extends Component {
    state = {
        price: 0,
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
        // Alternative: using state instead of query params
        
        let ingredients, price;

        if(this.props.location.state) {
            ingredients = this.props.location.state.ingredients;
            price = this.props.location.state.price
        } else {
            this.props.history.replace('/');
        }

        /* const paramsIterator = new URLSearchParams(this.props.location.search).entries();

        const ingredients = {};  
        for (let pair of paramsIterator) {
            ingredients[pair[0]] = Number(pair[1]);
        } */
              
        this.setState({ ingredients, price });
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients = { this.state.ingredients }
                continue = { this.checkoutContinueHandler }
                cancel = { this.checkoutCancelHandler } />

                <Route path={ this.props.match.url + "/contact-data" } render = { props => <ContactData ingredients = { this.state.ingredients } price = { this.state.price } {...props} /> } />
            </div>
        )
    }
}