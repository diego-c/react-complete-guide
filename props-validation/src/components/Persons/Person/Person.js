import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import Aux from '../../hoc/Aux';
import WithClass from '../../hoc/withClass';

class Person extends Component {
    constructor(props) {
        super(props);
        console.log('[Person.js] Inside constructor');
    }

    componentWillMount() {
        console.log('[Person.js] Inside componentWillMount');
    }
    
      componentDidMount() {
        console.log('[Person.js] Inside componentDidMount');
        if (Number(this.props.id) === 2) this.inputName.focus();
    }

    componentWillUnmount() {
        console.log('[Person.js] Inside componentWillUnmount!');
    }

    render() {
        console.log('[Person.js] Inside render');
        return (
            <Aux>       
                <input className = { classes.Person__input }
                type="text" 
                placeholder={ this.props.currentName }
                defaultValue = { this.props.currentName }
                onChange={ this.props.changed }
                ref={inp => this.inputName = inp } />
                <p className = { classes.Person__btn } onClick={ this.props.clicked }>X</p>
                <h1 className = { classes.Person__title }>Hello! I'm <span className={ classes.Person__name }>{ this.props.name }</span> and I'm { this.props.age } years old.</h1>
            </Aux>
        )
    }
}

Person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    clicked: PropTypes.func,
    changed: PropTypes.func,
    currentName: PropTypes.string
}

export default WithClass(Person, classes.Person);