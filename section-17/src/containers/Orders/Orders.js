import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { fetchOrdersAsync } from '../../store/actions/index';
import store from '../../store/store';

class Orders extends Component {

    componentDidMount() {
       this.props.fetchOrders();
       console.log('Store state: ', store.getState());
    }

    render() {
        const { isFetching } = this.props.orders.ordersStatus;
        const { ordersInfo } = this.props.orders;

        /* console.log('Fetching: ', isFetching);
        console.log('Orders info: ', ordersInfo); */

        let ordersOrSpinner =

            isFetching ?
            <Spinner /> :
            ordersInfo ?
            (
                <div className = { classes.Orders }>
                    { Object.keys(ordersInfo).map(orderId => (
                        <Order
                        key = { orderId }
                        customer = { ordersInfo[orderId].customer }
                        price = { ordersInfo[orderId].price }
                        delivery = { ordersInfo[orderId].deliveryMethod }
                        ingredients = { ordersInfo[orderId].ingredients }
                        />
                    )) }
                </div>
            ) : <h1 style={{textAlign: 'center'}}>{ this.props.orders.ordersStatus.errorMsg }</h1>
        

        return ordersOrSpinner;
    }
}

const mapStateToProps = state => ({
    orders: state.orders
});

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrdersAsync())
    }    
};

export default connect(mapStateToProps, mapDispatchToProps)(withError(Orders, axios));