import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    async componentDidMount() {        
        const posts = await axios.get('https://jsonplaceholder.typicode.com/posts');

        this.setState({ posts: posts.data });
    }
    render () {
        const posts = this.state.posts.map(post => (
        <Post
        author="Diego"
        key = { post.id }
        title = { post.title }
        clicked = { this.postSelectedHandler.bind(this, post.id) }
        />)).slice(0, 4);

        return (
            <div>
                <section className="Posts">
                    { posts }
                </section>
                <section>
                    <FullPost id = { this.state.selectedPostId } />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;