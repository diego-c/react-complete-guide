import React, { Component } from 'react';

const asyncComponent = getComponent => {
    class AsyncComponent extends Component {
        state = {
            Comp: null
        }

        componentWillMount() {
            if (!this.state.Comp) {
                getComponent().then(Component => {
                    this.setState({ Comp: Component })
                })                
            }
        }

        render() {
            const { Comp } = this.state;
            return Comp ? <Comp { ...this.props } /> : null
        }
    }

    return AsyncComponent;
}

export default asyncComponent;