import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {   

    render () {
        console.log(this.props.results);
        return (
            <div>
                <CounterOutput value={ this.props.counter } />
                <CounterControl label="Increment" clicked={ () => this.props.actionHandler(actions.INCREMENT) } />
                <CounterControl label="Decrement" clicked={ () => this.props.actionHandler(actions.DECREMENT) }  />
                <CounterControl label="Add 10" clicked={ () => this.props.actionHandler(actions.ADD, 10) }  />
                <CounterControl label="Subtract 15" clicked={ () => this.props.actionHandler(actions.SUBTRACT, 15) }  />
                <hr />

                <button
                onClick = { () => this.props.actionHandler(actions.STORE, this.props.counter) }>
                Store result
                </button>

                <ul>
                    { this.props.results.map((result, index) => (
                        <li 
                        key = { result.id }
                        onClick = { () => this.props.actionHandler(actions.DELETE, null, result.id) }>
                        { result.value }
                        </li>
                    )) }
                </ul>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        counter: state.counter,
        results: state.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actionHandler: (type, value, id) => dispatch({ type, value, id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);