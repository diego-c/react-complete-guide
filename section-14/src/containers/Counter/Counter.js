import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {   

    render () {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={() => this.props.onAddCounter(10)}  />
                <CounterControl label="Subtract 15" clicked={() => this.props.onSubCounter(15)}  />
                <hr />

                <button
                onClick = { this.props.onStoreResult }>
                Store result
                </button>

                <ul>
                    { this.props.results.map((result, index) => (
                        <li 
                        key = { index }
                        onClick = { () => this.props.onDeleteResult(index) }>
                        { result }
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
        onIncrementCounter: () => dispatch({ type: 'inc' }),
        onDecrementCounter: () => dispatch({ type: 'dec' }),
        onAddCounter: (value) => dispatch({ type: 'add', value }),
        onSubCounter: (value) => dispatch({ type: 'sub', value }),
        onStoreResult: () => dispatch({ type: 'store' }),
        onDeleteResult: (index) => dispatch({ type: 'delete', index })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);