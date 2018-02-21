import actionTypes from './actionTypes';
import axiosAuth from '../../axios-auth';

// sync actions
const authStart = () => ({
    type: actionTypes.AUTH_START
})

const authSuccess = authData => ({
    type: actionTypes.AUTH_SUCCESS,
    authData
})

const authFailure = error => ({
    type: actionTypes.AUTH_FAILURE,
    error
})

export const authLogout = () => ({
    type: actionTypes.AUTH_LOGOUT
})

// async actions
export const authAsync = (authInfo, method) => {
    return dispatch => {
        dispatch(authStart());

        axiosAuth
        .post(`${ method === 'sign up' ? `/signupNewUser?key=AIzaSyCZtiziHrTDVS4XMNqqd4Gpuj1DfNeXP6Q` : `/verifyPassword?key=AIzaSyCZtiziHrTDVS4XMNqqd4Gpuj1DfNeXP6Q` }`, {
            email: authInfo.find(control => control.field === 'email').value,
            password: authInfo.find(control => control.field === 'password').value,
            returnSecureToken: true
        })
        .then(res => {
            dispatch(authSuccess(res.data));
            dispatch(authLogoutAsync(res.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFailure(err.response.data.error));
        })
    }
}

export const authLogoutAsync = expiresIn => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiresIn * 1000);
    }
}