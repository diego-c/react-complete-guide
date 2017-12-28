import React, { Component } from 'react';
import classes from './Cockpit.css';

class Cockpit extends Component {
    constructor(props) {
        super(props);
        console.log('[Cockpit.js] Inside constructor');
    }

    componentWillMount() {
        console.log('[Cockpit.js] Inside componentWillMount');
    }
    
      componentDidMount() {
        console.log('[Cockpit.js] Inside componentDidMount');
    }

    render() {
        console.log('[Cockpit.js] Inside render');
        let btnClasses = [classes.Cockpit__btn];
        if (this.props.show) {
            btnClasses.push(classes['Cockpit__btn--hide']);
        } else {
            btnClasses.push(classes['Cockpit__btn--show']);
        }

        return (
            <div className={ classes.Cockpit }>
                <h1 className={ classes.Cockpit__title }>{ this.props.appTitle }</h1>
                <button onClick={ this.props.click } className={ btnClasses.join(' ') }>{ this.props.show ? "Hide persons" : "Show persons" }</button>
            </div>
        )
    }
}

export default Cockpit;