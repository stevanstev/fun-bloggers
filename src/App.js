import React, {Component} from 'react';
import Login from './container/guest/login/Login';
import Home from './container/auth/home/Home';
import Posts from './container/auth/posts/Posts';
import Profile from './container/auth/profile/Profile';
import {BrowserRouter as Router, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import PrivateRoute from './component/PrivateRoute';
import GuestRoute from './component/GuestRoute';

class App extends Component {
    render() {
        let isAuth = this.props.authToken;

        return (
            <Router>
                <Switch>
                    <GuestRoute authed={isAuth} exact path="/" component={Login} />,
                    <GuestRoute authed={isAuth} exact path="/login" component={Login} />
                    <PrivateRoute authed={isAuth} exact path="/home" component={Home} />,
                    <PrivateRoute authed={isAuth} exact path="/posts" component={Posts} />,
                    <PrivateRoute authed={isAuth} exact path="/profile" component={Profile} />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authToken: state.authToken
    }
}

export default connect(mapStateToProps, null)(App);
