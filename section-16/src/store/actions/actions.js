export const actions = {
    INCREMENT: 'inc',
    DECREMENT: 'dec',
    ADD: 'add',
    SUBTRACT: 'sub',
    STORE: 'store',
    DELETE: 'delete'
}

export function incrementAction() {
    return {
        type: actions.INCREMENT
    }
}

export function decrementAction() {
    return {
        type: actions.DECREMENT
    }
}

export function addAction(value = 0) {
    return {
        type: actions.ADD,
        value
    }
}

export function subtractAction(value = 0) {
    return {
        type: actions.SUBTRACT,
        value
    }
}

function storeActionSync(value) {
    return {
        type: actions.STORE,
        value
    }
}

export function storeAction(value) {
    return dispatch => {
        setTimeout(() => {
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