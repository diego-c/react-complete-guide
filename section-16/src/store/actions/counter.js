import actions from './actions';

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