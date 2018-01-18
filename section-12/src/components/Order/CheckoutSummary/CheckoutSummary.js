import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const checkoutSummary = props => (
    <div className = { classes.CheckoutSummary }>
        <h1 style = {{ marginBottom: '5rem' }}>We hope it tastes good!</h1>
        <div style = {{ width: '100%' }}>
            <Burger style = {{ width: '42rem' }} ingredients = { props.ingredients } />
        </div>
        <div className = { classes.Buttons }>
            <Button 
            btnType = "Success"
            clicked = { props.checkout }>Submit</Button>
            <Button 
            btnType = "Danger"
            clicked = { props.cancel }>Cancel</Button>
        </div>
    </div>
);

export default checkoutSummary;