import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = props => {
    const addClasses = [classes.SideDrawer];
    props.open ?
    addClasses.push(classes.Open) :
    addClasses.push(classes.Close);

    return (
        <Aux>
        <Backdrop
         opened = { props.open }
         clicked = { props.closed } />
        <div className = { addClasses.join(' ') }>
            <div className = { classes.Logo }>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    );
}

sideDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    closed: PropTypes.func.isRequired
}
export default sideDrawer;