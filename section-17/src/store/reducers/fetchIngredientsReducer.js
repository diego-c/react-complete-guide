import actions from '../actions/actionTypes';
import updateObject from './utils/utils';

export default (state = { }, action) => {

    switch(action.type) {

        case actions.FETCH_INGREDIENTS:
            return updateObject(state, {
                ingredients: null,
                isFetching: true,
                error: false,
                errorMsg: ''
            })       
           /*  return {    
                    ...state,            
                    ingredients: null,
                    isFetching: true,
                    error: false,
                    errorMsg: ''                  
                } */

        case actions.FETCH_INGREDIENTS_SUCCESS:
            return updateObject(state, {
                ingredients: action.ingredients,
                isFetching: false,
                error: false,
                errorMsg: ''
            })
           /*  return {
                    ...state,                
                    ingredients: action.ingredients,
                    isFetching: false,
                    error: false,
                    errorMsg: ''                    
                } */
        
        case actions.FETCH_INGREDIENTS_FAILURE:
            return updateObject(state, {
                ingredients: null,
                isFetching: false,
                error: true,
                errorMsg: action.error.message
            })
            /* return {  
                    ...state,              
                    ingredients: null,
                    isFetching: false,
                    error: true,
                    errorMsg: action.error.message      
                } */

        default:
            return state;
    }
}