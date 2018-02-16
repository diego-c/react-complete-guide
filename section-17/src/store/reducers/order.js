import actionTypes from "../actions/actionTypes";

export default (state = { }, action) => {

    switch(action.type) {

        case actionTypes.SEND_ORDER:
            return {
                ...state,
                orderStatus: {
                    ...state.orderStatus,
                    isSending: true
                }
            }

        case actionTypes.SEND_ORDER_SUCCESS:
            return {
                ...state,
                orderInfo: action.orderInfo,
                orderStatus: {
                    ...state.orderStatus,
                    isSending: false,
                    sent: true
                }
            }

        case actionTypes.SEND_ORDER_FAILURE:
            return {
                ...state,
                orderStatus: {
                    ...state.orderStatus,
                    isSending: false,
                    error: true,
                    errorMsg: action.error.message
                }
            }

        default:
            return state;
    }
}