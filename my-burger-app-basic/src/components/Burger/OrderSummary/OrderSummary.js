import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredients = 
    Object
    .keys(props.ingredients)
    .filter(ing => props.ingredients[ing])
    .map(ing => (
        <li        
        key={ ing }>
        <span style = {{ textTransform: 'capitalize' }}>
            { ing }
        </span>: { props.ingredients[ing] }</li>
    ));

    return (
        <Aux>
            <h3>Your order:</h3>
            <p>A delicious order with the following ingredients:</p>
            <ul>
                { ingredients }
            </ul>
            <p><strong>Total Price: { props.price.toFixed(2) } </strong></p>
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