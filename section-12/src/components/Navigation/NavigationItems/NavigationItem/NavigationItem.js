import React from 'react';
import classes from './NavigationItem.css'
import { Route, Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

const navigationItem = ({ link, label }) => (
    <li className = { classes.NavigationItem }>
        <Route path = { link } children = { ({ match }) => (
            <Aux className = { match ? 'active' : ''}>
                <Link to = { link }>{ label }</Link>
            </Aux>
        )} />
    </li>
);

export default navigationItem;