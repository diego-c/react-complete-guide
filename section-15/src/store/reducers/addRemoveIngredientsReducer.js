import {actions} from '../actions/actions';


export default (state = { }, action) => {

    switch (action.type) {

        case actions.ADD_INGREDIENT:
            return {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: {
                        ...state.ingredients[action.ingredient],
                        amount: state.ingredients[action.ingredient].amount + 1
                    }
                },
                price: state.price + state.ingredients[action.ingredient].price
            }

        case actions.REMOVE_INGREDIENT:

            if (state.ingredients[action.ingredient].amount > 0) {

                return {
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredient]: {
                            ...state.ingredients[action.ingredient],
                            amount: state.ingredients[action.ingredient].amount - 1
                        }
                    },
                    price: state.price - state.ingredients[action.ingredient].price
                }                    
            }
            break;

        default:
            return state;
    }
}