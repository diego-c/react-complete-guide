import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    componentWillUpdate() {
        console.log('[Modal] Will Update!');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show
    }

    render() {
        return (
            <Aux>
                <Backdrop
                show = { this.props.show }
                clicked = { this.props.modalClosed } />
                <div 
                className = { classes.Modal }
                style = {{
                    transform: this.props.show ? 'translate(-50%, -50%)' : 'translate(-50%, -100vh)',
                    opacity: this.props.show ? '1' : '0',
                    visibility: this.props.show ? 'visible' : 'hidden'
                }}>
                    { this.props.children }
                </div>
            </Aux>
        )
    }
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    modalClosed: PropTypes.func.isRequired
}
export default Modal;