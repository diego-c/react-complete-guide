import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

import { addAction, subtractAction, decrementAction, incrementAction } from '../../store/actions/counter';
import { storeAction, deleteAction } from '../../store/actions/result';

class Counter extends Component {   

    render () {
        console.log(this.props.results);
        return (
            <div>
                <CounterOutput value={ this.props.counter } />
                <CounterControl label="Increment" clicked={ this.props.incrementHandler } />
                <CounterControl label="Decrement" clicked={ this.props.decrementHandler }  />
                <CounterControl label="Add 10" clicked={ () => this.props.addHandler(10) }  />
                <CounterControl label="Subtract 15" clicked={ () => this.props.subtractHandler(15) }  />
                <hr />

                <button
                onClick = { () => this.props.storeHandler(this.props.counter) }>
                Store result
                </button>

                <ul>
                    { this.props.results.map((result, index) => (
                        <li 
                        key = { result.id }
                        onClick = { () => this.props.deleteHandler(result.id) }>
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
        addHandler: value => dispatch(addAction(value)),
        subtractHandler: value => dispatch(subtractAction(value)),
        incrementHandler: () => dispatch(incrementAction()),
        decrementHandler: () => dispatch(decrementAction()),
        storeHandler: value => dispatch(storeAction(value)),
        deleteHandler: id => dispatch(deleteAction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);