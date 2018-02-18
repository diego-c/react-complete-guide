import actions from '../actions/actionTypes';
import updateObject from './utils/utils';

const addIngredient = (state, action) => {
    return {
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