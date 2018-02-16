import fetchIngredientsReducer from './fetchIngredientsReducer';
import initialState from '../state/initialState';
import addRemoveIngredientsReducer from './burgerBuilder';
import ordersReducer from './orders';
import syncInfoToStatus from './syncInfoToStatus';
import actionTypes from '../actions/actionTypes';

export default function(state = initialState, action) {
    
    if (action.type === actionTypes.SYNC_INFO_TO_STATUS) {
        return {
            ...syncInfoToStatus(state, action)
        }
    }
    
    else {
        return {
            order: ordersReducer(state.order, action),
            info: addRemoveIngredientsReducer(state.info, action),
            status: fetchIngredientsReducer(state.status, action)
        }
    }
}

