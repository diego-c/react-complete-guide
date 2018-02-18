import actionTypes from './actionTypes';

// sync actions
const authStart = () => ({
    type: actionTypes.AUTH_START
})

const authSuccess = token => ({
    type: actionTypes.AUTH_SUCCESS,
    token
})

const authFailure = error => ({
    type: actionTypes.AUTH_FAILURE,
    error
})

// async actions
export const authAsync = authInfo => {
    return dispatch => {
        dispatch(authStart());
    }
}