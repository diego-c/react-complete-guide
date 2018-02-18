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
export const authAsync = authInfo => {
    return dispatch => {
        dispatch(authStart());

        axiosAuth
        .post(`/signupNewUser?key=AIzaSyCZtiziHrTDVS4XMNqqd4Gpuj1DfNeXP6Q`, {
            email: authInfo.find(control => control.field === 'email').value,
            password: authInfo.find(control => control.field === 'password').value
        })
        .then(res => {
            console.log('Data from sign up: ', res.data);
            dispatch(authSuccess(res.data));
        })
        .catch(err => {
            dispatch(authFailure(err));
        })
    }
}