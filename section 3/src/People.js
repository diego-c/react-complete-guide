import React, { Component } from 'react';
import Person from './Person/Person';

export default class People extends Component {
    state = {
            people: [
                {
                    id: 1,
                    name: 'John',
                    age: 30,
                    employed: false,
                    hobbies: ['computers', 'games', 'movies', 'reading']
                },
                {
                    id: 2,
                    name: 'Jane',
                    age: 20,
                    employed: false,
                    hobbies: ['drinking', 'dancing', 'cute stuff']
                },
                {
                    id: 3,
                    name: 'June',
                    age: 30,
                    employed: true,
                    hobbies: ['pachinko', 'martial arts']
                }
            ]
    }
    

    handlePerson = (newName, index = 0) => {
        this.setState(prevState => {
            let newState = prevState;
            newState.people[index].name = newName;
            
            return newState;
        })
    }

    nameChangedHandler = e => {       
        this.setState({
            people: [
                {
                    id: 1,
                    name: e.target.value,
                    age: 30,
                    employed: false,
                    hobbies: ['computers', 'games', 'movies', 'reading']
                },
                {
                    id: 2,
                    name: 'Jane',
                    age: 20,
                    employed: false,
                    hobbies: ['drinking', 'dancing', 'cute stuff']
                },
                {
                    id: 3,
                    name: 'June',
                    age: 30,
                    employed: true,
                    hobbies: ['pachinko', 'martial arts']
                }
            ]
        })
    }

    render() {
        const btnStyle = {
            padding: '16px',
            backgroundColor: 'blue',
            outline: 'none',
            color: '#fff',
            boxShadow: '0 5px 10px #ccc',
            border: '5px solid lightgreen',
            cursor: 'pointer'
        }

        return (
            <div>
                { 
                    /*
                    DO NOT USE () => ... (this way you call 2 functions instead of just one, performance hit)

                    USE this.fn.bind(...)
                    */
                }

                <button onClick={() => this.handlePerson('Diego Chaves', 0)} style={ btnStyle }>Change name!</button>

                <Person name={ this.state.people[0].name } age={ this.state.people[0].age } employed={ this.state.people[0].employed } hobbies={ this.state.people[0].hobbies } nameChangedHandler={ this.nameChangedHandler } id={ this.state.people[0].id } />

                <Person name={ this.state.people[1].name } age={ this.state.people[1].age } employed={ this.state.people[1].employed } hobbies={ this.state.people[1].hobbies } id={ this.state.people[1].id } />

                <Person name={ this.state.people[2].name } age={ this.state.people[2].age } employed={ this.state.people[2].employed } hobbies={ this.state.people[2].hobbies } id={ this.state.people[2].id } />
            </div>
        )
    }
}