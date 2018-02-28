import React from 'react';
import Link from 'next/link';

export default () => (
    <div>
        <h1>Sorry, this page doesn't exist</h1>
        <Link prefetch href="/"><a>Go home</a></Link>
    </div>
);