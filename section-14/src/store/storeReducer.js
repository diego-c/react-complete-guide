import initState from './initState';

export default (state = initState, action) => {

    if (action.type === 'store') {
        return {
            counter: state.counter,
            results: [ ...state.results, state.counter ]
        }
    }
    
    return state;
}