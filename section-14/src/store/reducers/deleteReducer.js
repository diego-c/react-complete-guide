import initState from '../state/initState';

export default (state = initState, action) => {
    if (action.type === 'delete') {
        return {
            counter: state.counter,
            results: state.results.filter(val => val.id !== action.id)
        }
    }
    return state;
}