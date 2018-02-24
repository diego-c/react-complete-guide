import React from 'react';
import { Link } from 'react-router-dom';

const notFound = props => (
    <div>
        <h1 style={{ textAlign: 'center', marginBottom: '4rem' }}>Sorry, page not found</h1>
        <h2 style={{ textAlign: 'center', color: '#1e67a8' }}><Link to="/">Go back to the home page</Link></h2>
    </div>
);

export default notFound