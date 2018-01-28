import actions from '../actions/actions';


export default (state = { ingredients: {}, price: 4 }, action) => {

    switch (action.type) {

        case actions.ADD_INGREDIENT:

            const currentState = { ...state };
            const currentIngredients = { ...currentState.ingredients };
            const ingredientChanged = { ...currentIngredients[action.ingredient] };

            ingredientChanged.amount = Number(ingredientChanged.amount) + 1;

            currentIngredients[action.ingredient] = ingredientChanged;

            currentState.ingredients = currentIngredients;
            currentState.price += Number(currentIngredients[action.ingredient].price)
            
            return currentState;

        case actions.REMOVE_INGREDIENT:

            if (state.ingredients[action.ingredient].amount > 0) {

                const currentState = { ...state };
                const currentIngredients = { ...currentState.ingredients };
                const ingredientChanged = { ...currentIngredients[action.ingredient] };

                ingredientChanged.amount = Number(ingredientChanged.amount) - 1;

                currentIngredients[action.ingredient] = ingredientChanged;

                currentState.ingredients = currentIngredients;
                currentState.price -= Number(currentIngredients[action.ingredient].price)

                return currentState;
            }
            break;

        default:
            return state;
    }
}