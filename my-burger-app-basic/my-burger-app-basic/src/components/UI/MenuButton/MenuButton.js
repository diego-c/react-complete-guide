import React from 'react';
import classes from './MenuButton.css';

const menuButton = ({ open, click }) => {
    const barClasses = {
        menuButton: [classes.MenuButton],
        barTop: [classes.Bar],
        barMiddle: [classes.Bar],
        barBottom: [classes.Bar]
    };

    if (open) { 
        barClasses['menuButton'].push(classes.MenuButtonClose);
        barClasses['barTop'].push(classes.BarTopClose);
        barClasses['barMiddle'].push(classes.BarMiddleClose);
        barClasses['barBottom'].push(classes.BarBottomClose);        
    } else {
        barClasses['menuButton'].push(classes.MenuButtonOpen);
    }

    return (
        <div 
        className={ barClasses['menuButton'].join(' ') }
        onClick = { click }>
            <div className={ barClasses['barTop'].join(' ') }></div>
            <div className={ barClasses['barMiddle'].join(' ') }></div>
            <div className={ barClasses['barBottom'].join(' ') }></div>
        </div>
    );
};

export default menuButton;