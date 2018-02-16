import actionTypes from '../actions/actionTypes';

export default (state = { }, action) => {
    switch(action.type) {
        case (actionTypes.FETCH_ORDERS):
            return {
                ...state,
                ordersStatus: {
                    ...state.ordersStatus,
                    isFetching: true
                }
            }

        case (actionTypes.FETCH_ORDERS_SUCCESS):
            return {
                ...state,
                ordersStatus: {
                    ...state.ordersStatus,
                    isFetching: false
                },
                ordersInfo: action.orders
            }

        case (actionTypes.FETCH_ORDERS_FAILURE):
            return {
                ...state,
                ordersStatus: {
                    ...state.ordersStatus,
                    isFetching: false,
                    error: true,
                    errorMsg: action.error.message
                }
            }

        default:
            return state;
    }
}