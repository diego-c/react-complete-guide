import React, { Component } from 'react';

class Course extends Component {    
    render () {      
        const { courses } = this.props.location.state || { courses: null };
        const { id } = this.props.match.params;

        let title = 
        (
            courses
            && 
            courses.find(course => course.id === Number(id))
        )
        ? 
        (courses.find(course => course.id === Number(id))).title
        : 'Sorry, course not found.';

        if (!courses) {
            title = `Sorry, the query param doesn't match the course id.`;
        }

        return (
            <div>
                <h1>{ title }</h1>
                <p>You selected the Course with ID: { id }</p>
            </div>
        );
    }
}

export default Course;