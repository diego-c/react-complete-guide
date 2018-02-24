import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.css';

const toolbar = props => (
    <header 
    className = { classes.Toolbar }>
        <div className = { classes.Logo }>
            <Logo />
        </div>
        <nav>
            <NavigationItems isAuth = { props.isAuth } />
        </nav>
    </header>
);

export default toolbar;