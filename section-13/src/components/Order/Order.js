import React from 'react';
import classes from './Order.css';

const order = props => {
    const { name } = props.customer,
    { ingredients } = props,
    price = props.price.toFixed(2),
    { street } = props.customer,
    { postalCode } = props.customer,
    { delivery } = props;

    return (
    <div className = { classes.Order }>
        <p>To: <strong>{ name }</strong></p>
        <p>Ingredients:</p>
        <ul>
            { Object.keys(ingredients).map(ingredient => (
                ingredients[ingredient] ? 
                <li
                key = { ingredient }>
                { ingredient } ( { ingredients[ingredient] } )
                </li>
                :
                null
            )) }
        </ul>
        <p>Price: <strong>$ { price }</strong></p>
        <p>Delivery address: <strong>{ street }, { postalCode }</strong></p>
        <p>Delivery method: <u><strong>{ delivery }</strong></u></p>
    </div>
    )
};

export default order;