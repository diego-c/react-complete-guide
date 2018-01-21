import React from 'react';
import classes from './NavigationItem.css'
import { NavLink } from 'react-router-dom';

const navigationItem = ({ link, label }) => (
    <li className = { classes.NavigationItem }>
        <NavLink
        to={ link }
        exact 
        activeClassName = { classes.active }
        >{ label }
        </NavLink>
    </li>
);

export default navigationItem;