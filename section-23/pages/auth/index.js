import React from 'react';
import Link from 'next/link';

export default () => (
    <div>
        <h1>Auth page</h1>
        <Link prefetch href= {{ pathname: '/' }}>
            <a>Back home</a>
        </Link>
    </div>
)