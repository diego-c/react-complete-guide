import React from 'react';
import "./UserInput.css";

const UserInput = props => (
    <div className="UserInput">
        <input type="text" onChange={ props.handleInput } placeholder="Enter username..." defaultValue={ props.username } className="UserInput__input" />
    </div>
)

export default UserInput;