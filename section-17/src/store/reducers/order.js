import actionTypes from "../actions/actionTypes";
import updateObject from './utils/utils';

export default (state = { }, action) => {

    switch(action.type) {

        case actionTypes.SEND_ORDER:
            return updateObject(state, {
                orderStatus: updateObject(state.orderStatus, {
                    isSending: true
                })
            })

        case actionTypes.SEND_ORDER_SUCCESS:
            return updateObject(state, {
                orderInfo: action.orderInfo,
                orderStatus: updateObject(state.orderStatus, {
                    isSending: false,
                    sent: true
                })
            })

        case actionTypes.SEND_ORDER_FAILURE:
            return updateObject(state, {
                orderStatus: updateObject(state.orderStatus, {
                    isSending: false,
                    error: true,
                    errorMsg: action.error.message
                })
            })

        default:
            return state;
    }
}