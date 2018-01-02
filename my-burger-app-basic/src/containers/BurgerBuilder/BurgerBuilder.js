import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    'meat': 1.3,
    'salad': 0.5,
    'cheese': 0.3,
    'bacon': 0.7
}

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            'meat': 0,
            'cheese': 0,
            'salad': 0,
            'bacon': 0
        },
        totalPrice: 4
    }

    addIngredientHandler = type => {
        this.setState(prevState => {
            const currentIngredients = { ...prevState.ingredients };
            currentIngredients[type]++;
            return { ingredients: currentIngredients, totalPrice: parseFloat((prevState.totalPrice + INGREDIENT_PRICES[type]).toFixed(2)) };
        });
    };

    removeIngredientHandler = type => {
        this.setState(prevState => {
            const currentIngredients = { ...prevState.ingredients };
            let newPrice = prevState.totalPrice;
            if (currentIngredients[type] > 0) {
                currentIngredients[type]--;
            }
            if (prevState.totalPrice - INGREDIENT_PRICES[type] >= 4) {
                newPrice -= INGREDIENT_PRICES[type];
            }
            return { ingredients: currentIngredients, totalPrice: parseFloat((newPrice).toFixed(2)) };
        });
    };

    render() {
        return (
            <Aux>
                <Burger ingredients = { this.state.ingredients } />
                <BuildControls ingredientAdded = { this.addIngredientHandler } />
            </Aux>
        )
    }
}