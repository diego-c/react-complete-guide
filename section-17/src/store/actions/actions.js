export const actions = {
    ADD_INGREDIENT: 'add',
    REMOVE_INGREDIENT: 'remove',
    FETCH_INGREDIENTS: 'fetch',
    FETCH_INGREDIENTS_SUCCESS: 'fetch_success',
    FETCH_INGREDIENTS_FAILURE: 'fetch_failure'
}

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