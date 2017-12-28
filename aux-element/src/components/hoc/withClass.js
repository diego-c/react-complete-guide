import React, { Component } from 'react';

/* const withClass = (WrappedElement, classes) => {
    return props => (
    <div className = { classes } >
        { // important: spread operator {...props} to assign whatever props need to be passed down to the component 
        }
        <WrappedElement {...props} />
    </div>
    );
}; */

// convert to stateful component to use lifecycle hooks:
const withClass = (WrappedComponent, classes) => {
    return class withClass extends Component {
        render() {
            return (
                <div className = { classes }>
                    <WrappedComponent {...this.props} />
                </div>
            )
        }
    }
}

export default withClass;