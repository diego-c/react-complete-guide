import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const navigationItems = props => {
    return (
        <ul className = { classes.NavigationItems }>      
            <NavigationItem 
            link="/"
            exact
            label = "Burger Builder"
            />
            
            { props.isAuth ?
                <NavigationItem 
                link="/orders"
                label = "Orders"
                /> : null
            }            

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