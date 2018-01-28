import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store';
import { Provider } from 'react-redux';

const app = (
    <Router>
        <App />
    </Router>
)

ReactDOM.render(<Provider store = { store }>{ app }</Provider>, document.getElementById('root'));
registerServiceWorker();
