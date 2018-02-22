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

export const authLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }    
}

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
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            const authData = { ...res.data };
            localStorage.setItem('auth', JSON.stringify(authData));  
            localStorage.setItem('expirationDate', expirationDate);          
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

export const checkAuth = () => {
    return dispatch => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        let expirationDate = new Date(localStorage.getItem('expirationDate'))

        if (!auth) {
            dispatch(authLogout());
        } else {
            if (expirationDate > new Date()) {
                dispatch(authLogout());
            } else {
                dispatch(authSuccess(auth));
                expirationDate = new Date(expirationDate - new Date());
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authLogoutAsync(new Date(expirationDate).getSeconds()))
            }
        }
    }
}