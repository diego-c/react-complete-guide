import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const navigationItems = props => {
    console.log('NavigationItems props: ', props);

    return (
        <ul className = { classes.NavigationItems }>      
            <NavigationItem 
            link="/"
            exact
            label = "Burger Builder"
            />
            
            <NavigationItem 
            link="/orders"
            label = "Orders"
            />

            { props.isAuth ? 
                <NavigationItem
                link = "/logout"
                label = "Logout"
                /> :
                <NavigationItem
                link = "/auth"
                label = "Authenticate"
                />
            }        
        </ul>
    )
};

export default navigationItems;