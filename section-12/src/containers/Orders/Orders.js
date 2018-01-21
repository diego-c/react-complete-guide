import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: null
    }

    // my own implementation of fetching orders from firebase
    async componentDidMount() {
        let orders;
        try {
            orders = (await axios.get('/orders.json')).data;
        } catch(err) {
            console.log(err);
        }
        this.setState({ orders });
    }

    render() {
        let ordersOrSpinner =

            this.state.orders ?
            (
                <div className = { classes.Orders }>
                    { Object.entries(this.state.orders).map(arr => ({ order: arr[1], key: arr[0] })).map(fullOrder => (
                        <Order
                        key = { fullOrder['key'] }
                        ingredients = { fullOrder['order'].ingredients }
                        price = { fullOrder['order'].price }
                        delivery = { fullOrder['order'].fastDelivery ? 'fast' : 'normal' }
                        address = { fullOrder['order'].customer.address }
                        customer = { fullOrder['order'].customer.name } />
                    )) }
                </div>
            ) : <Spinner />
        

        return ordersOrSpinner;
    }
}

export default withError(Orders, axios);