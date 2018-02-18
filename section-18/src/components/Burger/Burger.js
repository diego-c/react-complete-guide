import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = props => {
    let transformedIngredients = [];
    Object.keys(props.ingredients).forEach(ingredient => {
        for (let i = 0; i < props.ingredients[ingredient].amount; i++) {
            transformedIngredients.push(<BurgerIngredient type = { ingredient } key = { ingredient + i } />);
        }
    });
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p style = {{ fontSize: '2rem', margin: '3rem auto' }}>Please start adding ingredients</p>;
    }
    //transformedIngredients.reduce((acc, arr) => [...acc, ...arr], []);
    return (
        <div className = { classes.Burger }>
            <BurgerIngredient type = "bread-top" />
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

burger.propTypes = {
    ingredients: PropTypes.shape({
        'meat': PropTypes.shape({
            amount: PropTypes.number,
            price: PropTypes.number
        }),
        'cheese': PropTypes.shape({
            amount: PropTypes.number,
            price: PropTypes.number
        }),
        'salad': PropTypes.shape({
            amount: PropTypes.number,
            price: PropTypes.number
        }),
        'bacon': PropTypes.shape({
            amount: PropTypes.number,
            price: PropTypes.number
        })
    }).isRequired
}
export default burger;