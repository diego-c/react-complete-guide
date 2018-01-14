import React from 'react';
import Aux from '../hoc/Auxiliary/Auxiliary';
import FullPost from '../FullPost/FullPost';
import Route from 'react-router-dom/Route';

const postLink = ({ id, to }) => (
    <Route path={ to } children = { ({ match }) => (
        <Aux>
            <FullPost />
        </Aux>
        )} />    
)