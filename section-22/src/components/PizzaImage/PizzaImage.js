import React from 'react';
import classes from './PizzaImage.css';
import pizzaImg from '../../assets/pizza.jpg';

const PizzaImage = props => {
    return (
        <div className = { classes.PizzaImage }>
            <img 
            src={ pizzaImg }
            alt="pizza"
            className = { classes.PizzaImg }
            />
        </div>        
    )
}

export default PizzaImage;