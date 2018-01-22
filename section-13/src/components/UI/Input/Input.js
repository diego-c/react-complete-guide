import React from 'react';

const input = props => {
    let inputElement = null;

    switch (props.inputType) {

        case 'input':
        inputElement = 
        <input { ...props }/>
        break;
        
        case 'textarea':
        inputElement = 
        <textarea { ...props } />
        break;        

        default:
        inputElement = <p>Oops, input not recognized!</p>;        
    }

    return (
        <div>
            <label htmlFor={ props.label.toLowercase() }>{ props.label }: { inputElement }</label>
        </div>
    )
};

export default input;