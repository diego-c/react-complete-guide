import React, { Component } from 'react';
import Link from './NavLink/NavLink';
import './NavLinks.css';

export default class NavLinks extends Component {
    state = {
        links: [
            'Users',
            'Courses'
        ]
    }

    render() {
        return (
            <div className = "NavLinks">
                { this.state.links.map(link => (
                    <Link 
                    key={ `${link}${Math.random() * 1000}` }
                    path={ link.trim().includes(' ') ? link.split(' ').map(word => word.toLowerCase()).join('-') : link.toLowerCase() }
                    link = { link }
                    /> 
                )) }
            </div>
        )
    }
}