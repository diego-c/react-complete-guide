import React from 'react';
import PropTypes from 'prop-types';
import classes from "./Backdrop.css";

const backdrop = props => (
    props.opened ? 
    <div 
    className = { classes.Backdrop }
    onClick = { props.clicked }></div> :
    null
);

backdrop.propTypes = {
    opened: PropTypes.bool,
    clicked: PropTypes.func.isRequired
}
export default backdrop;