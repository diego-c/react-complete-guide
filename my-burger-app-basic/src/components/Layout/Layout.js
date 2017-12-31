import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';

const layout = props => (
    <Aux>
        <div>
            Layout, backdrop, sidedrawer
        </div>
        <main className = { classes.Main }>
            { props.children }
        </main>
    </Aux>
);

export default layout;