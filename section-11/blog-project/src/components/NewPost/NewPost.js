import React, { Component } from 'react';
import instance from '../../axios';

import './NewPost.css';
import Spinner from '../Spinner/Spinner';
import { Redirect } from 'react-router';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false,
        loading: false
    }

    postHandler = () => {
        this.setState({ loading: true }, () => {
            instance.post(`/posts`, {
                title: this.state.title,
                body: this.state.content,
                author: this.state.author
            }).then(res => {
                console.log(res);
                // Alternative: push a URL to the history stack instead of redirecting. The difference is that pushing a URL allows the user to go back to the previous page, while redirect actually replaces it

                // Using <Replace to="/" /> is the same as this.props.history.replace('/')

                /* this.setState({ loading: false })
                this.props.history.push('/'); */
            })
        })
        this.setState({ loading: false, submitted: true });
    }
    render () {
        let newPost = null;
        if (this.state.loading && !this.state.submitted) {
            newPost = <Spinner />;

        } else if (this.state.submitted) {
            newPost = <Redirect to="/" />
        }

        else {
            newPost = (
                <div className="NewPost">
                    <h1>Add a Post</h1>
    
                    <div className = "Post-Section">
                    <label>Title</label>
                
                    <input type="text"
                    value={this.state.title}
                    onChange={(event) => this.setState({title: event.target.value})} />
    
                    </div>
    
                    <div className = "Post-Section">
                    <label>Content</label>
                    <textarea
                    rows="9"
                    value={this.state.content}
                    onChange={(event) => this.setState({content: event.target.value})} />
                    </div>
    
                    <div className = "Post-Section">
                    <label>Author</label>
                    <select
                    value={this.state.author}
                    onChange={(event) => this.setState({author: event.target.value})}>
                        <option value="Max">Max</option>
                        <option value="Manu">Manu</option>
                    </select>
                    </div>
    
                    <button onClick = { this.postHandler }>Add Post</button>
                </div>
            )
        }
        return newPost;
    }
}

export default NewPost;