import React from 'react';
import classes from "./Wrapper.css";

const Wrapper = props => (
    <div className={classes.Wrapper}>
        <h1 className={classes.Wrapper__title}>O hai! We got several people here!</h1>
        {props.children}
    </div>
)

export default Wrapper;