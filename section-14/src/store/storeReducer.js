import initState from './initState';

export default (state = initState, action) => {

    if (action.type === 'store') {
        return {
            counter: state.counter,
            results: [ ...state.results, { id: Date.now(), value: state.counter } ]
        }
    }
    
    return state;
}