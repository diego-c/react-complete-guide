import React from 'react';
import User from '../../components/User';
import Link from 'next/link';

export default () => (
    <div>
        <h1>Auth page</h1>
        <h2>User:</h2>
        <User name = "Diego" age = { 25 } />
        <Link prefetch href= {{ pathname: '/' }}>
            <a>Back home</a>
        </Link>
    </div>
)