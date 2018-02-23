import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import MenuButton from '../../components/UI/MenuButton/MenuButton';
import { connect } from 'react-redux'

class Layout extends Component {
    state = {
        showSideDrawer: false   
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerOpenedHandler = () => {
        this.setState({ showSideDrawer: true });
    }

    render() {
        return (
            <Aux>
                <MenuButton 
                open = { this.state.showSideDrawer }
                click = { this.state.showSideDrawer ? this.sideDrawerClosedHandler : this.sideDrawerOpenedHandler } />
                <SideDrawer
                 open = { this.state.showSideDrawer }
                 closed = { this.sideDrawerClosedHandler }
                 isAuth = { this.props.auth } />
                <Toolbar isAuth = { this.props.auth } />
                <main className = { classes.Main }>
                    { this.props.children }
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => ({
    auth: state.auth.authData
})

export default connect(mapStateToProps)(Layout);