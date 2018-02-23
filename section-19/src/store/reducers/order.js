import actionTypes from "../actions/actionTypes";
import updateObject from '../../shared/updateObject';


const sendOrder = (state, action) => {
    return updateObject(state, {
        orderStatus: updateObject(state.orderStatus, {
            isSending: true
        })
    })
}

const sendOrderSuccess = (state, action) => {
    return updateObject(state, {
        orderInfo: action.orderInfo,
        orderStatus: updateObject(state.orderStatus, {
            isSending: false,
            sent: true
        })
    })
}

const sendOrderFailure = (state, action) => {
    return updateObject(state, {
        orderStatus: updateObject(state.orderStatus, {
            isSending: false,
            error: true,
            errorMsg: action.error.message
        })
    })
}

export default (state = { }, action) => {

    switch(action.type) {

        case actionTypes.SEND_ORDER:
            return sendOrder(state, action);

        case actionTypes.SEND_ORDER_SUCCESS:
            return sendOrderSuccess(state, action);

        case actionTypes.SEND_ORDER_FAILURE:
            return sendOrderFailure(state, action);

        default:
            return state;
    }
}