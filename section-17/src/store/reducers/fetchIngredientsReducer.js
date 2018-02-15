import actions from '../actions/actionTypes';

export default (state = { }, action) => {

    switch(action.type) {

        case actions.FETCH_INGREDIENTS:       
            return {    
                    ...state,            
                    data: action.data,
                    isFetching: true,
                    error: false,
                    errorMsg: ''                  
                }

        case actions.FETCH_INGREDIENTS_SUCCESS:
            return {
                    ...state,                
                    data: action.data,
                    isFetching: false,
                    error: false,
                    errorMsg: ''                    
                }
        
        case actions.FETCH_INGREDIENTS_FAILURE:
            return {  
                    ...state,              
                    data: action.data,
                    isFetching: false,
                    error: true,
                    errorMsg: action.data.message      
                }

        default:
            return state;
    }
}