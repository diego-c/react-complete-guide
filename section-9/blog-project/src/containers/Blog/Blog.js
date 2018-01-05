import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
    state = {
        posts: []
    }

    async componentDidMount() {        
        const posts = await axios.get('https://jsonplaceholder.typicode.com/posts');

        this.setState({ posts: posts.data });
    }
    render () {
        const posts = this.state.posts.map(post => <Post author="Diego" key = { post.id } title = { post.title } />).slice(0, 5);

        return (
            <div>
                <section className="Posts">
                    { posts }
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;