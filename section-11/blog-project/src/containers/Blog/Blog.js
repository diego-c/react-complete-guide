import React, { Component } from 'react';
import Posts from '../../components/Posts/Posts';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
//import { Link, Route } from 'react-router-dom';

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
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;