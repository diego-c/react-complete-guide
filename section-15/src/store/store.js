import { createStore } from 'redux';
import reducer from './reducers/rootReducer';

export default createStore(reducer);