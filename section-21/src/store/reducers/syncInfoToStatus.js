import actions from '../actions/actionTypes';
import initialState from '../state/initialState';
import updateObject from '../../shared/updateObject';


const syncInfoToStatus = (state, action) => {
    if (action.type === actions.SYNC_INFO_TO_STATUS) {

        let newIngredients = null;

        if (state.status.ingredients) {
            const newState = { ...state };
            const newStatus = { ...newState.status };
            newIngredients = { ...newStatus.ingredients };
        }
        return {
            auth: {
                ...state.auth
            },
            orders: {
                ...initialState.orders
            },
            order: {
                ...initialState.order
            },
            info: updateObject(state.info, {
                purchasing: initialState.info.purchasing,
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

export default (state = { }, action) => {
    return syncInfoToStatus(state, action);
}