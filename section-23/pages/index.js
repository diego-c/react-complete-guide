import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

export default props => (
    <div>
        <h1>The main page!</h1>
        <button
        onClick = { () => Router.push('/auth') }>
            Auth page using btn instead of a link
        </button>
    </div>
);