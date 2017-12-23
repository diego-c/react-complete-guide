import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({ hasError: true, errorMessage: error });        
    }

    render() {
        if (this.state.hasError) {
            return (            
            <div>
                <h1>Ooops, something went wrong!</h1>
                <p>{ this.state.errorMessage }</p>
            </div>
            )
        } else {
            return this.props.children;
        }
    }
}