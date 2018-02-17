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

        case (actionTypes.DELETE_ORDER):
            return {
                ...state,
                ordersDeleteStatus: {
                    ...state.ordersDeleteStatus,
                    orderId: action.orderId,
                    isDeleting: true
                }
            }

        case (actionTypes.DELETE_ORDER_SUCCESS):
            const newState = { ...state };
            const newOrders = { ...newState.ordersInfo };
            delete newOrders[action.orderId];

            return {
                ...state,
                ordersInfo: newOrders,
                ordersDeleteStatus: {
                    ...state.ordersDeleteStatus,
                    isDeleting: false
                }
            }

        case (actionTypes.DELETE_ORDER_FAILURE):
            return {
                ...state,
                ordersDeleteStatus: {
                    ...state.ordersDeleteStatus,
                    isDeleting: false,
                    error: true,
                    errorMsg: action.error.message
                }
            }

        default:
            return state;
    }
}