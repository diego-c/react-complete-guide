import React, { Component } from 'react';
import classes from './Cockpit.css';
import Aux from '../hoc/Aux';

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
            // React 16.2 introduces fragments, which can be used in place of <div></div> dom containers. 
            // The <></> isn't supported by create-react-app yet and can't be used with attributes
            // Use <React.Fragment></React.Fragment> for now instead
            <Aux className={ classes.Cockpit }>
                <h1 className={ classes.Cockpit__title }>{ this.props.appTitle }</h1>
                <p>Toggled persons { this.props.counter } times</p>
                <button onClick={ this.props.click } className={ btnClasses.join(' ') }>{ this.props.show ? "Hide persons" : "Show persons" }</button>
            </Aux>
        )
    }
}

export default Cockpit;