import React, { Component } from 'react';
import Posts from '../../components/Posts/Posts';
import './Blog.css';
import NewPost from '../../components/NewPost/NewPost';
import FullPost from '../../components/FullPost/FullPost';
import { NavLink, Route, withRouter, Redirect, Switch } from 'react-router-dom';

class Blog extends Component {      
    state = {
        auth: true
    }

    render () {
        console.log(this.props.match.url);
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

                <Switch>
                    {/* <Route path="/" exact component = { Posts } />            */}
                    { this.state.auth ? <Route path="/new-post" component = { NewPost } /> : null }
                    <Route path={ `/posts/:postId` } exact component = { FullPost } />
                    <Route path="/posts" exact component = { Posts } />
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Blog);