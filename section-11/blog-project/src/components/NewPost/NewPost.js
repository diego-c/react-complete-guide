import React, { Component } from 'react';
import instance from '../../axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max'
    }

    postHandler = () => {
        instance.post(`/posts`, {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }).then(console.log);
    }
    render () {
        return (
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
        );
    }
}

export default NewPost;