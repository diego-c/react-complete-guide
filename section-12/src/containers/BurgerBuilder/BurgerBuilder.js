import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    'meat': 1.3,
    'salad': 0.5,
    'cheese': 0.3,
    'bacon': 0.7
}
const initState = {
    totalPrice: 4,
    purchasing: false,
    purchasable: false,
    showSpinner: false,
    error: null
}

class BurgerBuilder extends Component {
    state = { ...initState }    
    
    async componentDidMount() {
        let ingredients = null;
        try {
        ingredients = (await axios.get(`/ingredients.json`)).data;
        } catch(error) {
            this.setState({ error });
        }
        this.setState({ ingredients });
    }
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

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => { 
        this.setState({ showSpinner: true }, () => {
            this.props.history.push('/checkout')
        })   
           /*  axios
            .post('/orders.json', {
                ingredients: { ...this.state.ingredients },
                price: this.state.totalPrice,
                customer: {
                    id: 1,
                    name: 'Diego C'
                }
            })
            .then(() => {
                this.setState(initState);  
            })
            .catch(err => {
                this.setState(initState);  
                console.log(`Oops, something went wrong! ${err}`);
            });   */        
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

        let summaryOrSpinner;

        if (!this.state.showSpinner && this.state.ingredients) {
            summaryOrSpinner = (
                <OrderSummary                     
                     ingredients = { this.state.ingredients }
                     cancel = { this.purchaseCancelHandler }
                     continue = { this.purchaseContinueHandler }
                     price = { this.state.totalPrice }
                />
            )
        }
        else {
            summaryOrSpinner = <Spinner />;
        }

        let burgerOrSpinner;

        this.state.ingredients ?
        burgerOrSpinner = (
            <Aux>
                <Burger ingredients = { this.state.ingredients } />
                    <BuildControls 
                    ingredientAdded = { this.addIngredientHandler } 
                    ingredientRemoved = { this.removeIngredientHandler }
                    disabledInfo = { disabledInfo }
                    isDisabled = { isDisabled }
                    price = { this.state.totalPrice }
                    purchase = { this.purchaseHandler } />
            </Aux>
        ) :
        this.state.error ? burgerOrSpinner = <p style={{textAlign: 'center'}}>Sorry, couldn't fetch the ingredients :(</p> : burgerOrSpinner = <Spinner />
        return (
            <Aux>
                <Modal 
                show = { this.state.purchasing }
                modalClosed = { this.purchaseCancelHandler }
                loading = { this.state.showSpinner }>
                    { summaryOrSpinner }
                </Modal>
                { burgerOrSpinner }
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);