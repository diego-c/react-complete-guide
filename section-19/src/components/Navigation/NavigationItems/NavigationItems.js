import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const navigationItems = props => {
    return (
        <ul className = { classes.NavigationItems }>      
            <NavigationItem 
            closed = { props.closed }
            link="/"
            exact
            label = "Burger Builder"
            />
            
            { props.isAuth ?
                <NavigationItem 
                closed = { props.closed }
                link="/orders"
                label = "Orders"
                /> : null
            }            

            { props.isAuth ? 
                <NavigationItem
                closed = { props.closed }
                link = "/logout"
                label = "Logout"
                /> :
                <NavigationItem
                closed = { props.closed }
                link = "/auth"
                label = "Authenticate"
                />
            }        
        </ul>
    )
};

export default navigationItems;