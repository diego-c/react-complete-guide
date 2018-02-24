import actions from '../actions/actionTypes';
import updateObject from '../../shared/updateObject';

const addIngredient = (state, action) => {
    return {
        purchasing: true,
        ingredients: updateObject(state.ingredients, {
            [action.ingredient]: updateObject(state.ingredients[action.ingredient], {
                amount: state.ingredients[action.ingredient].amount + 1
            })
        }),
        price: state.price + state.ingredients[action.ingredient].price
    }
}

const removeIngredient = (state, action) => {   

    return {
        purchasing: Object.keys(state.ingredients).some(ingredient => {
            return ingredient !== action.ingredient ? state.ingredients[ingredient].amount > 0 : false
        }),
        ingredients: updateObject(state.ingredients, {
            [action.ingredient]: updateObject(state.ingredients[action.ingredient], {
                amount: state.ingredients[action.ingredient].amount - 1
            })
        }),
        price: state.price - state.ingredients[action.ingredient].price
    }
}

export default (state = { }, action) => {

    switch (action.type) {

        case actions.ADD_INGREDIENT:
            return addIngredient(state, action);

        case actions.REMOVE_INGREDIENT:
            if (state.ingredients[action.ingredient].amount > 0) {
                return removeIngredient(state, action);
            }
            break;            

        default:
            return state;
    }
}