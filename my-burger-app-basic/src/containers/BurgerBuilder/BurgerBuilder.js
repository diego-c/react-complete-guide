import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            'meat': 0,
            'cheese': 0,
            'salad': 0,
            'bacon': 0
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