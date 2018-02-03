import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import reducer from './store/reducers/rootReducer';

const logger = store => {
    return next => {
        return action => {
            console.log('Logger middleware dispatching:', action);
            const result = next(action);
            console.log('Current state:', store.getState())
            return result;
        }
    }
}

const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(<Provider store = { store }><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
