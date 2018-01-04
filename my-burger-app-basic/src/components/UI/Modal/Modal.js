import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
    <Aux>
        <Backdrop
        show = { props.show }
        clicked = { props.modalClosed } />
        <div 
        className = { classes.Modal }
        style = {{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0',
            visibility: props.show ? 'visible' : 'hidden'
        }}>
            { props.children }
        </div>
    </Aux>
);

modal.propTypes = {
    show: PropTypes.bool.isRequired,
    modalClosed: PropTypes.func.isRequired
}
export default modal;