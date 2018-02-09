import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        loading: true,
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
        this.setState({ orders, loading: false });
    }

    render() {
        const { loading } = this.state;
        const { orders } = this.state;

        let ordersOrSpinner =

            loading ?
            <Spinner /> :
            orders ?
            (
                <div className = { classes.Orders }>
                    { Object.keys(orders).map(orderId => (
                        <Order
                        key = { orderId }
                        customer = { orders[orderId].customer }
                        price = { orders[orderId].price }
                        delivery = { orders[orderId].deliveryMethod }
                        ingredients = { orders[orderId].ingredients }
                        />
                    )) }
                </div>
            ) : <h1 style={{textAlign: 'center'}}>No orders to show at the moment.</h1>
        

        return ordersOrSpinner;
    }
}

export default withError(Orders, axios);