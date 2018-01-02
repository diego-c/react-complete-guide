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
            const newPrice = prevState.totalPrice + INGREDIENT_PRICES[type];
            return { ingredients: currentIngredients, totalPrice: newPrice };
        });
    };

    removeIngredientHandler = type => {
        this.setState(prevState => {
            const currentIngredients = { ...prevState.ingredients };
            let newPrice = prevState.totalPrice;
            if (currentIngredients[type] > 0) {
                currentIngredients[type]--;
            }
            if (newPrice - INGREDIENT_PRICES[type] >= 4.00) {
                newPrice -= INGREDIENT_PRICES[type];
            }
            
            return { ingredients: currentIngredients, totalPrice: newPrice };
        });
    };

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let ing in disabledInfo) {
            if (disabledInfo[ing] <= 0) {
                disabledInfo[ing] = true
            } else {
                disabledInfo[ing] = false;
            }
        }
        return (
            <Aux>
                <Burger ingredients = { this.state.ingredients } />
                <BuildControls 
                ingredientAdded = { this.addIngredientHandler } 
                ingredientRemoved = { this.removeIngredientHandler }
                disabledInfo = { disabledInfo }
                price = { this.state.totalPrice } />
            </Aux>
        )
    }
}