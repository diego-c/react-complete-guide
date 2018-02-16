import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    /* componentWillMount() {
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
              
        /* this.setState({ ingredients, price });
    } */

    render() {
        return (
            this.props.ingredients ? (
                <div>
                    <CheckoutSummary 
                    ingredients = { this.props.ingredients }
                    continue = { this.checkoutContinueHandler }
                    cancel = { this.checkoutCancelHandler } />

                    <Route path={ this.props.match.url + "/contact-data" } component = { ContactData } />
                </div>
            ) : <Redirect to = "/" />
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.info.ingredients,
    price: state.info.price
})

export default connect(mapStateToProps)(Checkout);