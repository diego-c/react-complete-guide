import actions from '../actions/actionTypes';
import initialState from '../state/initialState';
import updateObject from './utils/utils';

export default (state = { }, action) => {
    if (action.type === actions.SYNC_INFO_TO_STATUS) {

        let newIngredients = null;

        if (state.status.ingredients) {
            const newState = { ...state };
            const newStatus = { ...newState.status };
            newIngredients = { ...newStatus.ingredients };
        }
        return {
            orders: {
                ...initialState.orders
            },
            order: {
                ...initialState.order
            },
            info: updateObject(state.info, {
                ingredients: newIngredients,
                price: initialState.info.price
            }),
            status: {
                ...state.status
            }
        }
    } else {
        return state;
    }    
}