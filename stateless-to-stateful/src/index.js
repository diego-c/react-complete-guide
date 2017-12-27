import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

render(<App title="Persons App" />, document.getElementById('root'));
registerServiceWorker();
