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

// async actions
export const authAsync = (authInfo, method) => {
    return dispatch => {
        dispatch(authStart());

        axiosAuth
        .post(`${ method === 'sign up' ? `/signupNewUser?key=AIzaSyCZtiziHrTDVS4XMNqqd4Gpuj1DfNeXP6Q` : `/verifyPassword?key=AIzaSyCZtiziHrTDVS4XMNqqd4Gpuj1DfNeXP6Q` }`, {
            email: authInfo.find(control => control.field === 'email').value,
            password: authInfo.find(control => control.field === 'password').value
        })
        .then(res => {
            dispatch(authSuccess(res.data));
        })
        .catch(err => {
            console.log(err.response.data.error.errors[0].message);
            dispatch(authFailure(err));
        })
    }
}