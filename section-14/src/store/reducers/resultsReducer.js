import actions from '../actions/actions';

export default (state = [], action) => {
    if (action.type === actions.DELETE) {
        return state.filter(val => val.id !== action.id)
    } else if (action.type === actions.STORE) {
        return state.concat([{ id: Date.now(), value: action.value }])
    }
    return state;
}