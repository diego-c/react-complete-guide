import actions from '../actions/actionTypes';

export default (state = { }, action) => {

    switch(action.type) {

        case actions.FETCH_INGREDIENTS:       
            return {    
                    ...state,            
                    ingredients: null,
                    isFetching: true,
                    error: false,
                    errorMsg: ''                  
                }

        case actions.FETCH_INGREDIENTS_SUCCESS:
            return {
                    ...state,                
                    ingredients: action.ingredients,
                    isFetching: false,
                    error: false,
                    errorMsg: ''                    
                }
        
        case actions.FETCH_INGREDIENTS_FAILURE:
            return {  
                    ...state,              
                    ingredients: null,
                    isFetching: false,
                    error: true,
                    errorMsg: action.error.message      
                }

        default:
            return state;
    }
}