import reducer from './auth';
import actionTypes from '../actions/actionTypes';
import updateObject from '../../shared/updateObject';

const initialState = {
    authData: null,
    authStatus: {
        isProcessing: false,
        error: false,
        errorInfo: null
    }
};

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store the token upon login', () => {
        expect(reducer(undefined, { type: actionTypes.AUTH_SUCCESS, authData: {
            idToken: "abc123",
            localId: "123abc"
        }})).toEqual({
            ...initialState,
            authData: {
                idToken: "abc123",
                localId: "123abc"
            }
        })
    })
})
