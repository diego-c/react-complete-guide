import fetchIngredientsReducer from './fetchIngredientsReducer';
import addRemoveIngredientsReducer from './addRemoveIngredientsReducer';
import { combineReducers } from 'redux';

export default combineReducers({ fetchIngredientsReducer, addRemoveIngredientsReducer })

