import actions from '../actions/actionTypes';
import updateObject from '../../shared/updateObject';

const fetchIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: null,
        isFetching: true,
        error: false,
        errorMsg: ''
    })
}

const fetchIngredientsSuccess = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        isFetching: false,
        error: false,
        errorMsg: ''
    })
}

const fetchIngredientsFailure = (state, action) => {
    return updateObject(state, {
        ingredients: null,
        isFetching: false,
        error: true,
        errorMsg: action.error.message
    })
}   

export default (state = { }, action) => {

    switch(action.type) {

        case actions.FETCH_INGREDIENTS:
            return fetchIngredients(state, action);

        case actions.FETCH_INGREDIENTS_SUCCESS:
            return fetchIngredientsSuccess(state, action);
        
        case actions.FETCH_INGREDIENTS_FAILURE:
            return fetchIngredientsFailure(state, action);

        default:
            return state;
    }
}