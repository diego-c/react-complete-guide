import actions from './actions';

function storeActionSync(value) {
    return {
        type: actions.STORE,
        value
    }
}

export function storeAction(value) {
    return (dispatch, getState) => {
        setTimeout(() => {
            const oldState = getState().results;
            console.log('Results:', oldState);
            dispatch(storeActionSync(value))
        }, 2000);
    }
}

export function deleteAction(id) {
    return {
        type: actions.DELETE,
        id
    }
}