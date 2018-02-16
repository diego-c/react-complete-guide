import actionTypes from './actionTypes';
import axios from '../../axios-order';

// sync actions
function fetchOrdersSync() {
    return {
        type: actionTypes.FETCH_ORDERS
    }
}

function fetchOrdersSuccess(orders) {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

function fetchOrdersFailure(error) {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILURE,
        error
    }
}

// async actions
export function fetchOrdersAsync() {
    return dispatch => {
        dispatch(fetchOrdersSync());

        axios
        .get('/orders.json')
        .then(orders => {
            if (orders.data) {
                dispatch(fetchOrdersSuccess(orders.data));
            } else {
                throw new Error('Oops, could not fetch orders!');
            }
        })
        .catch(err => {
            dispatch(fetchOrdersFailure(err));
        })
    }
}