import React, { Component } from 'react';
import Posts from '../../components/Posts/Posts';
import './Blog.css';
import NewPost from '../../components/NewPost/NewPost';
import FullPost from '../../components/FullPost/FullPost';
import { NavLink, Route, withRouter } from 'react-router-dom';

class Blog extends Component {      
    
    render () {
        console.log(this.props.match);
        return (
            <div>
                <header>
                    <nav>                        
                        <ul className="Nav">
                            <li className="Nav-Item"><NavLink to="/" exact>Home</NavLink></li>
                            <li className="Nav-Item"><NavLink to={{
                                pathname: '/new-post'
                            }}>New Post</NavLink></li>
                        </ul>                    
                    </nav>
                </header>
                <Route path="/" exact component = { Posts } />           
                <Route path="/new-post" component = { NewPost } />
                <Route path={ `/:postId` } exact component = { FullPost } />
            </div>
        );
    }
}

export default withRouter(Blog);