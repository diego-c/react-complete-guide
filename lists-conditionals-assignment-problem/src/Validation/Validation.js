import React from 'react';

const Validation = props => (
    <div>
        <p>{props.length >= 5 ? 'Text long enough' : props.length === 0 ? 'Please type something' : 'Text too short!'}</p>
    </div>
);

export default Validation;