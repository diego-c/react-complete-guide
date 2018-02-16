import actions from '../actions/actionTypes';
import initialState from '../state/initialState';

export default (state = { }, action) => {
    if (action.type === actions.SYNC_INFO_TO_STATUS) {

        let newIngredients = null;

        if (state.status.ingredients) {
            const newState = { ...state };
            const newStatus = { ...newState.status };
            newIngredients = { ...newStatus.ingredients };
        }
        return {
            order: {
                ...state.order
            },
            info: {
                ...state.info,
                ingredients: newIngredients,
                price: initialState.info.price
            },
            status: {
                ...state.status
            }
        }
    } else {
        return state;
    }    
}