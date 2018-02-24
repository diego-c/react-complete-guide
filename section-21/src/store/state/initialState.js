export default {
    auth: {
        authData: null,
        authStatus: {
            isProcessing: false,
            error: false,
            errorInfo: null
        }
    },
    orders: {
        ordersStatus: {
            isFetching: false,
            error: false,
            errorMsg: ''
        },
        ordersInfo: null,
        ordersDeleteStatus: {
            orderId: null,
            isDeleting: false,
            error: false,
            errorMsg: ''
        }   
    },
    order: {
        orderStatus: {
            isSending: false,
            sent: false,
            error: false,
            errorMsg: ''
        },
        orderInfo: {
            date: Date.now(),
            ingredients: null,
            customer: null,
            price: 4,
            deliveryMethod: null
        }
    }, 
    info: {
        purchasing: false, 
        ingredients: null,
        price: 4
    },
    status: { 
        ingredients: null,
        isFetching: false,
        error: false,
        errorMsg: ''
    }
}