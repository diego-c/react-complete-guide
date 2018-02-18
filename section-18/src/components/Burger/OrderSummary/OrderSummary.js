import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

// class component only for debugging purposes

class OrderSummary extends Component {
    
    render() {

        const ingredients = 
        Object
            .keys(this.props.ingredients)
            .filter(ing => this.props.ingredients[ing].amount)
            .map(ing => (
                            <li
                            className = { classes.OrderItem }      
                            key={ ing }>
                            <span style = {{ textTransform: 'capitalize', color: '#952ab2' }}>
                                { ing }
                            </span>: <strong>{ this.props.ingredients[ing].amount }</strong></li>
                        ));

        return (
            <Aux>
                <h3 className = {classes.OrderTitle }>Your order:</h3>
                <p className = { classes.OrderSubtitle }>A delicious order with the following ingredients:</p>
                <ul className = { classes.OrderList }>
                    { ingredients }
                </ul>
                <p className = { classes.OrderPrice }><strong>Total Price: { this.props.price.toFixed(2) } </strong></p>
                <p>Continue to checkout?</p>
                <Button
                btnType = "Danger"
                clicked = { this.props.cancel }>
                    CANCEL
                </Button>
    
                <Button
                btnType = "Success"
                clicked = { this.props.continue }>
                    CONTINUE
                </Button>
            </Aux>
        );
    }
}

OrderSummary.propTypes = {
    ingredients: PropTypes.shape({
        'meat': PropTypes.shape({
            amount: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired
        }),
        'cheese': PropTypes.shape({
            amount: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired
        }),
        'salad': PropTypes.shape({
            amount: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired
        }),
        'bacon': PropTypes.shape({
            amount: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired
        })
    }).isRequired,
    price: PropTypes.number.isRequired,
    cancel: PropTypes.func.isRequired,
    continue: PropTypes.func.isRequired
}

export default OrderSummary;