import React from 'react';
import PropTypes from 'prop-types';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';
import actions from '../../../store/actions/actions';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }    
];

const buildControls = props => (
    <div className = { classes.BuildControls }>
        <p className = { classes.CurrentPrice }>Current Price: <strong>{ props.price.toFixed(2) }</strong></p>
        { controls.map(({ label, type }) => (                           
            <BuildControl 
            key = { label }
            label = { label }
            ingredientAdded = { () => props.ingredientAdded(actions.ADD_INGREDIENT, type) }
            ingredientRemoved = { () => props.ingredientRemoved(actions.REMOVE_INGREDIENT, type) }
            disabledInfo = { props.disabledInfo[type] } />            
        )) }
        <button 
        disabled = { props.isDisabled }
        className = { classes.OrderButton }
        onClick = { props.purchase }>ORDER NOW!</button>
    </div>
);

buildControls.propTypes = {
    price: PropTypes.number.isRequired,
    ingredientAdded: PropTypes.func.isRequired,
    ingredientRemoved: PropTypes.func.isRequired,
    disabledInfo: PropTypes.shape({
        'meat': PropTypes.bool,
        'salad': PropTypes.bool,
        'bacon': PropTypes.bool,
        'cheese': PropTypes.bool
    }).isRequired,
    isDisabled: PropTypes.bool.isRequired,
    purchase: PropTypes.func.isRequired
}
export default buildControls;