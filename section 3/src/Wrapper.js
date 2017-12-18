import React from 'react';

const Wrapper = props => (
    <div>
        <h1>O hai! We got several people here!</h1>
        {props.children}
    </div>
)

export default Wrapper;