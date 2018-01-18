import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
            reqInt: null,
            resInt: null
        }

        componentWillMount() {
            this.reqInt = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInt = axios.interceptors.response.use(res => res, error => {
                if (error) this.setState({ error });
            })
        }

        componentWillUnmount() {            
            if (this.resInt && this.reqInt) {
                axios.interceptors.request.eject(this.reqInt);
                axios.interceptors.response.eject(this.resInt);     
            }
        }
        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {            
            return (
                <Aux>
                    <Modal 
                    show = { this.state.error }
                    loading = { this.state.error }
                    modalClosed = { this.errorConfirmedHandler }>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent { ...this.props } />
                </Aux>
            )
        }
    }
};

export default withErrorHandler;

