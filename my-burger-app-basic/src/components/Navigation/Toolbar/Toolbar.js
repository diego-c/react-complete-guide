import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.css';

const toolbar = props => (
    <header 
    className = { classes.Toolbar }>
        <div>MENU</div>
        <Logo height = "90%" />
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;