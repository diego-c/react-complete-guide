import counterReducer from './counterReducer';
import storeReducer from './storeReducer';
import deleteReducer from './deleteReducer';
import initState from './initState';

export default (state = initState, action) => {

    if (action.type === 'store') {
        return storeReducer(state, action);
    } else if (action.type === 'delete') {
        return deleteReducer(state, action);
    }
    
    return counterReducer(state, action);
}