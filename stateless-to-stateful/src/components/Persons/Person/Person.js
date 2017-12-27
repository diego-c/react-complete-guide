import React, { Component } from 'react';
import classes from './Person.css';

class Person extends Component {
    render() {
        return (
            <div className = { classes.Person }>       
                <input className = { classes.Person__input }
                type="text" 
                placeholder={ this.props.currentName }
                defaultValue = { this.props.currentName }
                onChange={ this.props.changed } />
                <p className = { classes.Person__btn } onClick={ this.props.clicked }>X</p>
                <h1 className = { classes.Person__title }>Hello! I'm <span className={ classes.Person__name }>{ this.props.name }</span> and I'm { this.props.age } years old.</h1>
            </div>
        )
    }
}

export default Person;