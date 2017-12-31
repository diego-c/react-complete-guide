import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            'meat': 2,
            'cheese': 2,
            'salad': 1,
            'bacon': 1
        }
    }

    render() {
        return (
            <Aux>
                <Burger ingredients = { this.state.ingredients } />
                <div>Burger controls</div>
            </Aux>
        )
    }
}