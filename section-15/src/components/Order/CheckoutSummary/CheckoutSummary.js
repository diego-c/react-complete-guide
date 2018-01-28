import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';

const checkoutSummary = props => (
    <div className = { classes.CheckoutSummary }>
        <h1 style = {{ marginBottom: '5rem' }}>We hope it tastes good!</h1>
        <div style = {{ width: '100%' }}>
            <Burger style = {{ width: '42rem' }} 
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
        meat: PropTypes.number,
        cheese: PropTypes.number,
        salad: PropTypes.number,
        bacon: PropTypes.number
    }).isRequired
}

export default checkoutSummary;