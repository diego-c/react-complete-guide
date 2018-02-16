export default {
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