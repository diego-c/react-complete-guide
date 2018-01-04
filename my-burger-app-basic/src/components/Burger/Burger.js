import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = props => {
    let transformedIngredients = [];
    Object.keys(props.ingredients).forEach(ingredient => {
        for (let i = 0; i < props.ingredients[ingredient]; i++) {
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
        'meat': PropTypes.number,
        'cheese': PropTypes.number,
        'salad': PropTypes.number,
        'bacon': PropTypes.number
    }).isRequired
}
export default burger;