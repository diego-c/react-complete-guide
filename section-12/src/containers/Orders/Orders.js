import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';

export default class Orders extends Component {
    state = {
        orders: null
    }

    // my own implementation of fetching orders from firebase
    async componentDidMount() {
        const orders = (await axios.get('/orders.json')).data;
        this.setState({ orders });
    }

    render() {
        if (this.state.orders) console.log(Object.entries(this.state.orders).map(arr => arr[1]));

        let ordersOrSpinner =

            this.state.orders ?
            (
                <div className = { classes.Orders }>
                    { Object.entries(this.state.orders).map(arr => arr[1]).map((order, index) => (
                        <Order
                        key = { index }
                        ingredients = { order.ingredients }
                        price = { order.price }
                        delivery = { order.fastDelivery ? 'fast' : 'normal' }
                        address = { order.customer.address }
                        customer = { order.customer.name } />
                    )) }
                </div>
            ) : <Spinner />
        

        return ordersOrSpinner;
    }
}