import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControl.css';

const buildControl = props => (
    <div className = { classes.BuildControl }>
        <div className = { classes.Label }>{ props.label }</div>
        <button 
        className = { classes.Less }
        onClick = { props.ingredientRemoved }
        disabled = { props.disabledInfo }>Less</button>

        <button 
        className = { classes.More }
        onClick = { props.ingredientAdded }>More</button>
    </div>
);

buildControl.propTypes = {
    label: PropTypes.oneOf(['Salad', 'Bacon', 'Meat', 'Cheese']).isRequired,
    ingredientAdded: PropTypes.func.isRequired,
    ingredientRemoved: PropTypes.func.isRequired,
    disabledInfo: PropTypes.bool.isRequired
}
export default buildControl;