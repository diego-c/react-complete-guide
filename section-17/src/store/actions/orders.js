import actions from './actionTypes';
import axios from '../../axios-order';

// sync actions
function fetchIngredientsSync() {
    return {
        type: actions.FETCH_INGREDIENTS
    }
}

function fetchIngredientsSuccess(ingredients) {
    return {
        type: actions.FETCH_INGREDIENTS_SUCCESS,
        ingredients
    }    
}

function fetchIngredientsFailure(error) {
    return {
        type: actions.FETCH_INGREDIENTS_FAILURE,
        error
    }    
}

function syncInfoToStatus() {
    return {
        type: actions.SYNC_INFO_TO_STATUS
    }
}

// async actions
export function fetchIngredientsAsync() {
    return dispatch => {

        dispatch(fetchIngredientsSync())

        axios
        .get('/ingredients.json')
        .then(ingredients => {
            dispatch(fetchIngredientsSuccess(ingredients.data));
            dispatch(syncInfoToStatus());
        })
        .catch(error => {
            dispatch(fetchIngredientsFailure(error))
        })        
    }
}