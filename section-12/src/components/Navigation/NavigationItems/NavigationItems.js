import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const navigationItems = props => (
    <ul className = { classes.NavigationItems }>      
        <NavigationItem 
        link="/"
        label = "Burger Builder"
        />  

        <NavigationItem 
        link="/checkout"
        label = "Checkout"
        />

        <NavigationItem 
        link="/orders"
        label = "Orders"
        />
    </ul>
);

export default navigationItems;