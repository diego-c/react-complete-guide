import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavLink.css'

const navLink = props => {
    return (
        <NavLink 
        to={ `/${props.path}` }
        className = "NavLink"
        activeStyle = {{
            backgroundColor: '#44ce81'
        }}>{ props.link }</NavLink>
    )
}

export default navLink;