import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import Root from './components/root';
import NotFound from './components/404';
import Redirect from './components/redirect';
import './assets/stylesheets/bootstrap.min.css';
import './assets/stylesheets/overrides.css';
import Styles from './assets/javascript/styles';
import { Container, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navbar color="light" light expand="sm" style={ Styles.navbarStyle }>
                    <NavbarBrand href="/">Shortenator</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/AWilliams17/Shortenator">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                <Container className="content" style={ Styles.contentStyle }>
                    <Switch>
                        <Route exact path="/" component={ Root }/>
                        <Route path="/redirect/:uuid" component={ Redirect } />
                        <Route component={ NotFound }/>
                    </Switch>
                </Container>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);
