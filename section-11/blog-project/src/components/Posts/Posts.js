import React, { Component } from 'react';
import Post from '../Post/Post';
import './Posts.css';
import Spinner from '../Spinner/Spinner';
import axios from '../../axios';
import { Link } from 'react-router-dom';

export default class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: null,
        loading: false
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }
    
    async componentDidMount() {  
        console.log(this.props);   
        this.setState({ loading: true });   
        let posts;
        try {
            posts = await axios.get('/posts');
            this.setState({ posts: posts.data, loading: false });
        } catch(err) {
            this.setState({ error: err.message, loading: false })
        }        
    }

    render() {
        let posts = null;
        if (this.state.error) {
            posts = <p style = {{ textAlign: 'center' }}>Oops, something went wrong! { this.state.error }</p>;
        } else if (this.state.loading) {
            posts = <Spinner />
        } else {
            posts = this.state.posts.map(post => (   
                    <Link to={ `/posts/${post.id}` } key = { post.id }> 
                        <Post
                        author="Diego"                   
                        title = { post.title }
                        clicked = { this.postSelectedHandler.bind(this, post.id) }
                        />
                    </Link>)).slice(0, 4);
        }

        return (
            <section className="Posts">
                { posts }
            </section>
        )
    }
}