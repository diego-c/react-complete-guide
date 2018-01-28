import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    componentWillUpdate() {
        console.log('[Modal] Will Update!');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.loading;
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
    show: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    modalClosed: PropTypes.func
}
export default Modal;