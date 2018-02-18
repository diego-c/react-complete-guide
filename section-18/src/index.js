import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store';
import { Provider } from 'react-redux';

ReactDOM.render((
    <Provider store = { store }>
        <Router>
            <App />
        </Router>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
