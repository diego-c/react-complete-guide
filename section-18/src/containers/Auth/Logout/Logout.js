import React, { Component } from 'react';
import { connect } from 'react-redux'
import { authLogout } from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

class Logout extends Component {

    componentDidMount() {
        this.props.logout()
    }

    render() {
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(authLogout())
})

export default connect(null, mapDispatchToProps)(Logout);