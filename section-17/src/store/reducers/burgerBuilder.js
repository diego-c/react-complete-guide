import actions from '../actions/actionTypes';
import updateObject from './utils/utils';

export default (state = { }, action) => {

    switch (action.type) {

        case actions.ADD_INGREDIENT:
            return {
                ingredients: updateObject(state.ingredients, {
                    [action.ingredient]: updateObject(state.ingredients[action.ingredient], {
                        amount: state.ingredients[action.ingredient].amount + 1
                    })
                }),
                price: state.price + state.ingredients[action.ingredient].price
            }           

        case actions.REMOVE_INGREDIENT:

            if (state.ingredients[action.ingredient].amount > 0) {

                return {
                    ingredients: updateObject(state.ingredients, {
                        [action.ingredient]: updateObject(state.ingredients[action.ingredient], {
                            amount: state.ingredients[action.ingredient].amount - 1
                        })
                    }),
                    price: state.price - state.ingredients[action.ingredient].price
                }                    
            }
            break;

        default:
            return state;
    }
}