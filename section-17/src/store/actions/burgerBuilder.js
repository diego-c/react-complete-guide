import actions from './actionTypes';

export function addIngredient(ingredient) {
    return {
        type: actions.ADD_INGREDIENT,
        ingredient
    }
}

export function removeIngredient(ingredient) {
    return {
        type: actions.REMOVE_INGREDIENT,
        ingredient
    }
}