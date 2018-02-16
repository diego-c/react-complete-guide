import fetchIngredientsReducer from './fetchIngredientsReducer';
import initialState from '../state/initialState';
import addRemoveIngredientsReducer from './burgerBuilder';
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
            info: addRemoveIngredientsReducer(state.info, action),
            status: fetchIngredientsReducer(state.status, action)
        }
    }
}

