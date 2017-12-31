import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import BurgerIngredient from '../components/Burger/BurgerIngredient/BurgerIngredient';

export default class BurgerBuilder extends Component {
    render() {
        return (
            <Aux>
                <div>Burger</div>
                <div>Burger controls</div>
                <BurgerIngredient type="whatever" />
            </Aux>
        )
    }
}