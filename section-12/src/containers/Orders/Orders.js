import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';

export default class Orders extends Component {
    render() {
        return (
            <div className = { classes.Orders }>
                <Order />
                <Order />
            </div>
        )
    }
}