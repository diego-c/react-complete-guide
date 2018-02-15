import fetchIngredientsReducer from './fetchIngredientsReducer';
import initialState from '../state/initialState';
import addRemoveIngredientsReducer from './burgerBuilder';

export default function(state = initialState, action) {
    
    return {
        info: addRemoveIngredientsReducer(state.info, action),
        status: fetchIngredientsReducer(state.status, action)
    }
}

