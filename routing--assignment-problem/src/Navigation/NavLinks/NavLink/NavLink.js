import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavLink.css'

const navLink = props => {
    console.log(props);

    return (
        <NavLink 
        to={ `/${props.path}` }
        className = "NavLink">{ props.link }</NavLink>
    )
}

export default navLink;