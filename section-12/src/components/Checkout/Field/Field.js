import React from 'react';

const field = props => {
    const classes = ['Field'];
    const customField = props.field[0].toUpperCase().concat(props.field.slice(1));
    classes.push(`customer${customField}`);

    return (
        <div className = { classes.join(' ') }>
            <label htmlFor={ props.field }>
                Your { props.field }: 
            </label>
            <input 
            type={ props.fieldType } 
            id = { props.field }
            onChange = { e => props.handleInput(e.target.value) } />
        </div>
    )
};

export default field;