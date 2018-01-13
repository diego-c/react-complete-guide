import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: null
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    async componentDidMount() {        
        let posts;
        try {
            posts = await axios.get('/posts');
            this.setState({ posts: posts.data });
        } catch(err) {
            this.setState({ error: err.message })
        }        
    }
    render () {
        let posts = <p style = {{ textAlign: 'center' }}>Oops, something went wrong! { this.state.error }</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => (
                <Link key = { post.id } to={`/posts/${post.id}`}>
                    <Post
                    author="Diego"                    
                    title = { post.title }
                    clicked = { this.postSelectedHandler.bind(this, post.id) }
                    />
                </Link>)).slice(0, 4);
        }

        return (
            <div>
                <header>
                    <nav>                        
                        <ul className="Nav">
                            <li className="Nav-Item"><Link to="/">Home</Link></li>
                            <li className="Nav-Item"><a href="/new-post">New Post</a></li>
                        </ul>                    
                    </nav>
                </header>
                <section className="Posts">
                    { posts }
                </section>
                <Route path={ `/posts/`}>
                    <FullPost id = {  } />
                </Route>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;