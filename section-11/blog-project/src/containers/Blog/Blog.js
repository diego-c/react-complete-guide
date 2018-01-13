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
                            <li className="Nav-Item"><Link to="/">Home</Link></li>
                            <li className="Nav-Item"><Link to="/new-post">New Post</Link></li>
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