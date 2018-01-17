import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Course from '../Course/Course';
import './Courses.css';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    render () {
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        this.state.courses.map( course => {
                            return <NavLink
                             className="Course"
                             key={course.id}
                             to={{
                                pathname: `/courses/${course.id}`,
                                search: `?title=${course.title}`,
                                state: { courses: this.state.courses }  
                             }}
                             activeStyle = {{
                                backgroundColor: '#68ede8'
                             }}
                             >
                             {course.title}
                             </NavLink>;
                        } )
                    }
                </section>
                <section>
                    <Route path={ `${this.props.match.url}/:id` } component = { Course } />
                </section>
            </div>
        );
    }
}

export default Courses;