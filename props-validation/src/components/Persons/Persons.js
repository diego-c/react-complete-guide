import React, { PureComponent } from 'react';
import Person from './Person/Person';
import Aux from '../hoc/Aux';

class Persons extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[Persons.js] Inside constructor', props);
    }

    componentWillMount() {
        console.log('[Persons.js] Inside componentWillMount');
    }
    
    componentDidMount() {
        console.log('[Persons.js] Inside componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE Persons.js] Inside componentWillReceiveProps', nextProps);
    }

    /* shouldComponentUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js Inside shouldComponentUpdate', nextProps, nextState);
        return nextProps.persons !== this.props.persons ||
        nextProps.changed !== this.props.changed ||
        nextProps.clicked !== this.props.clicked;
    } */

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
    }

    // no nextProps or nextState, because at this point render() was already called!
    componentDidUpdate() {
        console.log('[UPDATE Persons.js] Inside componentDidUpdate :)');
    }

    render() {
        console.log('[Persons.js] Inside render');
        return (
            <Aux>
                { this.props.persons.map((person, index) => (
                    <div key = { person.id }>   
                        <Person
                        name = { person.name }
                        age = { person.age }                
                        clicked = { () => this.props.clicked(person.id) }
                        changed = { (e) => this.props.changed(person.id, e) }
                        currentName = { person.name }
                        />
                    </div>
                ))}
            </Aux>
        )
    }
}

export default Persons;