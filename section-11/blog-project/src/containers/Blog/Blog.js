import React, { Component } from 'react';
import Posts from '../../components/Posts/Posts';
import './Blog.css';
import { Link, Route } from 'react-router-dom';

class Blog extends Component {      
    
    render () {
        return (
            <div>
                <header>
                    <nav>                        
                        <ul className="Nav">
                            <li className="Nav-Item"><a href="/">Home</a></li>
                            <li className="Nav-Item"><a href="/new-post">New Post</a></li>
                        </ul>                    
                    </nav>
                </header>
                <Posts />
                <Route path="/" render = { () => <h1>Home</h1> } />
            </div>
        );
    }
}

export default Blog;