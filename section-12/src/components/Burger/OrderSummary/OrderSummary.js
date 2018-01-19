import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';
import Link from 'react-router-dom/Link';

// class component only for debugging purposes

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary] Updating Order Summary!');
    }
    render() {

        const ingredients = 
        Object
            .keys(this.props.ingredients)
            .filter(ing => this.props.ingredients[ing])
            .map(ing => (
                            <li
                            className = { classes.OrderItem }      
                            key={ ing }>
                            <span style = {{ textTransform: 'capitalize', color: '#952ab2' }}>
                                { ing }
                            </span>: <strong>{ this.props.ingredients[ing] }</strong></li>
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
                cancel = { this.props.cancel }>                
                    CANCEL
                </Button>
    
                <Button
                btnType = "Success"
                >
                <Link to={{
                    pathname:'/checkout',
                    search: `?meat=${this.props.ingredients.meat}&cheese=${this.props.ingredients.cheese}&salad=${this.props.ingredients.salad}&bacon=${this.props.ingredients.bacon}`
                }}>
                    CONTINUE
                </Link>
                </Button>
            </Aux>
        );
    }
}

OrderSummary.propTypes = {
    ingredients: PropTypes.shape({
        'meat': PropTypes.number,
        'cheese': PropTypes.number,
        'salad': PropTypes.number,
        'bacon': PropTypes.number
    }).isRequired,
    price: PropTypes.number.isRequired,
    cancel: PropTypes.func,
    continue: PropTypes.func
}

export default OrderSummary;