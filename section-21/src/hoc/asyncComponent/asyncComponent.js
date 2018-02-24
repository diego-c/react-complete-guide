import React, { Component } from 'react';

export default (WrappedComponent) => (
    class AsyncComp extends Component {
        state = {
            Comp: null
        }

        componentDidMount() {
            if (!this.state.Comp) {
                WrappedComponent()
                .then(comp => {
                    this.setState({ Comp: comp });
                })
            }
        }

        render() {
            const { Comp } = this.state;

            return Comp ? <Comp { ...this.props } /> : null
        }
    }
);