import actionTypes from '../actions/actionTypes';
import updateObject from './utils/utils';


const fetchOrders = (state, action) => {
    return updateObject(state, {
        ordersStatus: updateObject(state.ordersStatus, {
            isFetching: true
        })
    })
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        ordersStatus: updateObject(state.ordersStatus, {
            isFetching: false
        }),
        ordersInfo: action.orders
    })
}

const fetchOrdersFailure = (state, action) => {
    return updateObject(state, {
        ordersStatus: updateObject(state.ordersStatus, {
            isFetching: false,
            error: true,
            errorMsg: action.error.messsage
        })
    })
}

const deleteOrder = (state, action) => {
    return updateObject(state, {
        ordersDeleteStatus: updateObject(state.ordersDeleteStatus, {
            orderId: action.orderId,
            isDeleting: true
        })
    })
}

const deleteOrderSuccess = (state, action) => {
    const newState = { ...state };
            const newOrders = { ...newState.ordersInfo };
            delete newOrders[action.orderId];

            return updateObject(state, {
                ordersInfo: newOrders,
                ordersDeleteStatus: updateObject(state.ordersDeleteStatus, {
                    isDeleting: false
                })
            })
}

const deleteOrderFailure = (state, action) => {
    return updateObject(state, {
        ordersDeleteStatus: updateObject(state.ordersDeleteStatus, {
            isDeleting: false,
            error: true,
            errorMsg: action.error.message
        })
    })
}

export default (state = { }, action) => {
    switch(action.type) {
        case (actionTypes.FETCH_ORDERS):
           return fetchOrders(state, action);

        case (actionTypes.FETCH_ORDERS_SUCCESS):
           return fetchOrdersSuccess(state, action);

        case (actionTypes.FETCH_ORDERS_FAILURE):
           return fetchOrdersFailure(state, action);

        case (actionTypes.DELETE_ORDER):
           return deleteOrder(state, action);

        case (actionTypes.DELETE_ORDER_SUCCESS):
           return deleteOrderSuccess(state, action);

        case (actionTypes.DELETE_ORDER_FAILURE):
           return deleteOrderFailure(state, action);

        default:
            return state;
    }
}