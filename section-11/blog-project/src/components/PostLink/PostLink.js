import React from 'react';
import Aux from '../hoc/Auxiliary/Auxiliary';
import Post from '../Post/Post';
import Route from 'react-router-dom/Route';

const postLink = props => (
    <Route path={ props.to } children = { ({ match }) => (
        <Aux>
            <Post 
            author={ props.author }
            title={ props.title }
            clicked = { props.clicked }
        </Aux>
        )} />    
)