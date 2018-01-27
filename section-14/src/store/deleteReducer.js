import initState from './initState';

export default (state = initState, action) => {
    if (action.type === 'delete') {
        return {
            counter: state.counter,
            results: [ ...state.results.filter((val, index) => index !== action.index) ]
        }
    }
    return state;
}