import React from 'react';
import classes from './NavigationItem.css'
import { Route, NavLink } from 'react-router-dom';

const navigationItem = ({ link, label }) => (
    <li className = { classes.NavigationItem }>
        <Route path = { link } exact children = { ({ match }) => (        
            <NavLink
            activeStyle = {{
                backgroundColor: '#8f5c2c',
                borderBottom: '.4rem solid #40a4c8',
                color: 'white' }}
            to = { link }>
            { label }
            </NavLink>            
        )} />
    </li>
);

export default navigationItem;