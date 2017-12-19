import React from 'react';
import "./Person/Person.css";

const Wrapper = props => (
    <div className="Person">
        <h1>O hai! We got several people here!</h1>
        {props.children}
    </div>
)

export default Wrapper;