import React from 'react';

const withClass = ({ children, classes }) => (
    <div className = { classes } >
        { children }
    </div>
);

export default withClass;