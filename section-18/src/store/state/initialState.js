export default {
    auth: {
        token: null,
        authStatus: {
            isProcessing: false,
            error: false,
            errorMsg: ''
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