import actionTypes from '../actions/actionTypes';
import updateObject from './utils/utils';
import initialState from '../state/initialState';

const authStart = (state, action) => {
    return updateObject(state, {
        authStatus: updateObject(state.authStatus, {
            isProcessing: true,
            error: false,
            errorInfo: null
        })
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        authData: action.authData,
        authStatus: updateObject(state.authStatus, {
            isProcessing: false,
            error: false,
            errorInfo: null
        })
    })
}

const authFailure = (state, action) => {
    return updateObject(state, {
        authStatus: {
            isProcessing: false,
            error: true,
            errorInfo: action.error
        }
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        ...initialState.auth
    })
}

export default (state = { }, action) => {

    switch(action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        
        case actionTypes.AUTH_FAILURE:
            return authFailure(state, action);

        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        
        default:
            return state;
    }
}