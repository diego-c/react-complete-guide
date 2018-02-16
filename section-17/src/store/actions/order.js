import actions from './actionTypes';
import axios from '../../axios-order';

// sync actions
function sendOrderSync() {
    return {
        type: actions.SEND_ORDER
    }    
};

function sendOrderSuccess(orderInfo) {
    return {
        type: actions.SEND_ORDER_SUCCESS,
        orderInfo
    }    
};

function sendOrderFailure(error) {
    return {
        type: actions.SEND_ORDER_FAILURE,
        error
    }    
};

// async actions
export function sendOrderAsync(orderInfo) {
    return dispatch => {
        dispatch(sendOrderSync());

        axios
        .post('/orders.json', { ...orderInfo })
        .then(() => dispatch(sendOrderSuccess(orderInfo)))
        .catch(err => dispatch(sendOrderFailure(err)))
    }
} 