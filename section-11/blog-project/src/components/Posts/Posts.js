import React, { Component } from 'react';
import Post from '../Post/Post';
import './Posts.css';
import Spinner from '../Spinner/Spinner';
import axios from '../../axios';
import { withRouter } from 'react-router-dom';

class Posts extends Component {
    state = {
        posts: [],
        error: null,
        loading: false
    }

    postSelectedHandler = (id) => {
        this.props.history.push(`/posts/${ id }`);
    }
    
    async componentDidMount() {    
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

                /* This needs to be a PostLink instead of a Post nested inside a Link component
                
                When any Post is clicked, it should route to its FullPost counterpart */

                    <Post
                        author="Diego"   
                        key = { post.id }                
                        title = { post.title }
                        clicked = { this.postSelectedHandler.bind(this, post.id) }
                    />
                    )).slice(0, 4)
        }

        return (
            <section className="Posts">
                { posts }
            </section>
        )
    }
}

export default withRouter(Posts);