import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { fetchOrdersAsync, deleteOrderAsync } from '../../store/actions/index';

class Orders extends Component {

    componentWillReceiveProps(nextProps) {
        console.log('next orders props: ', nextProps);
    }

    componentWillMount() {
        if (this.props.auth) {
            this.props.fetchOrders(this.props.auth.idToken);
        }
    }

    deleteOrderHandler = (id, token) => {
        this.props.deleteOrder(id, token);
    }

    render() {
        const { isFetching } = this.props.orders.ordersStatus;
        const { ordersInfo } = this.props.orders;
        const { isDeleting } = this.props.orders.ordersDeleteStatus;

        if (this.props.orders.ordersStatus.error) {
            return <h1 style={{ textAlign: 'center' }}>{ this.props.orders.ordersStatus.errorMsg }</h1>
        }

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
                        delete = { () => this.deleteOrderHandler(orderId, this.props.auth.idToken) }
                        />
                    )) }
                </div>
            ) : <h1 style={{textAlign: 'center'}}>{ this.props.orders.ordersStatus.errorMsg }</h1>
        
        if (!this.props.auth) {
            return <h1 style={{ textAlign: 'center' }}>Sorry, you don't seem to be authenticated</h1>
        }
        else {
            return ordersOrSpinner;
        }
    }
}

const mapStateToProps = state => ({
    orders: state.orders,
    auth: state.auth.authData
});

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: token => dispatch(fetchOrdersAsync(token)),
        deleteOrder: (orderId, token) => dispatch(deleteOrderAsync(orderId, token))
    }    
};

export default connect(mapStateToProps, mapDispatchToProps)(withError(Orders, axios));