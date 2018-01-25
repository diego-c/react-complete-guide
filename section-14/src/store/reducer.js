const reducer = (state = { counter: 0 }, action) => {
    switch(action.type) {
        case 'inc':
            return { 
                ...state,
                counter: state.counter + 1
            }
        break;

        case 'dec':
            return { 
                ...state,
                counter: state.counter - 1
            }
        break;

        case 'add':
            return {
                ...state,
                counter: state.counter + action.value
            }
        break;
        
        case 'sub':
            return {
                ...state,
                counter: state.counter - action.value
            }
        break;

        default:
            return state;
    }
}

export default reducer;