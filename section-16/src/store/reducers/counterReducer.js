import {actions} from '../actions/actions';

const reducer = (state = 0, action) => {
    
    switch(action.type) {

        case actions.INCREMENT:
            return state + 1;

        case actions.DECREMENT:
            return  state - 1;

        case actions.ADD:
            return state + action.value;
        
        case actions.SUBTRACT:
            return state - action.value

        default:
            return state;
    }
}

export default reducer;