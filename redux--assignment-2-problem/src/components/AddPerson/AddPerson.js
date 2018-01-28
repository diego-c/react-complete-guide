import React, { Component } from 'react';
import actions from '../../store/actions';
import './AddPerson.css';

class AddPerson extends Component {    
    state = {
        name: '',
        age: ''
    }

    nameChangedHandler = e => {
        const name = e.target.value;
        this.setState({ name });
    }

    ageChangedHandler = e => {
        const age = e.target.value;
        this.setState({ age });
    }

    manageAction = () => {
        Promise.resolve(this.props.actionHandler(actions.ADD_PERSON, Math.random(), this.state.name, this.state.age))
        .then(() => {
            this.setState({ name: '', age: '' });
        })
    }

    render() {
        return (
        <div className="AddPerson">
            <input 
            type="text"
            placeholder = "Name..."
            onChange = { e => this.nameChangedHandler(e) }
            value = { this.state.name } />

            <input
            type="text"
            placeholder = "Age..."
            onChange = { e => this.ageChangedHandler(e) }
            value = { this.state.age } />

            <button onClick={ this.manageAction }>Add Person</button>
        </div>
        )
    }
}
export default AddPerson;