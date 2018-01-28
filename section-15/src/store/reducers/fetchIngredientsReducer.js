import actions from '../actions/actions';

export default (state = { fetchIngredients: { data: {}, isFetching: false, error: false, errorMsg: '' }}, action) => {

    switch(action.type) {

        case actions.FETCH_INGREDIENTS:       
            return {
                fetchIngredients: {
                    data: action.data,
                    isFetching: true,
                    error: false,
                    errorMsg: ''
                }                
            }

        case actions.FETCH_INGREDIENTS_SUCCESS:
            return {
                fetchIngredients: {
                    data: action.data,
                    isFetching: false,
                    error: false,
                    errorMsg: ''
                }                
            }
        
        case actions.FETCH_INGREDIENTS_FAILURE:
            return {
                fetchIngredients: {
                    data: action.data,
                    isFetching: false,
                    error: true,
                    errorMsg: action.data.message
                }                
            }

        default:
            return state;
    }
}