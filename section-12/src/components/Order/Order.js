import React from 'react';
import classes from './Order.css';

const order = props => {
    console.log(props);

    return (
    <div className = { classes.Order }>
        <p>To: <strong>{ props.customer }</strong></p>
        <p>Ingredients:</p>
        <ul>
            { Object.keys(props.ingredients).map((ing, key) => (
                props.ingredients[ing] ? (
                <li 
                key= { key }>
                { ing[0].toUpperCase().concat(ing.slice(1)) } {`(${ props.ingredients[ing] })`}
                </li>
                ) : null 
            )) }
        </ul>
        <p>Price: <strong>${ props.price.toFixed(2) }</strong></p>
        <p>Delivery address: <strong>{ props.address.street }, { props.address.postalCode }</strong></p>
        <p>Delivery method: <u><strong>{ props.delivery }</strong></u></p>
    </div>
    )
};

export default order;