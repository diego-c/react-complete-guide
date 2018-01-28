import React, { Component } from 'react';
import actions from '../store/actions';
import { connect } from 'react-redux';
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {

    render () {
        return (
            <div>
                <AddPerson 
                actionHandler = { this.props.actionHandler }
                />

                { this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={ () => this.props.actionHandler( actions.DELETE_PERSON, person.id ) }/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        persons: state.persons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actionHandler: (type, id, name, age) => dispatch({ type, id, name, age })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);