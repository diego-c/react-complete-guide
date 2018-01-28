import actions from './actions';

export default (state = { persons: [] }, action) => {

    switch(action.type) {

        case actions.ADD_PERSON:
            return {
                persons: [ ...state.persons, { id: action.id, name: action.name, age: action.age }]
            }

        case actions.DELETE_PERSON:
            return {
                persons: state.persons.filter(person => person.id !== action.id)
            }

        default:
            return state;
    }
}