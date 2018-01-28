import initState from '../state/initState';
import actions from '../actions/actions';

const reducer = (state = initState, action) => {
    
    switch(action.type) {

        case actions.INCREMENT:
            return { 
                ...state,
                counter: state.counter + 1
            }

        case actions.DECREMENT:
            return { 
                ...state,
                counter: state.counter - 1
            }

        case actions.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            }
        
        case actions.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.value
            }

        default:
            return state;
    }
}

export default reducer;