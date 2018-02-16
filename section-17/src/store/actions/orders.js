import actions from './actionTypes';
import axios from '../../axios-order';

// sync actions
export function fetchIngredientsSync() {
    return {
        type: actions.FETCH_INGREDIENTS
    }
}

export function fetchIngredientsSuccess(ingredients) {
    return {
        type: actions.FETCH_INGREDIENTS_SUCCESS,
        ingredients
    }    
}

export function fetchIngredientsFailure(error) {
    return {
        type: actions.FETCH_INGREDIENTS_FAILURE,
        error
    }    
}

// async actions
export function fetchIngredientsAsync() {
    return dispatch => {

        dispatch(fetchIngredientsSync)

        axios
        .get('/ingredients.json')
        .then(ingredients => {
            dispatch(fetchIngredientsSuccess(ingredients.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFailure(error))
        })        
    }
}