import counterReducer from './counterReducer';
import storeReducer from './storeReducer';
import deleteReducer from './deleteReducer';
import initState from '../state/initState';
import actions from '../actions/actions';

export default (state = initState, action) => {

    if (action.type === actions.STORE) {
        return storeReducer(state, action);
    } else if (action.type === actions.DELETE) {
        return deleteReducer(state, action);
    }
    
    return counterReducer(state, action);
}