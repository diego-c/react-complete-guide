import React, { Component } from 'react';
import Posts from '../../components/Posts/Posts';
import './Blog.css';
import NewPost from '../../components/NewPost/NewPost';
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
                <Route path="/" exact component = { Posts } />
                <Route path="/new-post" component = { NewPost } />
            </div>
        );
    }
}

export default Blog;