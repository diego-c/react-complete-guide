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

function deleteOrder(orderId) {
    return {
        type: actionTypes.DELETE_ORDER,
        orderId
    }
}

function deleteOrderSuccess(orderId) {
    return {
        type: actionTypes.DELETE_ORDER_SUCCESS,
        orderId
    }
}

function deleteOrderFailure(error) {
    return {
        type: actionTypes.DELETE_ORDER_FAILURE,
        error
    }
}

// async actions
export function deleteOrderAsync(orderId) {
    return dispatch => {
        dispatch(deleteOrder(orderId));

        axios
        .delete(`/orders/${orderId}.json`)
        .then(order => {
            if (order.data) {
                dispatch(deleteOrderSuccess(orderId));
                console.log('Successfully deleted the order: ', order.data);
            } else {
                throw new Error('Oops, could not delete the order ', orderId);
            }
        })
        .catch(err => {
            dispatch(deleteOrderFailure(err));
        })
    }
}

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