import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = props => {
    

    return (
        <div className = { classes.SideDrawer }>
            <div className = { classes.Logo }>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
}

export default sideDrawer;