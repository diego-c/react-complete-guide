import { combineReducers } from 'redux';
import counter from './counterReducer';
import results from './resultsReducer';

export default combineReducers({ counter, results });