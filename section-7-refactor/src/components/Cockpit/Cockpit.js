import React from 'react';
import classes from './Cockpit.css';

const Cockpit = props => {
    let btnClasses = [classes.Cockpit__btn];
    if (props.show) {
        btnClasses.push(classes['Cockpit__btn--hide']);
    } else {
        btnClasses.push(classes['Cockpit__btn--show']);
    }

    return (
        <div className={ classes.Cockpit }>
            <h1 className={ classes.Cockpit__title }>{ props.appTitle }</h1>
            <button onClick={ props.click } className={ btnClasses.join(' ') }>{ props.show ? "Hide persons" : "Show persons" }</button>
        </div>
    );
};

export default Cockpit;