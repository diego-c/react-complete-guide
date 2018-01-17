import React from 'react';

const notFound = ({ location }) => {
    return (
        <h1>Sorry, the route { location.pathname } wasn't found :(</h1>
    );
};

export default notFound;