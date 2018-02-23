import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';

const checkoutSummary = props => (
    <div className = { classes.CheckoutSummary }>
        <h1 style = {{ marginBottom: '5rem' }}>We hope it tastes good!</h1>
        <div style = {{ width: '100%' }}>
            <Burger style = {{ width: '100%' }} 
            ingredients = { props.ingredients } />
        </div>
        <div className = { classes.Buttons }>
            <Button 
            btnType = "Success"
            clicked = { props.continue }>Submit</Button>
            <Button 
            btnType = "Danger"
            clicked = { props.cancel }>Cancel</Button>
        </div>
    </div>
);

checkoutSummary.propTypes = {
    clicked: PropTypes.func,
    ingredients: PropTypes.shape({
        meat: PropTypes.shape({
          amount: PropTypes.number.isRequired,
          price: PropTypes.number.isRequired  
        }),
        cheese: PropTypes.shape({
          amount: PropTypes.number.isRequired,
          price: PropTypes.number.isRequired  
        }),
        salad: PropTypes.shape({
          amount: PropTypes.number.isRequired,
          price: PropTypes.number.isRequired  
        }),
        bacon: PropTypes.shape({
            amount: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired
        })
    }).isRequired
}

export default checkoutSummary;