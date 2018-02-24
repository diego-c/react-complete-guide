import React from 'react';
import classes from './NavigationItem.css'
import { NavLink } from 'react-router-dom';

const navigationItem = ({ exact, link, label, closed }) => (
    <li className = { classes.NavigationItem } onClick = { closed }>
        <NavLink
        to={ link }
        exact = { exact }
        activeClassName = { classes.active }
        >{ label }
        </NavLink>
    </li>
);

export default navigationItem;