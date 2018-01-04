import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import MenuButton from '../UI/MenuButton/MenuButton';

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
                 closed = { this.sideDrawerClosedHandler } />
                <Toolbar />
                <main className = { classes.Main }>
                    { this.props.children }
                </main>
            </Aux>
        )
    }
};

export default Layout;