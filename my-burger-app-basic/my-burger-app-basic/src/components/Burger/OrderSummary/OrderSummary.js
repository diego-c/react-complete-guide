import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

const orderSummary = props => {
    const ingredients = 
    Object
    .keys(props.ingredients)
    .filter(ing => props.ingredients[ing])
    .map(ing => (
        <li
        className = { classes.OrderItem }        
        key={ ing }>
        <span style = {{ textTransform: 'capitalize', color: '#952ab2' }}>
            { ing }
        </span>: <strong>{ props.ingredients[ing] }</strong></li>
    ));

    return (
        <Aux>
            <h3 className = {classes.OrderTitle }>Your order:</h3>
            <p className = { classes.OrderSubtitle }>A delicious order with the following ingredients:</p>
            <ul className = { classes.OrderList }>
                { ingredients }
            </ul>
            <p className = { classes.OrderPrice }><strong>Total Price: { props.price.toFixed(2) } </strong></p>
            <p>Continue to checkout?</p>
            <Button
            btnType = "Danger"
            clicked = { props.cancel }>
                CANCEL
            </Button>

            <Button
            btnType = "Success"
            clicked = { props.continue }>
                CONTINUE
            </Button>
        </Aux>
    );
};

export default orderSummary;