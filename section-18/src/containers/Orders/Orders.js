import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { fetchOrdersAsync, deleteOrderAsync } from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
       this.props.fetchOrders();
    }

    deleteOrder = id => {
        this.props.deleteOrder(id);
    }

    render() {
        const { isFetching } = this.props.orders.ordersStatus;
        const { ordersInfo } = this.props.orders;
        const { isDeleting } = this.props.orders.ordersDeleteStatus;

        let ordersOrSpinner =

            isFetching || isDeleting ?
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
                        delete = { () => this.deleteOrder(orderId) }
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
        fetchOrders: () => dispatch(fetchOrdersAsync()),
        deleteOrder: orderId => dispatch(deleteOrderAsync(orderId))
    }    
};

export default connect(mapStateToProps, mapDispatchToProps)(withError(Orders, axios));