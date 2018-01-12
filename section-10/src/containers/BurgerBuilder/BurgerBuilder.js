import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';

const INGREDIENT_PRICES = {
    'meat': 1.3,
    'salad': 0.5,
    'cheese': 0.3,
    'bacon': 0.7
}

const initState = {
    ingredients: {
        'meat': 0,
        'cheese': 0,
        'salad': 0,
        'bacon': 0
    },
    totalPrice: 4,
    purchasing: false,
    purchasable: false
}

export default class BurgerBuilder extends Component {
    state = { ...initState }    
    
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    updatePurchaseState() {
        Object.values(this.state.ingredients).some(val => val) ?
        this.setState({ purchasable: true }) :
        this.setState({ purchasable: false });
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.purchasing) {
            console.log('Loading your purchase...');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        axios
        .post('/orders.json', {
            ingredients: { ...this.state.ingredients },
            price: this.state.totalPrice,
            customer: {
                id: 1,
                name: 'Diego C'
            }
        })
        .then(() => alert('Thanks for your purchase!'))
        .catch(err => alert(`Sorry, could not complete your purchase! ${err}`));
        this.setState(initState);
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        let isDisabled = false;
        for (let ing in disabledInfo) {
            if (disabledInfo[ing] <= 0) {
                disabledInfo[ing] = true;
            } else {
                disabledInfo[ing] = false;                
            }
        }
        if (!Object.values(disabledInfo).includes(false)) isDisabled = true;
        return (
            <Aux>
                <Modal 
                show = { this.state.purchasing }
                modalClosed = { this.purchaseCancelHandler }>
                    <OrderSummary                     
                     ingredients = { this.state.ingredients }
                     cancel = { this.purchaseCancelHandler }
                     continue = { this.purchaseContinueHandler }
                     price = { this.state.totalPrice }
                    />
                </Modal>
                <Burger ingredients = { this.state.ingredients } />
                <BuildControls 
                ingredientAdded = { this.addIngredientHandler } 
                ingredientRemoved = { this.removeIngredientHandler }
                disabledInfo = { disabledInfo }
                isDisabled = { isDisabled }
                price = { this.state.totalPrice }
                purchase = { this.purchaseHandler } />
            </Aux>
        )
    }
}