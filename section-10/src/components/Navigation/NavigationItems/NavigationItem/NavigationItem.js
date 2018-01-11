import React from 'react';
import classes from './NavigationItem.css'

const navigationItem = ({ link, active, children }) => (
    <li className = { classes.NavigationItem }>
        <a
         className = { active ? classes.active : null }   
         href={ link }
         target="_blank">
         { children }
        </a>
    </li>
);

export default navigationItem;