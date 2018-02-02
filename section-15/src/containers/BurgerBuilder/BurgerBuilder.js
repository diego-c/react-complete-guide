import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient } from '../../store/actions/actions';

const INGREDIENT_PRICES = {
    'meat': 1.3,
    'salad': 0.5,
    'cheese': 0.3,
    'bacon': 0.7
}
const initState = {
    ingredients: null,
    totalPrice: 4,
    purchasing: false,
    purchasable: false,
    showSpinner: false,
    error: null
}

class BurgerBuilder extends Component {
    state = { ...initState }    
    
    /* async componentDidMount() {
        let data = null;
        try {
            data = await axios.get(`/ingredients.json`);
            this.props.fetchIngredients(actions.FETCH_INGREDIENTS, data);        
        } catch(error) {
            this.props.fetchIngredients(actions.FETCH_INGREDIENTS_FAILURE, error);
        }
        this.props.fetchIngredients(actions.FETCH_INGREDIENTS_SUCCESS, data);
    } */

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
        this.props.history.push('/');
    }

    purchaseContinueHandler = () => { 
            // Alternative: using state instead of query params

            this.props.history.push({
                pathname: '/checkout',
                state: { ingredients: this.state.ingredients, price: this.state.totalPrice }
            });         
    }

    render() {

        const disabledInfo = { ...this.props.ingredients };

        let isDisabled = false;
        for (let ing in disabledInfo) {
            if (disabledInfo[ing].amount <= 0) {
                disabledInfo[ing] = true;
            } else {
                disabledInfo[ing] = false;                
            }
        }
        if (!Object.values(disabledInfo).includes(false)) isDisabled = true;

        let summaryOrSpinner;

        if (!this.state.showSpinner && this.props.ingredients) {
            summaryOrSpinner = (
                <OrderSummary                     
                     ingredients = { this.props.ingredients }
                     cancel = { this.purchaseCancelHandler }
                     continue = { this.purchaseContinueHandler }
                     price = { this.props.price }
                />
            )
        }
        else {
            summaryOrSpinner = <Spinner />;
        }

        let burgerOrSpinner;

        this.props.ingredients ?
        burgerOrSpinner = (
            <Aux>
                <Burger ingredients = { this.props.ingredients } />
                    <BuildControls 
                    ingredientAdded = { this.props.addIngredient } 
                    ingredientRemoved = { this.props.removeIngredient }
                    disabledInfo = { disabledInfo }
                    isDisabled = { isDisabled }
                    price = { this.props.price }
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

const mapStateToProps = state => {
    return {
        ingredients: state.info.ingredients,
        price: state.info.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: ingredient => dispatch(addIngredient(ingredient)),
        removeIngredient: ingredient => dispatch(removeIngredient(ingredient))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));