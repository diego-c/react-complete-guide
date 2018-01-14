import React from 'react';
import './Post.css';
//import { withRouter } from 'react-router-dom';

const post = (props) => (    
    <article className="Post" onClick = { props.clicked }>
        <h1 className = "Title">{ props.title }</h1>
        <div className="Info">
            <div className="Author">{ props.author }</div>
        </div>
    </article>
);

//export default withRouter(post);
export default post;