import React, { Component } from 'react';

class Course extends Component {    
    render () {
        const title = decodeURIComponent(this.props.location.search).split('?title=')[1];
        const { id } = this.props.match.params;
        return (
            <div>
                <h1>{ title }</h1>
                <p>You selected the Course with ID: { id }</p>
            </div>
        );
    }
}

export default Course;