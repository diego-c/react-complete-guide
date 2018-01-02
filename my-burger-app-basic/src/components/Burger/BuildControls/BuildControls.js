import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }    
];

const buildControls = props => (
    <div className = { classes.BuildControls }>
        { controls.map(({ label, type }) => (                           
            <BuildControl 
            key = { label }
            label = { label }
            ingredientAdded = { () => props.ingredientAdded(type) }
            type = { type } />            
        )) }
    </div>
);

export default buildControls;