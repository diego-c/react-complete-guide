import actionTypes from '../actions/actionTypes';
import updateObject from './utils/utils';

export default (state = { }, action) => {
    switch(action.type) {
        case (actionTypes.FETCH_ORDERS):
            return updateObject(state, {
                ordersStatus: updateObject(state.ordersStatus, {
                    isFetching: true
                })
            })

        case (actionTypes.FETCH_ORDERS_SUCCESS):
            return updateObject(state, {
                ordersStatus: updateObject(state.ordersStatus, {
                    isFetching: false
                }),
                ordersInfo: action.orders
            })

        case (actionTypes.FETCH_ORDERS_FAILURE):
            return updateObject(state, {
                ordersStatus: updateObject(state.ordersStatus, {
                    isFetching: false,
                    error: true,
                    errorMsg: action.error.messsage
                })
            })

        case (actionTypes.DELETE_ORDER):
            return updateObject(state, {
                ordersDeleteStatus: updateObject(state.ordersDeleteStatus, {
                    orderId: action.orderId,
                    isDeleting: true
                })
            })

        case (actionTypes.DELETE_ORDER_SUCCESS):
            const newState = { ...state };
            const newOrders = { ...newState.ordersInfo };
            delete newOrders[action.orderId];

            return updateObject(state, {
                ordersInfo: newOrders,
                ordersDeleteStatus: updateObject(state.ordersDeleteStatus, {
                    isDeleting: false
                })
            })

        case (actionTypes.DELETE_ORDER_FAILURE):
            return updateObject(state, {
                ordersDeleteStatus: updateObject(state.ordersDeleteStatus, {
                    isDeleting: false,
                    error: true,
                    errorMsg: action.error.message
                })
            })

        default:
            return state;
    }
}