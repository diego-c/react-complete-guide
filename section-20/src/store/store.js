import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)));